import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { describe, expect, it } from "vitest";

type PackageJson = {
  author?: unknown;
  bin?: unknown;
  browser?: unknown;
  bundledDependencies?: unknown;
  bundleDependencies?: unknown;
  bugs?: unknown;
  config?: unknown;
  cpu?: unknown;
  dependencies?: Record<string, string>;
  description?: unknown;
  devEngines?: unknown;
  devDependencies?: Record<string, string>;
  engines?: Record<string, string>;
  exports?: unknown;
  files?: unknown;
  homepage?: unknown;
  keywords?: unknown;
  libc?: unknown;
  license?: unknown;
  main?: unknown;
  name?: unknown;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: unknown;
  overrides?: Record<string, string>;
  os?: unknown;
  private?: unknown;
  publishConfig?: unknown;
  repository?: unknown;
  scripts?: Record<string, string>;
  type?: unknown;
  version?: unknown;
  workspaces?: unknown;
};

type PackageLock = {
  lockfileVersion?: unknown;
  name?: unknown;
  packages: Record<
    string,
    {
      config?: unknown;
      dependencies?: Record<string, string>;
      devEngines?: unknown;
      devDependencies?: Record<string, string>;
      engines?: Record<string, string>;
      license?: unknown;
      name?: unknown;
      optionalDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
      peerDependenciesMeta?: unknown;
      version?: unknown;
    }
  >;
  version?: unknown;
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

const EXPECTED_RUNTIME_DEPENDENCIES = [
  "@huggingface/transformers",
  "@modelcontextprotocol/sdk",
  "@qdrant/js-client-rest",
  "jose",
  "openai",
  "pg",
  "pino",
  "zod",
] as const;

const EXPECTED_DEVELOPMENT_DEPENDENCIES = [
  "@types/node",
  "tsx",
  "typescript",
  "vitest",
] as const;

const EXPECTED_PACKAGE_OVERRIDES = {
  esbuild: "^0.28.1",
} as const;

const EXPECTED_ESBUILD_LOCK_VERSION = "0.28.1";

const DISALLOWED_PACKAGE_LIFECYCLE_SCRIPTS = [
  "dependencies",
  "install",
  "postinstall",
  "postpack",
  "postprepare",
  "postpublish",
  "preinstall",
  "prepare",
  "preprepare",
  "prepublish",
  "prepublishOnly",
  "publish",
] as const;

const EXPECTED_PACKAGE_IDENTITY = {
  license: "MIT",
  name: "akasha-mcp",
} as const;

const EXPECTED_PACKAGE_SUPPORT_METADATA = {
  author: "YouSangSon",
  bugs: {
    url: "https://github.com/YouSangSon/akasha/issues",
  },
  homepage: "https://github.com/YouSangSon/akasha#readme",
  repository: {
    type: "git",
    url: "git+https://github.com/YouSangSon/akasha.git",
  },
} as const;

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

  it("keeps npm package identity metadata stable", () => {
    const packageJson = readPackageJson();

    expect({
      license: packageJson.license,
      name: packageJson.name,
    }).toEqual(EXPECTED_PACKAGE_IDENTITY);
  });

  it("does not mark the npm package as private", () => {
    const packageJson = readPackageJson();

    expect(packageJson.private).not.toBe(true);
  });

  it("does not restrict supported install platforms", () => {
    const packageJson = readPackageJson();

    expect(packageJson.os).toBeUndefined();
    expect(packageJson.cpu).toBeUndefined();
    expect(packageJson.libc).toBeUndefined();
  });

  it("does not override npm publish configuration", () => {
    const packageJson = readPackageJson();

    expect(packageJson.publishConfig).toBeUndefined();
  });

  it("does not bundle dependencies into the package tarball", () => {
    const packageJson = readPackageJson();

    expect(packageJson.bundleDependencies).toBeUndefined();
    expect(packageJson.bundledDependencies).toBeUndefined();
  });

  it("does not declare npm workspaces", () => {
    const packageJson = readPackageJson();

    expect(packageJson.workspaces).toBeUndefined();
  });

  it("does not declare optional runtime dependencies", () => {
    const packageJson = readPackageJson();
    const lockfileRoot = readPackageLock().packages[""];

    expect(packageJson.optionalDependencies).toBeUndefined();
    expect(lockfileRoot?.optionalDependencies).toBeUndefined();
  });

  it("does not declare peer dependency contracts", () => {
    const packageJson = readPackageJson();
    const lockfileRoot = readPackageLock().packages[""];

    expect(packageJson.peerDependencies).toBeUndefined();
    expect(packageJson.peerDependenciesMeta).toBeUndefined();
    expect(lockfileRoot?.peerDependencies).toBeUndefined();
    expect(lockfileRoot?.peerDependenciesMeta).toBeUndefined();
  });

  it("does not declare npm devEngines gates", () => {
    const packageJson = readPackageJson();
    const lockfileRoot = readPackageLock().packages[""];

    expect(packageJson.devEngines).toBeUndefined();
    expect(lockfileRoot?.devEngines).toBeUndefined();
  });

  it("does not declare npm package script config", () => {
    const packageJson = readPackageJson();
    const lockfileRoot = readPackageLock().packages[""];

    expect(packageJson.config).toBeUndefined();
    expect(lockfileRoot?.config).toBeUndefined();
  });

  it("keeps npm package support metadata pointed at the project", () => {
    const packageJson = readPackageJson();

    expect({
      author: packageJson.author,
      bugs: packageJson.bugs,
      homepage: packageJson.homepage,
      repository: packageJson.repository,
    }).toEqual(EXPECTED_PACKAGE_SUPPORT_METADATA);
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

  it("keeps generated JavaScript on ESM module resolution", () => {
    const packageJson = readPackageJson();

    expect(packageJson.type).toBe("module");
  });

  it("does not declare browser-specific entrypoint metadata", () => {
    const packageJson = readPackageJson();

    expect(packageJson.browser).toBeUndefined();
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

  it("keeps lockfile top-level identity and format current", () => {
    const packageJson = readPackageJson();
    const packageLock = readPackageLock();

    expect(packageLock.name).toBe(packageJson.name);
    expect(packageLock.version).toBe(packageJson.version);
    expect(packageLock.lockfileVersion).toBe(3);
    expect(packageLock.packages[""]).toBeDefined();
  });

  it("keeps package-lock as the active npm lockfile", () => {
    const trackedShrinkwrap = execFileSync(
      "git",
      ["ls-files", "npm-shrinkwrap.json"],
      { encoding: "utf8" },
    ).trim();

    expect(trackedShrinkwrap).toBe("");
  });

  it("keeps runtime dependencies separate from development tooling", () => {
    const packageJson = readPackageJson();

    expect(Object.keys(packageJson.dependencies ?? {}).sort()).toEqual([
      ...EXPECTED_RUNTIME_DEPENDENCIES,
    ].sort());
    expect(Object.keys(packageJson.devDependencies ?? {}).sort()).toEqual([
      ...EXPECTED_DEVELOPMENT_DEPENDENCIES,
    ].sort());
  });

  it("keeps package overrides scoped to the current build tooling override", () => {
    const packageJson = readPackageJson();

    expect(packageJson.overrides).toEqual(EXPECTED_PACKAGE_OVERRIDES);
  });

  it("keeps the esbuild override reflected in lockfile packages", () => {
    const packageLock = readPackageLock();
    const esbuildPackage = packageLock.packages["node_modules/esbuild"];
    const optionalDependencies = esbuildPackage?.optionalDependencies ?? {};
    const optionalDependencyNames = Object.keys(optionalDependencies).sort();

    expect(esbuildPackage?.version).toBe(EXPECTED_ESBUILD_LOCK_VERSION);
    expect(optionalDependencyNames.length).toBeGreaterThan(0);

    for (const packageName of optionalDependencyNames) {
      expect(optionalDependencies[packageName]).toBe(
        EXPECTED_ESBUILD_LOCK_VERSION,
      );
      expect(packageLock.packages[`node_modules/${packageName}`]?.version).toBe(
        EXPECTED_ESBUILD_LOCK_VERSION,
      );
    }
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

  it("builds clean dist output before npm pack and does not add new package entrypoint surface", () => {
    const packageJson = readPackageJson();

    expect(packageJson.scripts?.clean).toBe(
      "node -e \"require('node:fs').rmSync('dist', { recursive: true, force: true })\"",
    );
    expect(packageJson.scripts?.build).toBe("npm run clean && tsc -p tsconfig.json");
    expect(packageJson.scripts?.prepack).toBe("npm run build");
    expect(packageJson.bin).toBeUndefined();
    expect(packageJson.exports).toBeUndefined();
    expect(packageJson.main).toBeUndefined();
  });

  it("keeps package lifecycle scripts limited to prepack", () => {
    const scripts = readPackageJson().scripts ?? {};

    expect(scripts.prepack).toBe("npm run build");
    for (const scriptName of DISALLOWED_PACKAGE_LIFECYCLE_SCRIPTS) {
      expect(scripts).not.toHaveProperty(scriptName);
    }
  });

  it("keeps contributor verification scripts stable", () => {
    const packageJson = readPackageJson();

    expect(packageJson.scripts?.typecheck).toBe("tsc --noEmit");
    expect(packageJson.scripts?.test).toBe("vitest run");
  });

  it("keeps documented operator scripts pointed at built artifacts", () => {
    const packageJson = readPackageJson();

    expect(packageJson.scripts).toMatchObject({
      "backup:decrypt": "node dist/scripts/backup-encryption.js decrypt-file",
      "backup:verify": "node dist/scripts/backup-verify.js",
      "db:migrate": "node dist/src/db/migrate.js",
      "lifecycle:init": "node dist/src/cli.js init",
      "restore:smoke": "node dist/scripts/restore-smoke.js",
      "start:server": "node dist/src/app/server.js",
      "start:worker": "node dist/src/app/worker.js",
    });
  });

  it("keeps documented backup creation scripts backend-aware", () => {
    const packageJson = readPackageJson();

    expect(packageJson.scripts).toMatchObject({
      "backup:create": "./scripts/create-backup.sh",
      "backup:create:pgvector": "VECTOR_BACKEND=pgvector ./scripts/create-backup.sh",
      "backup:create:qdrant": "VECTOR_BACKEND=qdrant ./scripts/create-backup.sh",
    });
  });

  it("keeps documented development watch scripts pointed at source entrypoints", () => {
    const packageJson = readPackageJson();

    expect(packageJson.scripts).toMatchObject({
      "dev:cli": "tsx src/cli.ts",
      "dev:mcp": "tsx src/mcp/server.ts",
      "dev:server": "tsx src/app/server.ts",
      "dev:worker": "tsx src/app/worker.ts",
      "test:watch": "vitest",
    });
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
