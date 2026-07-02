# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Qdrant Query Limit Validation

Status:
- `src/vector/qdrant-index.ts` now validates Qdrant query `limit` values are
  positive safe integers before calling the Qdrant client.
- `tests/vector/qdrant-index.test.ts` now covers zero and fractional limits
  with a mocked client.

Verification:
- Focused Qdrant tests passed after a RED reproducer.
- Related vector/search tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
