# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Archive Importance Row Mapping

Status:
- `src/store/memory-archive-repository.ts` now maps archived memory
  `importance` as a Postgres integer before returning archive lookup rows to
  the unarchive flow.
- `tests/store/memory-archive-repository.test.ts` now covers malformed archive
  importance rows through mock-pool lookup coverage.

Verification:
- Focused archive/memory/db-utils/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
