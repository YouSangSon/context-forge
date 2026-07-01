# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Archive ID Row Mapping

Status:
- `src/store/memory-archive-repository.ts` now maps memory archive ids and
  archived source id references as positive safe integers before returning
  compaction, cleanup, claim, or unarchive rows.
- `tests/store/memory-archive-repository.test.ts` now covers malformed archive
  id, `source_record_id`, and nullable `source_id` rows through mock-pool
  coverage.

Verification:
- Focused archive/db-utils/compaction/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
