import fs from "node:fs";
import { describe, expect, it } from "vitest";

const ciWorkflow = fs.readFileSync(".github/workflows/ci.yml", "utf8");

describe("CI workflow hygiene", () => {
  it("keeps the default GitHub token permissions read-only", () => {
    const permissionsBlock = ciWorkflow.match(
      /^permissions:\n((?:  [^\n]+\n)+)/m,
    )?.[1];

    expect(permissionsBlock).toBe("  contents: read\n");
  });

  it("defines workflow token permissions before jobs", () => {
    expect(ciWorkflow.indexOf("permissions:\n")).toBeGreaterThanOrEqual(0);
    expect(ciWorkflow.indexOf("permissions:\n")).toBeLessThan(
      ciWorkflow.indexOf("jobs:\n"),
    );
  });

  it("does not grant broad or contents write token permissions", () => {
    expect(ciWorkflow).not.toMatch(/^\s*permissions:\s+write-all\b/m);
    expect(ciWorkflow).not.toMatch(/^\s*contents:\s+write\b/m);
  });
});
