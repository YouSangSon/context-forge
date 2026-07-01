# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Goal Run Id Row Mapping

Status:
- `src/goal-run/goal-run-repository.ts` now maps goal run and iteration id
  rows as positive safe integers before returning runs or iterations.
- `recordIteration` now maps inserted iteration rows before `COMMIT`, so
  malformed returned ids roll back the transaction.
- `tests/goal-run/goal-run-repository.test.ts` now covers malformed run and
  iteration id/reference rows.

Verification:
- Focused goal-run/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
