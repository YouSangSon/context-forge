# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Filter Project Key Validation

Status:
- `src/vector/qdrant-index.ts` and `src/vector/pgvector-index.ts` now reject
  malformed query `filter.projectKey` values before calling storage clients.
- `null` and `undefined` preserve the existing scope_id fallback behavior;
  non-string and blank string values fail with clear adapter boundary errors.

Verification:
- Focused Qdrant/pgvector tests passed after RED reproducers.
- Related vector/search tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
