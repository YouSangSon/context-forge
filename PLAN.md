# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Ingest Job Id Row Mapping

Status:
- `src/jobs/ingest-job-repository.ts` now maps ingest job `id` and
  `memory_record_id` rows as positive safe integers before returning jobs.
- `tests/jobs/ingest-job-claim.test.ts` now covers malformed mapped ingest job
  id/reference rows through mock-pool claim coverage.

Verification:
- Focused ingest-job/db-utils/ingest-sweeper/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
