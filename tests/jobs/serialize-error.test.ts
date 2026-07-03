import { describe, expect, it, vi, afterEach } from "vitest";
import { createIngestJobRepository } from "../../src/jobs/ingest-job-repository.js";

afterEach(() => {
  vi.restoreAllMocks();
});

function makeValidJobRow() {
  return {
    id: 1,
    memory_record_id: 42,
    organization_id: "default",
    status: "failed",
    attempts: 1,
    last_error: null,
    qdrant_status: "pending",
    qdrant_attempts: 0,
    qdrant_next_retry_at: null,
    qdrant_last_error: null,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

describe("serializeError (via markFailed)", () => {
  it("stores error.message, not the stack, in the DB", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [makeValidJobRow()] });
      }),
    };

    const jobs = createIngestJobRepository(fakePool as never);
    const err = new Error("something went wrong");
    // Ensure the error has a stack (node always sets one)
    expect(err.stack).toBeDefined();

    await jobs.markFailed(1, err);

    // params[1] is the serialized error stored in last_error column
    const storedError = capturedParams?.[1] as string;
    expect(storedError).toBe("something went wrong");
    expect(storedError).not.toContain("at ");
  });

  it("stores String(error) for non-Error values", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [makeValidJobRow()] });
      }),
    };

    const jobs = createIngestJobRepository(fakePool as never);
    await jobs.markFailed(1, "timeout exceeded");

    const storedError = capturedParams?.[1] as string;
    expect(storedError).toBe("timeout exceeded");
  });

  it("trims serialized ingest job errors before persistence", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [makeValidJobRow()] });
      }),
    };

    const jobs = createIngestJobRepository(fakePool as never);
    await jobs.markFailed(1, new Error(" timeout exceeded "));

    expect(capturedParams?.[1]).toBe("timeout exceeded");
  });

  it("stores blank serialized ingest job errors as null", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [makeValidJobRow()] });
      }),
    };

    const jobs = createIngestJobRepository(fakePool as never);
    await jobs.markFailed(1, " \n\t ");

    expect(capturedParams?.[1]).toBeNull();
  });
});
