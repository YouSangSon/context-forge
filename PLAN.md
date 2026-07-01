# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Pending Ingest Job Row Mapping

Status:
- `src/store/canonical-indexing.ts` now maps pending ingest job `id` and
  `qdrant_attempts` rows before committing chunk replacement transactions.
- `tests/store/canonical-indexing.test.ts` now covers malformed pending ingest
  job rows and verifies rollback occurs before commit.

Verification:
- Focused canonical-indexing/db-utils/search/vector/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
