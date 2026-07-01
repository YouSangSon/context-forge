# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Semantic Dedup Test Name Refresh

Status:
- `tests/mcp/server.test.ts` still used a planning-era `(P18)` label in the
  semantic dedup test name.
- The loop refreshes that test name and extends public-docs drift coverage for
  the stale phrase.

Verification:
- Focused MCP server/public-docs drift coverage, typecheck, build, audit, full
  tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
