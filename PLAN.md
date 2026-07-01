# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Goal Run Counter Row Mapping

Status:
- `src/goal-run/goal-run-repository.ts` now maps `goal_runs.iteration_count`
  and `goal_run_iterations.iteration_index` through safe-integer row helpers.
- `tests/goal-run/goal-run-repository.test.ts` now covers string numeric run
  counters plus malformed run/iteration counter rows.

Verification:
- Focused goal-run repository/context/handler/convention tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
