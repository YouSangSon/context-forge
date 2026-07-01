# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Graph Relationship Confidence Row Mapping

Status:
- `src/store/memory-repository.ts` now maps graph relationship `confidence`
  rows through finite numeric conversion plus a 0..1 range check before
  returning graph relationships.
- `tests/store/memory-repository.test.ts` now covers malformed graph
  relationship confidence rows through mock-pool `inspectMemoryGraph` coverage.

Verification:
- Focused memory-repository/db-utils/MCP/search/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
