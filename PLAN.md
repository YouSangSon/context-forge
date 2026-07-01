# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Archive Cleanup Attempt Counter Mapping

Status:
- `src/store/memory-archive-repository.ts` now maps cleanup
  `qdrant_attempt_count` rows as non-negative safe integers before returning
  pending or claimed Qdrant cleanup records.
- `tests/store/memory-archive-repository.test.ts` now covers malformed cleanup
  attempt counter rows for both pending-list and claim-return paths.

Verification:
- Focused archive/db-utils/sweeper/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
