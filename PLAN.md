# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Store Governance Tag Filter Normalization

Status:
- `listMemoryForGovernance` now validates and trims direct tag filters before
  querying.
- Whitespace-only direct tag filters fail before any query is issued.

Verification:
- Focused memory repository tests passed after RED tag filter trim/blank
  reproducers.
- Related MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
