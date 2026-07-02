# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector EnsureCollection Dimension Validation

Status:
- `src/vector/qdrant-index.ts` and `src/vector/pgvector-index.ts` now validate
  `ensureCollection(dimensions)` values are positive safe integers before
  calling storage clients.
- Qdrant and pgvector tests now cover zero, fractional, and `NaN` dimensions
  with mocked clients.

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
