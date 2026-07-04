import { once } from "node:events";
import http, { type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  closeOperatorServer,
  startOperatorServer,
} from "../../src/app/server.js";
import type { ServiceConfig } from "../../src/config.js";
import type { BackgroundWorkersHandle } from "../../src/app/background-workers.js";
import type { PgPool } from "../../src/db/connection.js";
import type { Logger } from "../../src/logger.js";
import type { ToolRegistry } from "../../src/mcp/types.js";

const servers: Server[] = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve) => server.close(() => resolve())),
    ),
  );
});

describe("startOperatorServer background worker startup", () => {
  it("logs worker startup failures and still serves HTTP", async () => {
    const startBackgroundWorkers = vi
      .fn()
      .mockRejectedValue(new Error("worker boom"));

    const logger = buildLogger();
    const server = startOperatorServer({
      config: buildTestConfig(),
      registry: {} as ToolRegistry,
      logger,
      bearerTokens: [],
      dependencyProbes: {},
      backgroundQueueMetrics: null,
      oauthProtectedResource: null,
      oauthTokenVerifier: null,
      backgroundWorkerStarter: startBackgroundWorkers,
      probePool: buildProbePool(),
    });
    servers.push(server);

    if (!server.address()) {
      await once(server, "listening");
    }

    await vi.waitFor(() =>
      expect(logger.error).toHaveBeenCalledWith(
        expect.objectContaining({ event: "background_workers.start_failed" }),
        "failed to start background workers; continuing without them",
      ),
    );

    const address = server.address() as AddressInfo;
    const response = await fetch(`http://127.0.0.1:${address.port}/healthz`);
    expect(response.status).toBe(200);
    expect(startBackgroundWorkers).toHaveBeenCalledOnce();
  });

  it("awaits in-flight worker startup and cleanup during operator shutdown", async () => {
    let resolveWorkerStartup!: (handle: BackgroundWorkersHandle) => void;
    let resolveWorkerStop!: () => void;
    let resolveProbeEnd!: () => void;
    const stopWorkers = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveWorkerStop = resolve;
        }),
    );
    const probeEnd = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveProbeEnd = resolve;
        }),
    );
    const startBackgroundWorkers = vi.fn(
      () =>
        new Promise<BackgroundWorkersHandle>((resolve) => {
          resolveWorkerStartup = resolve;
        }),
    );

    const server = startOperatorServer({
      config: buildTestConfig(),
      registry: {} as ToolRegistry,
      logger: buildLogger(),
      bearerTokens: [],
      dependencyProbes: {},
      backgroundQueueMetrics: null,
      oauthProtectedResource: null,
      oauthTokenVerifier: null,
      backgroundWorkerStarter: startBackgroundWorkers,
      probePool: buildProbePool(probeEnd),
    });
    servers.push(server);

    if (!server.address()) {
      await once(server, "listening");
    }
    expect(startBackgroundWorkers).toHaveBeenCalledOnce();

    let shutdownResolved = false;
    const shutdown = closeOperatorServer(server).then(() => {
      shutdownResolved = true;
    });
    await flushTasks();

    expect(probeEnd).toHaveBeenCalledOnce();
    expect(stopWorkers).not.toHaveBeenCalled();
    expect(shutdownResolved).toBe(false);

    resolveWorkerStartup({
      startedWorkers: ["compaction"],
      stop: stopWorkers,
    });
    await vi.waitFor(() => expect(stopWorkers).toHaveBeenCalledOnce());
    expect(shutdownResolved).toBe(false);

    resolveWorkerStop();
    resolveProbeEnd();
    await shutdown;
    expect(shutdownResolved).toBe(true);

    await closeOperatorServer(server);
    expect(probeEnd).toHaveBeenCalledOnce();
    expect(stopWorkers).toHaveBeenCalledOnce();
    servers.pop();
  });

  it("stops workers when probe pool cleanup throws synchronously", async () => {
    const stopWorkers = vi.fn().mockResolvedValue(undefined);
    const probeEnd = vi.fn(() => {
      throw new Error("probe cleanup boom");
    });
    const startBackgroundWorkers = vi.fn().mockResolvedValue({
      startedWorkers: ["compaction"],
      stop: stopWorkers,
    });

    const server = startOperatorServer({
      config: buildTestConfig(),
      registry: {} as ToolRegistry,
      logger: buildLogger(),
      bearerTokens: [],
      dependencyProbes: {},
      backgroundQueueMetrics: null,
      oauthProtectedResource: null,
      oauthTokenVerifier: null,
      backgroundWorkerStarter: startBackgroundWorkers,
      probePool: buildProbePool(probeEnd),
    });
    servers.push(server);

    if (!server.address()) {
      await once(server, "listening");
    }
    await vi.waitFor(() => expect(startBackgroundWorkers).toHaveBeenCalledOnce());

    await expect(closeOperatorServer(server)).rejects.toThrow(
      "probe cleanup boom",
    );

    expect(probeEnd).toHaveBeenCalledOnce();
    expect(stopWorkers).toHaveBeenCalledOnce();
    servers.pop();
  });

  it("cleans probe pool without starting workers when HTTP bind fails", async () => {
    const blocker = http.createServer();
    await new Promise<void>((resolve) =>
      blocker.listen(0, "127.0.0.1", () => resolve()),
    );
    servers.push(blocker);
    const blockerAddress = blocker.address() as AddressInfo;

    const probeEnd = vi.fn().mockResolvedValue(undefined);
    const startBackgroundWorkers = vi.fn();

    const logger = buildLogger();
    const server = startOperatorServer({
      config: {
        ...buildTestConfig(),
        port: blockerAddress.port,
      },
      registry: {} as ToolRegistry,
      logger,
      bearerTokens: [],
      dependencyProbes: {},
      backgroundQueueMetrics: null,
      oauthProtectedResource: null,
      oauthTokenVerifier: null,
      backgroundWorkerStarter: startBackgroundWorkers,
      probePool: buildProbePool(probeEnd),
    });

    await once(server, "error");
    await vi.waitFor(() => expect(probeEnd).toHaveBeenCalledOnce());

    expect(startBackgroundWorkers).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({ event: "http.listen_failed" }),
      "HTTP server failed; cleaning up resources",
    );

    await closeOperatorServer(server);
    expect(probeEnd).toHaveBeenCalledOnce();
    await new Promise<void>((resolve) => blocker.close(() => resolve()));
    servers.splice(servers.indexOf(blocker), 1);
  });
});

function buildTestConfig(): ServiceConfig {
  return {
    host: "127.0.0.1",
    port: 0,
    databaseUrl: "postgres://memory:memory@127.0.0.1:5432/memory_os",
    postgres: {
      pool: {
        max: 10,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000,
      },
    },
    vectorBackend: "pgvector",
    qdrant: {
      url: "",
      apiKey: "",
      collectionName: "memory_chunks_v1",
    },
    openai: {
      apiKey: "",
    },
    embedding: {
      provider: "local",
      model: "local-deterministic-v1",
      dimensions: 384,
      version: "v1",
      chunkTargetTokens: 800,
      chunkOverlapTokens: 120,
    },
    backups: {
      directory: "/tmp/akasha-test-backups",
    },
  };
}

function buildLogger(): Logger {
  return {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    child: vi.fn(() => buildLogger()),
  } as unknown as Logger;
}

function buildProbePool(
  end: PgPool["end"] = vi.fn().mockResolvedValue(undefined) as PgPool["end"],
): PgPool {
  return {
    query: vi.fn(),
    connect: vi.fn(),
    end,
  } as unknown as PgPool;
}

function flushTasks(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}
