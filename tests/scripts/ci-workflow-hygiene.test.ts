import fs from "node:fs";
import { describe, expect, it } from "vitest";

const ciWorkflow = fs.readFileSync(".github/workflows/ci.yml", "utf8");

describe("CI workflow hygiene", () => {
  it("runs on pushes and pull requests targeting main", () => {
    expect(ciWorkflow).toContain(
      "on:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n",
    );
  });

  it("cancels stale workflow runs for the same branch or pull request", () => {
    expect(ciWorkflow).toContain(
      "concurrency:\n  group: ${{ github.workflow }}-${{ github.head_ref || github.ref }}\n  cancel-in-progress: true\n",
    );
  });

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

  it("keeps CI npm installs CPU-only to avoid flaky GPU binary downloads", () => {
    const installSteps = ciWorkflow.match(
      /      - name: Install\n(?:        # [^\n]+\n)*        run: ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm ci\n/g,
    );

    expect(installSteps).toHaveLength(3);
  });

  it("keeps the main CI Node matrix on supported runtime lines", () => {
    expect(ciWorkflow).toContain('        node: ["22", "24"]\n');
    expect(ciWorkflow).toContain("          node-version: ${{ matrix.node }}\n");
  });

  it("keeps the Node matrix from canceling sibling jobs on first failure", () => {
    expect(ciWorkflow).toContain(
      '    strategy:\n      fail-fast: false\n      matrix:\n        node: ["22", "24"]\n',
    );
  });

  it("keeps npm dependency caching enabled for setup-node steps", () => {
    const setupNodeSteps = ciWorkflow.match(
      /      - name: Setup Node\n        uses: actions\/setup-node@v4\n        with:\n(?:          [^\n]+\n)+/g,
    );

    expect(setupNodeSteps).toHaveLength(3);
    expect(
      setupNodeSteps?.filter((step) => step.includes("          cache: npm\n")),
    ).toHaveLength(3);
  });

  it("rejects unguarded npm install commands in CI", () => {
    const violations = ciWorkflow
      .split(/\r?\n/)
      .map((line, index) => ({ line: index + 1, text: line.trim() }))
      .filter(({ text }) =>
        /^(?:run:\s+)?npm (?:ci|i|install)\b/.test(text),
      )
      .map(({ line, text }) => `${line}: ${text}`);

    expect(violations).toEqual([]);
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

  it("documents backend-gated integration skips in the main Node matrix", () => {
    expect(ciWorkflow).toContain(
      "pgvector adapter cases skip without\n        # PGVECTOR_TEST_URL",
    );
    expect(ciWorkflow).toContain("  pg-integration:\n");
    expect(ciWorkflow).toContain("  pgvector-integration:\n");
    expect(ciWorkflow).not.toContain("The 3 PG-dependent test files");
  });

  it("keeps the Postgres integration job focused on Postgres-backed suites", () => {
    const pgJobStart = ciWorkflow.indexOf("  pg-integration:\n");
    const pgvectorJobStart = ciWorkflow.indexOf("  pgvector-integration:\n");

    expect(pgJobStart).toBeGreaterThanOrEqual(0);
    expect(pgvectorJobStart).toBeGreaterThan(pgJobStart);

    const pgJob = ciWorkflow.slice(pgJobStart, pgvectorJobStart);

    expect(pgJob).toContain("      - name: Run Postgres-backed suites\n");
    expect(pgJob).toContain("        run: >\n          npx vitest run\n");
    expect(pgJob).toContain("          tests/store/memory-repository.test.ts\n");
    expect(pgJob).toContain("          tests/jobs/ingest-job-repository.test.ts\n");
    expect(pgJob).toContain("          tests/db/migrate.test.ts\n");
    expect(pgJob).not.toContain("        run: npm test\n");
  });

  it("keeps the pgvector integration job focused on the pgvector suite", () => {
    const pgvectorJobStart = ciWorkflow.indexOf("  pgvector-integration:\n");

    expect(pgvectorJobStart).toBeGreaterThanOrEqual(0);

    const pgvectorJob = ciWorkflow.slice(pgvectorJobStart);

    expect(pgvectorJob).toContain("      - name: Run pgvector integration suite\n");
    expect(pgvectorJob).toContain(
      "          PGVECTOR_TEST_URL: postgres://memory:memory@127.0.0.1:5433/memory_pgv\n",
    );
    expect(pgvectorJob).toContain(
      "        run: npx vitest run tests/vector/pgvector-index.integration.test.ts\n",
    );
    expect(pgvectorJob).not.toContain("        run: npm test\n");
  });

  it("waits for database service containers to pass health checks", () => {
    for (const dbName of ["memory_os", "memory_pgv"]) {
      expect(ciWorkflow).toContain(
        `        options: >-\n          --health-cmd "pg_isready -U memory -d ${dbName}"\n          --health-interval 10s\n          --health-timeout 5s\n          --health-retries 10\n`,
      );
    }
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
