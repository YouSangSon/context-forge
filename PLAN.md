# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Qdrant Vector Score Validation

Status:
- `src/vector/qdrant-index.ts` now validates Qdrant query result scores as
  finite numbers before returning `VectorHit[]`.
- `tests/vector/qdrant-index.test.ts` now covers malformed non-finite Qdrant
  scores so bad remote/client responses fail at the vector adapter boundary.

Verification:
- Focused vector/search tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
