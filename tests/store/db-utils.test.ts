import { describe, expect, it } from "vitest";
import { toNumber } from "../../src/store/db-utils.js";

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
