# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Upsert Point List Validation

Status:
- `src/vector/organization-id.ts` now rejects non-array point lists before
  iterating or reading `points.length`.
- Qdrant and pgvector upserts now fail with a clear boundary error for null
  point lists instead of throwing incidental property-access errors.

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
