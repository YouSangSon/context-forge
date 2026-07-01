# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Graph Entity Row Mapping

Status:
- `src/store/memory-repository.ts` now maps graph entity `mention_count` as a
  non-negative safe integer and `memory_ids` as positive safe integers.
- `tests/store/memory-repository.test.ts` now covers malformed graph entity
  count/id rows before relationship lookup continues.

Verification:
- Focused memory-repository/db-utils/MCP/search/convention tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
