# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Chunk Id Row Mapping

Status:
- `src/store/canonical-indexing.ts` now maps `memory_chunks.id` and
  `memory_record_id` rows as positive safe integers before returning stored or
  reindexable chunks.
- `tests/store/canonical-indexing.test.ts` now covers malformed chunk id rows
  through mock-pool insert chunk coverage.

Verification:
- Focused canonical-indexing/db-utils/search/vector/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
