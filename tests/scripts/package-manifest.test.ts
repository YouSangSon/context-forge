import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { describe, expect, it } from "vitest";

type PackageJson = {
  bin?: unknown;
  dependencies?: Record<string, string>;
  description?: unknown;
  devDependencies?: Record<string, string>;
  engines?: Record<string, string>;
  exports?: unknown;
  files?: unknown;
  keywords?: unknown;
  license?: unknown;
  name?: unknown;
  scripts?: Record<string, string>;
  version?: unknown;
};

type PackageLock = {
  packages: Record<
    string,
    {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      engines?: Record<string, string>;
      license?: unknown;
      name?: unknown;
      version?: unknown;
    }
  >;
};

const EXPECTED_PACKAGE_FILES = [
  "dist/",
  "!dist/tests/",
  "!dist/vitest.config.js",
  "!dist/src/eval/",
  "scripts/*.sh",
  ".env.example",
  "docs/",
  "!docs/_internal/",
  "!docs/skills/",
  "!docs/superpowers/",
  "README.md",
  "README.ko.md",
  "CHANGELOG.md",
  "CHANGELOG.ko.md",
  "CODE_OF_CONDUCT.md",
  "CODE_OF_CONDUCT.ko.md",
  "CONTRIBUTING.md",
  "CONTRIBUTING.ko.md",
  "SECURITY.md",
  "SECURITY.ko.md",
  "LICENSE",
] as const;

const DISALLOWED_ALLOWLIST_ENTRIES = [
  ".github/",
  ".github/**",
  ".superpowers/",
  ".vibe/",
  "AGENTS.md",
  "BACKLOG.md",
  "DECISIONS.md",
  "PLAN.md",
  "WORKLOG.md",
  // Valid for source-checkout docs, but not self-contained in npm tarballs.
  "install.sh",
  "src/",
  "src/**",
  "tests/",
  "tests/**",
] as const;

function readPackageJson(): PackageJson {
  return JSON.parse(fs.readFileSync("package.json", "utf8")) as PackageJson;
}

function readPackageLock(): PackageLock {
  return JSON.parse(fs.readFileSync("package-lock.json", "utf8")) as PackageLock;
}

function trackedRuntimeSourceFiles(): string[] {
  return execFileSync("git", ["ls-files", "src"], { encoding: "utf8" })
    .split(/\r?\n/)
    .filter((path) => path.endsWith(".ts"))
    .filter((path) => !path.startsWith("src/eval/"))
    .sort();
}

function lineNumberAt(text: string, index: number): number {
  return text.slice(0, index).split(/\r?\n/).length;
}

function packageFiles(packageJson: PackageJson): string[] {
  expect(packageJson.files).toBeInstanceOf(Array);
  return packageJson.files as string[];
}

describe("package manifest publish surface", () => {
  it("describes the pluggable vector backend in npm metadata", () => {
    const packageJson = readPackageJson();

    expect(packageJson.description).toBe(
      "A persistent-memory MCP server for AI coding agents. Postgres-backed with Qdrant or pgvector search.",
    );
    expect(packageJson.keywords).toBeInstanceOf(Array);
    expect(packageJson.keywords).toEqual(
      expect.arrayContaining(["postgres", "qdrant", "pgvector"]),
    );
  });

  it("keeps the package and lockfile on the supported Node 22 runtime line", () => {
    const packageJson = readPackageJson();
    const lockfileRoot = readPackageLock().packages[""];

    expect(packageJson.engines?.node).toBe(">=22");
    expect(packageJson.devDependencies?.["@types/node"]).toMatch(/^\^22\./);
    expect(lockfileRoot?.engines?.node).toBe(packageJson.engines?.node);
    expect(lockfileRoot?.devDependencies?.["@types/node"]).toBe(
      packageJson.devDependencies?.["@types/node"],
    );
  });

  it("keeps lockfile root package metadata aligned with package.json", () => {
    const packageJson = readPackageJson();
    const lockfileRoot = readPackageLock().packages[""];

    expect(lockfileRoot?.name).toBe(packageJson.name);
    expect(lockfileRoot?.version).toBe(packageJson.version);
    expect(lockfileRoot?.license).toBe(packageJson.license);
    expect(lockfileRoot?.dependencies).toEqual(packageJson.dependencies);
    expect(lockfileRoot?.devDependencies).toEqual(packageJson.devDependencies);
  });

  it("uses an explicit package allowlist for runtime and public docs assets", () => {
    const files = packageFiles(readPackageJson());

    expect(files).toEqual(EXPECTED_PACKAGE_FILES);
    for (const required of EXPECTED_PACKAGE_FILES) {
      expect(files).toContain(required);
    }
  });

  it("keeps source, test, CI, internal work tracking, and source-checkout-only paths out of the allowlist", () => {
    const files = packageFiles(readPackageJson());

    for (const disallowed of DISALLOWED_ALLOWLIST_ENTRIES) {
      expect(files).not.toContain(disallowed);
    }

    expect(files.filter((entry) => entry.startsWith("!"))).toEqual([
      "!dist/tests/",
      "!dist/vitest.config.js",
      "!dist/src/eval/",
      "!docs/_internal/",
      "!docs/skills/",
      "!docs/superpowers/",
    ]);
  });

  it("builds clean dist output before npm pack and does not add new CLI surface", () => {
    const packageJson = readPackageJson();

    expect(packageJson.scripts?.clean).toBe(
      "node -e \"require('node:fs').rmSync('dist', { recursive: true, force: true })\"",
    );
    expect(packageJson.scripts?.build).toBe("npm run clean && tsc -p tsconfig.json");
    expect(packageJson.scripts?.prepack).toBe("npm run build");
    expect(packageJson.bin).toBeUndefined();
    expect(packageJson.exports).toBeUndefined();
  });

  it("keeps the excluded eval harness out of runtime imports", () => {
    const violations: string[] = [];
    const evalImportPattern =
      /(?:from\s+|import\s*\()\s*["'][^"']*\/eval(?:\/|["'])/g;

    for (const path of trackedRuntimeSourceFiles()) {
      const text = fs.readFileSync(path, "utf8");
      for (const match of text.matchAll(evalImportPattern)) {
        violations.push(`${path}:${lineNumberAt(text, match.index ?? 0)}`);
      }
    }

    expect(violations).toEqual([]);
  });
});
