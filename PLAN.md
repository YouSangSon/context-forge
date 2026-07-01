# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Ingest Job Counter Row Mapping

Status:
- `src/jobs/ingest-job-repository.ts` now maps `attempts` and
  `qdrant_attempts` database row values through shared numeric validation plus
  non-negative safe-integer checks.
- `tests/jobs/ingest-job-claim.test.ts` now covers string row values and
  malformed counter rows without requiring a live Postgres instance.

Verification:
- Focused ingest-job/db-utils/ingest-sweeper/convention tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
