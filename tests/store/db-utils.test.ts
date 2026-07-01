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

  it.each([Number.NaN, Number.POSITIVE_INFINITY, "", " \n\t ", "not-a-number"])(
    "rejects malformed database number values: %s",
    (input) => {
      expect(() => toNumber(input as number | string)).toThrow(
        "database number must be finite",
      );
    },
  );
});
