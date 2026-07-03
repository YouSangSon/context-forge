import { describe, expect, it, vi } from "vitest";
import { createAuditLogRepository } from "../../src/audit/audit-log-repository.js";

const MAX_ERROR_MESSAGE_LENGTH = 1024;

describe("createAuditLogRepository — error_message truncation", () => {
  it.each([
    {
      pool: null,
      message: "audit log pool must be an object",
    },
    {
      pool: { query: "SELECT 1" },
      message: "audit log pool.query must be a function",
    },
  ])("rejects malformed direct pool inputs", ({ pool, message }) => {
    expect(() => createAuditLogRepository(pool as never)).toThrow(message);
  });

  it.each([
    {
      entry: null,
      message: "audit log entry must be an object",
    },
    {
      entry: buildAuditEntry({ actor: " \n\t " }),
      message: "actor must contain non-whitespace text",
    },
    {
      entry: buildAuditEntry({ tool: null }),
      message: "tool must be a string",
    },
    {
      entry: buildAuditEntry({ outcome: "skipped" }),
      message: 'outcome must be "ok" or "error"',
    },
    {
      entry: buildAuditEntry({ durationMs: Number.NaN }),
      message: "durationMs must be a non-negative finite number",
    },
    {
      entry: buildAuditEntry({ durationMs: -1 }),
      message: "durationMs must be a non-negative finite number",
    },
    {
      entry: buildAuditEntry({ projectKey: " \n\t " }),
      message: "projectKey must contain non-whitespace text",
    },
    {
      entry: buildAuditEntry({ errorMessage: 42 }),
      message: "errorMessage must be a string when provided",
    },
    {
      entry: buildAuditEntry({ requestId: " \n\t " }),
      message: "requestId must contain non-whitespace text",
    },
  ])(
    "record rejects malformed direct entries before querying",
    async ({ entry, message }) => {
      const fakePool = {
        query: vi.fn().mockResolvedValue({ rows: [] }),
      };
      const repo = createAuditLogRepository(fakePool as never);

      await expect(repo.record(entry as never)).rejects.toThrow(message);

      expect(fakePool.query).not.toHaveBeenCalled();
    },
  );

  it("record rejects whitespace-only organizationId before querying", async () => {
    const fakePool = {
      query: vi.fn().mockResolvedValue({ rows: [] }),
    };
    const repo = createAuditLogRepository(fakePool as never);

    await expect(
      repo.record({
        organizationId: " \n\t ",
        actor: "alice",
        tool: "add_memory",
        outcome: "ok",
        durationMs: 5,
      }),
    ).rejects.toThrow(/organizationId/);

    expect(fakePool.query).not.toHaveBeenCalled();
  });

  it("listByOrganization rejects whitespace-only organizationId before querying", async () => {
    const fakePool = {
      query: vi.fn().mockResolvedValue({ rows: [] }),
    };
    const repo = createAuditLogRepository(fakePool as never);

    await expect(
      repo.listByOrganization(" \n\t ", { limit: 10 }),
    ).rejects.toThrow(/organizationId/);

    expect(fakePool.query).not.toHaveBeenCalled();
  });

  it.each([
    {
      options: null,
      message: "audit log list options must be an object",
    },
    {
      options: "limit",
      message: "audit log list options must be an object",
    },
    {
      options: { limit: "10" },
      message: "audit log limit must be a positive integer up to 1000",
    },
  ])(
    "listByOrganization rejects malformed direct options before querying",
    async ({ options, message }) => {
      const fakePool = {
        query: vi.fn().mockResolvedValue({ rows: [] }),
      };
      const repo = createAuditLogRepository(fakePool as never);

      await expect(
        repo.listByOrganization("org-1", options as never),
      ).rejects.toThrow(message);

      expect(fakePool.query).not.toHaveBeenCalled();
    },
  );

  it.each([0, -1, 1.5, Number.NaN, 1001])(
    "listByOrganization rejects invalid direct limits before querying: %s",
    async (limit) => {
      const fakePool = {
        query: vi.fn().mockResolvedValue({ rows: [] }),
      };
      const repo = createAuditLogRepository(fakePool as never);

      await expect(
        repo.listByOrganization("org-1", { limit }),
      ).rejects.toThrow(
        "audit log limit must be a positive integer up to 1000",
      );

      expect(fakePool.query).not.toHaveBeenCalled();
    },
  );

  it.each([
    ["default", undefined, 100],
    ["minimum", 1, 1],
    ["maximum", 1000, 1000],
  ] as const)(
    "listByOrganization preserves %s direct limits",
    async (_label, limit, expectedLimit) => {
      const fakePool = {
        query: vi.fn().mockResolvedValue({ rows: [] }),
      };
      const repo = createAuditLogRepository(fakePool as never);

      await expect(
        repo.listByOrganization(
          "org-1",
          limit === undefined ? undefined : { limit },
        ),
      ).resolves.toEqual([]);

      expect(fakePool.query).toHaveBeenCalledWith(
        expect.any(String),
        ["org-1", expectedLimit],
      );
    },
  );

  it("listByOrganization trims direct organizationId before querying", async () => {
    const fakePool = {
      query: vi.fn().mockResolvedValue({ rows: [] }),
    };
    const repo = createAuditLogRepository(fakePool as never);

    await expect(
      repo.listByOrganization(" org-1 ", { limit: 10 }),
    ).resolves.toEqual([]);

    expect(fakePool.query).toHaveBeenCalledWith(
      expect.any(String),
      ["org-1", 10],
    );
  });

  it("listByOrganization maps numeric audit row values through shared DB helpers", async () => {
    const fakePool = {
      query: vi.fn().mockResolvedValue({
        rows: [
          buildAuditRow({
            id: "42",
            duration_ms: "17",
            created_at: new Date("2026-04-25T00:00:00.000Z"),
          }),
        ],
      }),
    };
    const repo = createAuditLogRepository(fakePool as never);

    await expect(repo.listByOrganization("org-1")).resolves.toEqual([
      {
        id: 42,
        organizationId: "org-1",
        actor: "alice",
        tool: "add_memory",
        projectKey: "project-alpha",
        outcome: "ok",
        errorMessage: null,
        durationMs: 17,
        requestId: "req-1",
        createdAt: "2026-04-25T00:00:00.000Z",
      },
    ]);
  });

  it.each([
    {
      label: "id null",
      row: buildAuditRow({ id: null }),
      message: "database number must be finite",
    },
    {
      label: "id zero",
      row: buildAuditRow({ id: "0" }),
      message: "audit log id must be a positive safe integer",
    },
    {
      label: "id fractional",
      row: buildAuditRow({ id: "1.5" }),
      message: "audit log id must be a positive safe integer",
    },
    {
      label: "id boolean",
      row: buildAuditRow({ id: false }),
      message: "database number must be finite",
    },
    {
      label: "id array",
      row: buildAuditRow({ id: [42] }),
      message: "database number must be finite",
    },
    {
      label: "duration null",
      row: buildAuditRow({ duration_ms: null }),
      message: "database number must be finite",
    },
    {
      label: "duration negative",
      row: buildAuditRow({ duration_ms: "-1" }),
      message: "audit log duration_ms must be a non-negative safe integer",
    },
    {
      label: "duration fractional",
      row: buildAuditRow({ duration_ms: "1.5" }),
      message: "audit log duration_ms must be a non-negative safe integer",
    },
    {
      label: "duration boolean",
      row: buildAuditRow({ duration_ms: false }),
      message: "database number must be finite",
    },
    {
      label: "duration array",
      row: buildAuditRow({ duration_ms: [17] }),
      message: "database number must be finite",
    },
  ])(
    "listByOrganization rejects malformed audit row number values: $label",
    async ({ row, message }) => {
      const fakePool = {
        query: vi.fn().mockResolvedValue({ rows: [row] }),
      };
      const repo = createAuditLogRepository(fakePool as never);

      await expect(repo.listByOrganization("org-1")).rejects.toThrow(message);
    },
  );

  it.each([
    { label: "unknown", outcome: "skipped" },
    { label: "null", outcome: null },
    { label: "boolean", outcome: false },
  ])(
    "listByOrganization rejects malformed audit row outcomes: $label",
    async ({ outcome }) => {
      const fakePool = {
        query: vi.fn().mockResolvedValue({
          rows: [buildAuditRow({ outcome })],
        }),
      };
      const repo = createAuditLogRepository(fakePool as never);

      await expect(repo.listByOrganization("org-1")).rejects.toThrow(
        'audit log outcome must be "ok" or "error"',
      );
    },
  );

  it.each([
    {
      label: "organization null",
      row: buildAuditRow({ organization_id: null }),
      message: "audit log organization_id must be a string",
    },
    {
      label: "organization blank",
      row: buildAuditRow({ organization_id: " \n\t " }),
      message: "audit log organization_id must contain non-whitespace text",
    },
    {
      label: "actor null",
      row: buildAuditRow({ actor: null }),
      message: "audit log actor must be a string",
    },
    {
      label: "actor blank",
      row: buildAuditRow({ actor: " \n\t " }),
      message: "audit log actor must contain non-whitespace text",
    },
    {
      label: "tool boolean",
      row: buildAuditRow({ tool: false }),
      message: "audit log tool must be a string",
    },
    {
      label: "tool blank",
      row: buildAuditRow({ tool: " \n\t " }),
      message: "audit log tool must contain non-whitespace text",
    },
    {
      label: "project key number",
      row: buildAuditRow({ project_key: 42 }),
      message: "audit log project_key must be a string or null",
    },
    {
      label: "project key blank",
      row: buildAuditRow({ project_key: " \n\t " }),
      message: "audit log project_key must contain non-whitespace text",
    },
    {
      label: "error message boolean",
      row: buildAuditRow({ error_message: false }),
      message: "audit log error_message must be a string or null",
    },
    {
      label: "request id number",
      row: buildAuditRow({ request_id: 42 }),
      message: "audit log request_id must be a string or null",
    },
    {
      label: "request id blank",
      row: buildAuditRow({ request_id: " \n\t " }),
      message: "audit log request_id must contain non-whitespace text",
    },
  ])(
    "listByOrganization rejects malformed audit row scalar values: $label",
    async ({ row, message }) => {
      const fakePool = {
        query: vi.fn().mockResolvedValue({ rows: [row] }),
      };
      const repo = createAuditLogRepository(fakePool as never);

      await expect(repo.listByOrganization("org-1")).rejects.toThrow(message);
    },
  );

  it("truncates error_message to 1024 chars before persistence", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [] });
      }),
    };

    const repo = createAuditLogRepository(fakePool as never);
    const longMessage = "x".repeat(2000);

    await repo.record({
      organizationId: "org-1",
      actor: "alice",
      tool: "add_memory",
      outcome: "error",
      errorMessage: longMessage,
      durationMs: 42,
    });

    // error_message is the 6th parameter (index 5) in the INSERT VALUES list
    const storedMessage = capturedParams?.[5] as string;
    expect(storedMessage).toHaveLength(MAX_ERROR_MESSAGE_LENGTH);
    expect(storedMessage).toBe("x".repeat(MAX_ERROR_MESSAGE_LENGTH));
  });

  it("trims direct audit entry text before persistence", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [] });
      }),
    };

    const repo = createAuditLogRepository(fakePool as never);

    await repo.record({
      organizationId: " org-1 ",
      actor: " alice ",
      tool: " add_memory ",
      projectKey: " project-alpha ",
      outcome: "error",
      errorMessage: " repository down ",
      durationMs: 42,
      requestId: " req-1 ",
    });

    expect(capturedParams).toEqual([
      "org-1",
      "alice",
      "add_memory",
      "project-alpha",
      "error",
      "repository down",
      42,
      "req-1",
    ]);
  });

  it("stores blank direct error messages as null", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [] });
      }),
    };

    const repo = createAuditLogRepository(fakePool as never);

    await repo.record({
      organizationId: "org-1",
      actor: "alice",
      tool: "add_memory",
      outcome: "error",
      errorMessage: " \n\t ",
      durationMs: 42,
    });

    expect(capturedParams?.[5]).toBeNull();
  });

  it("preserves error_message at exactly 1024 chars (boundary — no truncation)", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [] });
      }),
    };

    const repo = createAuditLogRepository(fakePool as never);
    const exactMessage = "y".repeat(MAX_ERROR_MESSAGE_LENGTH);

    await repo.record({
      organizationId: "org-1",
      actor: "alice",
      tool: "add_memory",
      outcome: "error",
      errorMessage: exactMessage,
      durationMs: 10,
    });

    const storedMessage = capturedParams?.[5] as string;
    expect(storedMessage).toHaveLength(MAX_ERROR_MESSAGE_LENGTH);
  });

  it("passes null error_message through unchanged", async () => {
    let capturedParams: unknown[] | undefined;

    const fakePool = {
      query: vi.fn().mockImplementation((_sql: string, params: unknown[]) => {
        capturedParams = params;
        return Promise.resolve({ rows: [] });
      }),
    };

    const repo = createAuditLogRepository(fakePool as never);

    await repo.record({
      organizationId: "org-1",
      actor: "alice",
      tool: "add_memory",
      outcome: "ok",
      durationMs: 5,
    });

    const storedMessage = capturedParams?.[5];
    expect(storedMessage).toBeNull();
  });
});

function buildAuditEntry(overrides: Record<string, unknown> = {}) {
  return {
    organizationId: "org-1",
    actor: "alice",
    tool: "add_memory",
    outcome: "ok",
    durationMs: 5,
    ...overrides,
  };
}

function buildAuditRow(overrides: Record<string, unknown> = {}) {
  return {
    id: 1,
    organization_id: "org-1",
    actor: "alice",
    tool: "add_memory",
    project_key: "project-alpha",
    outcome: "ok",
    error_message: null,
    duration_ms: 5,
    request_id: "req-1",
    created_at: "2026-04-25T00:00:00.000Z",
    ...overrides,
  };
}
