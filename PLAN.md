# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Chunk Row Mapping

Status:
- `src/store/canonical-indexing.ts` now maps `memory_chunks` index and offset
  row values through shared numeric validation plus non-negative safe-integer
  checks.
- `tests/store/canonical-indexing.test.ts` now covers string numeric chunk rows
  and malformed returned chunk rows across insert/list/get paths.

Verification:
- Focused canonical-indexing/db-utils/search/vector/convention tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
