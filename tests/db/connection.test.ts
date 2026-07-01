import { describe, expect, it } from "vitest";
import {
  createPgPool,
  DEFAULT_PG_POOL_OPTIONS,
} from "../../src/db/connection.js";

type InspectablePgPool = {
  options: {
    connectionString: string;
    max: number;
    idleTimeoutMillis: number;
    connectionTimeoutMillis: number;
  };
  end(): Promise<void>;
};

describe("createPgPool", () => {
  it.each([
    {
      input: null,
      message: "pg pool input must be an object",
    },
    {
      input: [],
      message: "pg pool input must be an object",
    },
    {
      input: { connectionString: 123 },
      message: "connectionString must be a string",
    },
    {
      input: { connectionString: " \n\t " },
      message: "connectionString must contain non-whitespace text",
    },
    {
      input: { connectionString: "postgres://user:pass@localhost/db", max: 0 },
      message: "max must be a positive safe integer",
    },
    {
      input: {
        connectionString: "postgres://user:pass@localhost/db",
        idleTimeoutMillis: -1,
      },
      message: "idleTimeoutMillis must be a positive safe integer",
    },
    {
      input: {
        connectionString: "postgres://user:pass@localhost/db",
        connectionTimeoutMillis: Number.NaN,
      },
      message: "connectionTimeoutMillis must be a positive safe integer",
    },
  ])("rejects malformed pool input %#", ({ input, message }) => {
    expect(() => createPgPool(input as never)).toThrow(message);
  });

  it("applies bounded default pool options", async () => {
    const pool = createPgPool({
      connectionString: "postgres://user:pass@localhost:5432/db",
    }) as unknown as InspectablePgPool;

    try {
      expect(pool.options).toEqual(
        expect.objectContaining({
          connectionString: "postgres://user:pass@localhost:5432/db",
          ...DEFAULT_PG_POOL_OPTIONS,
        }),
      );
    } finally {
      await pool.end();
    }
  });

  it("applies explicit pool tuning options", async () => {
    const pool = createPgPool({
      connectionString: "postgres://user:pass@localhost:5432/db",
      max: 24,
      idleTimeoutMillis: 45_000,
      connectionTimeoutMillis: 7_500,
    }) as unknown as InspectablePgPool;

    try {
      expect(pool.options).toEqual(
        expect.objectContaining({
          max: 24,
          idleTimeoutMillis: 45_000,
          connectionTimeoutMillis: 7_500,
        }),
      );
    } finally {
      await pool.end();
    }
  });
});
