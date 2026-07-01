# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Pgvector Memory Record ID Row Mapping

Status:
- `src/vector/pgvector-index.ts` now maps query payload
  `memory_record_id` rows as positive safe integers while leaving similarity
  `score` as a finite float.
- `tests/vector/pgvector-index.integration.test.ts` now covers zero,
  fractional, boolean, and array `memory_record_id` rows through the existing
  mock-pool query path.

Verification:
- Focused pgvector/point-builder/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
