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

  it("runs a moderate-or-higher dependency audit in CI", () => {
    const auditStepIndex = ciWorkflow.indexOf(
      "      - name: Audit dependencies\n",
    );
    const typecheckStepIndex = ciWorkflow.indexOf("      - name: Typecheck\n");

    expect(ciWorkflow).toContain("      - name: Audit dependencies\n");
    expect(ciWorkflow).toContain(
      "        run: npm audit --audit-level=moderate\n",
    );
    expect(auditStepIndex).toBeLessThan(typecheckStepIndex);
  });

  it("builds the package in the main Node matrix before running tests", () => {
    const typecheckStepIndex = ciWorkflow.indexOf("      - name: Typecheck\n");
    const buildStepIndex = ciWorkflow.indexOf("      - name: Build\n");
    const testStepIndex = ciWorkflow.indexOf(
      "      - name: Test (non-PG suites)\n",
    );

    expect(ciWorkflow).toContain("      - name: Build\n");
    expect(ciWorkflow).toContain("        run: npm run build\n");
    expect(typecheckStepIndex).toBeLessThan(buildStepIndex);
    expect(buildStepIndex).toBeLessThan(testStepIndex);
  });

  it("sets explicit job timeouts so hung CI runs do not use the default 360 minutes", () => {
    for (const jobId of [
      "typecheck-and-test",
      "pg-integration",
      "pgvector-integration",
    ]) {
      expect(ciWorkflow).toMatch(
        new RegExp(
          `^  ${jobId}:\\n(?:    [^\\n]+\\n)*    timeout-minutes: 30\\n`,
          "m",
        ),
      );
    }
  });
});
