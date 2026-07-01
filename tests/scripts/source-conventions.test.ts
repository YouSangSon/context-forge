import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type TsConfig = {
  compilerOptions?: {
    noImplicitAny?: unknown;
    strict?: unknown;
    useUnknownInCatchVariables?: unknown;
  };
  include?: unknown;
};

function parseTsConfig(): ts.ParsedCommandLine {
  const config = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
  if (config.error) {
    throw new Error(
      ts.flattenDiagnosticMessageText(config.error.messageText, "\n"),
    );
  }

  const parsed = ts.parseJsonConfigFileContent(
    config.config as TsConfig,
    ts.sys,
    process.cwd(),
  );
  if (parsed.errors.length > 0) {
    throw new Error(
      parsed.errors
        .map((error) => ts.flattenDiagnosticMessageText(error.messageText, "\n"))
        .join("\n"),
    );
  }
  return parsed;
}

function trackedTypeScriptFiles(): string[] {
  const tracked = new Set(
    execFileSync("git", ["ls-files"], { encoding: "utf8" })
      .split(/\r?\n/)
      .filter(Boolean),
  );

  return parseTsConfig()
    .fileNames.map((fileName) =>
      path.relative(process.cwd(), fileName).split(path.sep).join("/"),
    )
    .filter((fileName) => fileName.endsWith(".ts"))
    .filter((fileName) => tracked.has(fileName))
    .sort();
}

function readTsConfig(): TsConfig {
  return JSON.parse(fs.readFileSync("tsconfig.json", "utf8")) as TsConfig;
}

function lineNumberAt(sourceFile: ts.SourceFile, position: number): number {
  return sourceFile.getLineAndCharacterOfPosition(position).line + 1;
}

function collectCatchBindingViolations(path: string): string[] {
  const text = fs.readFileSync(path, "utf8");
  const sourceFile = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  const violations: string[] = [];

  function visit(node: ts.Node): void {
    if (ts.isCatchClause(node)) {
      if (node.variableDeclaration === undefined) {
        violations.push(
          `${path}:${lineNumberAt(sourceFile, node.getStart(sourceFile))} missing catch binding`,
        );
        return;
      }

      const typeNode = node.variableDeclaration.type;
      if (typeNode?.kind !== ts.SyntaxKind.UnknownKeyword) {
        const binding = node.variableDeclaration.name.getText(sourceFile);
        violations.push(
          `${path}:${lineNumberAt(sourceFile, node.getStart(sourceFile))} catch binding ${binding}`,
        );
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return violations;
}

function collectAnyTypeViolations(path: string): string[] {
  const text = fs.readFileSync(path, "utf8");
  const sourceFile = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  const violations: string[] = [];

  function visit(node: ts.Node): void {
    if (node.kind === ts.SyntaxKind.AnyKeyword) {
      violations.push(`${path}:${lineNumberAt(sourceFile, node.getStart(sourceFile))}`);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return violations;
}

function collectTypeScriptSuppressionViolations(path: string): string[] {
  const text = fs.readFileSync(path, "utf8");
  const sourceFile = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  const violations: string[] = [];
  const suppressions = [
    ["@", "ts-ignore"].join(""),
    ["@", "ts-expect-error"].join(""),
    ["@", "ts-nocheck"].join(""),
  ];

  for (const suppression of suppressions) {
    let index = text.indexOf(suppression);
    while (index !== -1) {
      violations.push(`${path}:${lineNumberAt(sourceFile, index)} ${suppression}`);
      index = text.indexOf(suppression, index + suppression.length);
    }
  }

  return violations;
}

describe("source code conventions", () => {
  it("keeps TypeScript strict mode enabled", () => {
    const compilerOptions = readTsConfig().compilerOptions;

    expect(compilerOptions?.strict).toBe(true);
    expect(compilerOptions?.noImplicitAny).not.toBe(false);
    expect(compilerOptions?.useUnknownInCatchVariables).not.toBe(false);
  });

  it("keeps the TypeScript project include set covering checked files", () => {
    expect(readTsConfig().include).toEqual(
      expect.arrayContaining([
        "src/**/*.ts",
        "scripts/**/*.ts",
        "tests/**/*.ts",
        "vitest.config.ts",
      ]),
    );
  });

  it("keeps source catch bindings explicitly typed as unknown", () => {
    const violations = trackedTypeScriptFiles().flatMap((path) =>
      collectCatchBindingViolations(path),
    );

    expect(violations).toEqual([]);
  });

  it("keeps tracked TypeScript files free of explicit any types", () => {
    const violations = trackedTypeScriptFiles().flatMap((path) =>
      collectAnyTypeViolations(path),
    );

    expect(violations).toEqual([]);
  });

  it("keeps tracked TypeScript files free of TypeScript suppression comments", () => {
    const violations = trackedTypeScriptFiles().flatMap((path) =>
      collectTypeScriptSuppressionViolations(path),
    );

    expect(violations).toEqual([]);
  });
});
