# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector DeleteByRecordIds List Validation

Status:
- Qdrant and pgvector `deleteByRecordIds(recordIds)` now reject non-array
  record-ID lists before reading `recordIds.length`.
- Null record-ID lists now fail with a clear boundary error before storage
  clients are called.

Verification:
- Focused Qdrant/pgvector tests passed after RED reproducers.
- Related vector/search/canonical-indexing/compaction tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
