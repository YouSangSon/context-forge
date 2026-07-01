# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Pgvector Query Row Number Guard

Status:
- `src/vector/pgvector-index.ts` now maps query rows through a guarded
  pgvector row mapper before committing the query transaction.
- `tests/vector/pgvector-index.integration.test.ts` covers numeric string
  `score`/`memory_record_id` rows and malformed row numeric values with mocked
  pgvector clients.

Verification:
- Focused vector/search tests passed.
- Typecheck, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
