# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Importance Row Mapping

Status:
- `src/store/memory-repository.ts` now maps `memory_records.importance` DB row
  values through numeric validation plus Postgres integer range checks before
  returning hydrated memory records or rebuilding entity graph inputs.
- `tests/store/memory-repository.test.ts` now covers string numeric hydrated
  importance rows and malformed row values.

Verification:
- Focused memory-repository/db-utils/search/MCP/convention tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
