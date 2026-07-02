# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Upsert Project Key Validation

Status:
- `src/vector/qdrant-index.ts` and `src/vector/pgvector-index.ts` now reject
  malformed upsert `payload.project_key` values before calling storage clients.
- `null` remains valid, while missing, non-string, and blank project keys fail
  with clear adapter boundary errors.

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
