import { execFileSync } from "node:child_process";
import fs from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";

function trackedTypeScriptFiles(): string[] {
  return execFileSync("git", ["ls-files", "src", "tests", "scripts"], {
    encoding: "utf8",
  })
    .split(/\r?\n/)
    .filter((path) => path.endsWith(".ts"))
    .sort();
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
