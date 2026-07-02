import { describe, expect, it } from "vitest";
import { toIsoString, toNumber } from "../../src/store/db-utils.js";

describe("toNumber", () => {
  it.each([
    [42, 42],
    ["42", 42],
    ["0.75", 0.75],
  ])("maps finite database number values: %s", (input, expected) => {
    expect(toNumber(input)).toBe(expected);
  });

  const malformedValues: unknown[] = [
    Number.NaN,
    Number.POSITIVE_INFINITY,
    "",
    " \n\t ",
    "not-a-number",
    "0x10",
    null,
    undefined,
    false,
    true,
    [],
    [1],
    { value: "1" },
  ];

  it.each(malformedValues.map((input) => [input]))(
    "rejects malformed database number values: %#",
    (input) => {
      expect(() => toNumber(input)).toThrow("database number must be finite");
    },
  );
});

describe("toIsoString", () => {
  it.each([
    [new Date("2026-06-26T00:00:00.000Z"), "2026-06-26T00:00:00.000Z"],
    ["2026-06-26T00:00:00.000Z", "2026-06-26T00:00:00.000Z"],
    ["2026-06-26T00:00:00Z", "2026-06-26T00:00:00.000Z"],
  ])("maps valid database timestamps: %s", (input, expected) => {
    expect(toIsoString(input)).toBe(expected);
  });

  const malformedValues: unknown[] = [
    new Date("not-a-date"),
    "not-a-date",
    "",
    " \n\t ",
    null,
    undefined,
    0,
    false,
    [],
    { value: "2026-06-26T00:00:00.000Z" },
  ];

  it.each(malformedValues.map((input) => [input]))(
    "rejects malformed database timestamp values: %#",
    (input) => {
      expect(() => toIsoString(input as never)).toThrow(
        "database timestamp must be a valid timestamp",
      );
    },
  );
});
