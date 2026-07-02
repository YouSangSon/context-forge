import { describe, expect, it, vi } from "vitest";
import {
  createOperatorServer,
  startOperatorServer,
} from "../../src/app/server.js";
import type { ServiceConfig } from "../../src/config.js";
import type { Logger } from "../../src/logger.js";
import type { ToolRegistry } from "../../src/mcp/types.js";

function buildLogger(): Logger {
  return {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    child: vi.fn(() => buildLogger()),
  } as unknown as Logger;
}

function buildConfig(overrides: Partial<ServiceConfig> = {}): ServiceConfig {
  return {
    host: "127.0.0.1",
    port: 8787,
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
      directory: "/tmp/akasha-backups",
    },
    ...overrides,
  };
}

const malformedOptionCases = [
  {
    input: () => null,
    message: "operator server options must be an object",
  },
  {
    input: () => [],
    message: "operator server options must be an object",
  },
  {
    input: () => ({ registry: [] }),
    message: "registry must be an object",
  },
  {
    input: () => ({ config: {} }),
    message: "config.host must be a string",
  },
  {
    input: () => ({ config: buildConfig({ port: -1 }) }),
    message: "config.port must be a non-negative safe integer up to 65535",
  },
  {
    input: () => ({ config: buildConfig({ port: 65_536 }) }),
    message: "config.port must be a non-negative safe integer up to 65535",
  },
  {
    input: () => ({
      config: {
        ...buildConfig(),
        postgres: {
          pool: {
            ...buildConfig().postgres.pool,
            max: 0,
          },
        },
      },
    }),
    message: "config.postgres.pool.max must be a positive safe integer",
  },
  {
    input: () => ({
      config: {
        ...buildConfig(),
        postgres: {
          pool: {
            ...buildConfig().postgres.pool,
            idleTimeoutMillis: -1,
          },
        },
      },
    }),
    message:
      "config.postgres.pool.idleTimeoutMillis must be a positive safe integer",
  },
  {
    input: () => ({
      config: {
        ...buildConfig(),
        vectorBackend: "remote",
      },
    }),
    message: 'config.vectorBackend must be "qdrant" or "pgvector"',
  },
  {
    input: () => ({ logger: { warn: vi.fn(), error: vi.fn() } }),
    message: "logger.info must be a function",
  },
  {
    input: () => ({ bearerTokens: "token" }),
    message: "bearerTokens must be an array",
  },
  {
    input: () => ({ bearerTokens: [" \n\t "] }),
    message: "bearerTokens[0] must contain non-whitespace text",
  },
  {
    input: () => ({ bearerTokens: [null] }),
    message: "bearerTokens[0] must be an object",
  },
  {
    input: () => ({ bearerTokens: [{ token: "" }] }),
    message: "bearerTokens[0].token must contain non-whitespace text",
  },
  {
    input: () => ({
      bearerTokens: [{ token: "token-a", organizationId: " \n\t " }],
    }),
    message: "bearerTokens[0].organizationId must contain non-whitespace text",
  },
  {
    input: () => ({ dependencyProbes: null }),
    message: "dependencyProbes must be an object",
  },
  {
    input: () => ({ rateLimiter: {} }),
    message: "rateLimiter.check must be a function",
  },
  {
    input: () => ({ oauthProtectedResource: {} }),
    message: "metadataUrl must be a string",
  },
  {
    input: () => ({
      oauthProtectedResource: {
        metadataUrl:
          "https://akasha.example.com/.well-known/oauth-protected-resource/mcp",
        metadata: {
          scopes_supported: ["akasha:memory"],
        },
      },
    }),
    message: "metadata.resource must be a string",
  },
  {
    input: () => ({
      metrics: {
        observeHttpRequest: vi.fn(),
        observeSweeperTick: vi.fn(),
        setDependencyReport: vi.fn(),
      },
    }),
    message: "metrics.render must be a function",
  },
  {
    input: () => ({ backgroundQueueMetrics: {} }),
    message: "backgroundQueueMetrics.collect must be a function",
  },
] as const;

describe("createOperatorServer direct option boundary", () => {
  const createOnlyMalformedCases = malformedOptionCases.filter(
    ({ message }) => message !== "logger.info must be a function",
  );

  it.each(createOnlyMalformedCases)(
    "rejects malformed direct options before construction %#",
    ({ input, message }) => {
      expect(() => createOperatorServer(input() as never)).toThrow(message);
    },
  );

  it("allows an empty direct registry with auth disabled", () => {
    const logger = buildLogger();
    const server = createOperatorServer({
      registry: {} as ToolRegistry,
      logger,
      bearerTokens: [],
      dependencyProbes: {},
      oauthProtectedResource: null,
      oauthTokenVerifier: null,
      backgroundQueueMetrics: null,
    });

    expect(server.listening).toBe(false);
    expect(logger.warn).toHaveBeenCalledWith(
      { event: "auth.disabled" },
      expect.stringContaining("bearer auth is disabled"),
    );
  });

  it("allows a minimal injected logger when auth stays enabled", () => {
    const server = createOperatorServer({
      registry: {} as ToolRegistry,
      logger: { error: vi.fn() } as unknown as Logger,
      bearerTokens: ["token-a"],
      oauthProtectedResource: null,
      oauthTokenVerifier: null,
      backgroundQueueMetrics: null,
    });

    expect(server.listening).toBe(false);
  });

  it("requires logger.warn when explicit options disable auth", () => {
    for (const options of [
      {},
      { bearerTokens: [] },
      { bearerTokens: [], oauthTokenVerifier: null },
    ]) {
      expect(() =>
        createOperatorServer({
          registry: {} as ToolRegistry,
          logger: { error: vi.fn() } as unknown as Logger,
          oauthProtectedResource: null,
          backgroundQueueMetrics: null,
          ...options,
        }),
      ).toThrow("logger.warn must be a function");
    }
  });

  it("allows a minimal injected logger when OAuth verification is explicit", () => {
    const server = createOperatorServer({
      registry: {} as ToolRegistry,
      logger: { error: vi.fn() } as unknown as Logger,
      bearerTokens: [],
      oauthProtectedResource: null,
      oauthTokenVerifier: { verify: vi.fn() },
      backgroundQueueMetrics: null,
    });

    expect(server.listening).toBe(false);
  });

  it("allows pgvector local configs without qdrant or openai details", () => {
    const server = createOperatorServer({
      config: {
        ...buildConfig(),
        qdrant: undefined as never,
        openai: undefined as never,
      },
      registry: {} as ToolRegistry,
      logger: { error: vi.fn() } as unknown as Logger,
      bearerTokens: ["token-a"],
      oauthProtectedResource: null,
      oauthTokenVerifier: null,
      backgroundQueueMetrics: null,
    });

    expect(server.listening).toBe(false);
  });
});

describe("startOperatorServer direct option boundary", () => {
  it.each(malformedOptionCases)(
    "rejects malformed direct options before startup %#",
    ({ input, message }) => {
      expect(() => startOperatorServer(input() as never)).toThrow(message);
    },
  );
});
