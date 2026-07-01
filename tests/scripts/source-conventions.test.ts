import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { describe, expect, it } from "vitest";

const excludedCatchBindingFiles = new Set([
  // Contains browser-side JavaScript embedded in a template string; TypeScript
  // catch annotations are not valid inside that emitted script.
  "src/app/admin-memory-page.ts",
]);

function trackedTypeScriptFiles(): string[] {
  return execFileSync("git", ["ls-files", "src", "tests", "scripts"], {
    encoding: "utf8",
  })
    .split(/\r?\n/)
    .filter((path) => path.endsWith(".ts"))
    .filter((path) => !excludedCatchBindingFiles.has(path))
    .sort();
}

function lineNumberAt(text: string, index: number): number {
  return text.slice(0, index).split(/\r?\n/).length;
}

describe("source code conventions", () => {
  it("keeps source catch bindings explicitly typed as unknown", () => {
    const violations: string[] = [];
    const catchBindingPattern = /(^|[^.\w$])catch\s*\(([^)]*)\)/g;
    const typedUnknownBindingPattern = /^[A-Za-z_$][\w$]*:\s*unknown$/;

    for (const path of trackedTypeScriptFiles()) {
      const text = fs.readFileSync(path, "utf8");
      for (const match of text.matchAll(catchBindingPattern)) {
        const binding = match[2]?.trim() ?? "";
        if (!typedUnknownBindingPattern.test(binding)) {
          violations.push(`${path}:${lineNumberAt(text, match.index ?? 0)} catch binding ${binding}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
