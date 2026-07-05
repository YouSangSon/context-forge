# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Code Intelligence Positioning Docs

Status:
- Selected one P2 documentation item from current repo evidence plus a GitHub
  check of `DeusData/codebase-memory-mcp`.
- README comparison now distinguishes Akasha's durable agent-memory scope from
  complementary code-intelligence MCP servers.
- English and Korean README/CHANGELOG entries are in sync.
- `BACKLOG.md` has no known open P0/P1/P2 implementation items after this loop.

Verification:
- RED: `npm test -- tests/scripts/public-docs-drift.test.ts -t "code-intelligence MCP" --reporter=dot`
  failed because README did not yet mention `codebase-memory-mcp`.
- GREEN focused: same command passed (`1` test passed, `45` skipped).
- GREEN docs drift: `npm test -- tests/scripts/public-docs-drift.test.ts --reporter=dot`
  passed (`46` tests).
- GREEN source conventions: `npm test -- tests/scripts/source-conventions.test.ts --reporter=dot`
  passed (`6` tests).
- `git diff --check` passed.

## Next Loop Candidates

- Audit current `main` for one clear improvement target, preferring stability,
  tests, scalability, developer experience, documentation, then features.
