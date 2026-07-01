# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Restored Memory ID Row Mapping

Status:
- `src/store/memory-archive-repository.ts` now maps the `memory_records.id`
  returned by `restoreToCanonical` as a positive safe integer before returning
  restored record ids to the unarchive flow.
- `tests/store/memory-archive-repository.test.ts` now covers malformed restored
  id rows through mock-pool restore coverage.

Verification:
- Focused archive/unarchive/db-utils/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
