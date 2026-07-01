# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Metrics Duration Validation

Status:
- `src/app/metrics.ts` now validates HTTP, sweeper, and dependency metric
  durations as non-negative finite numbers instead of clamping negative values
  to zero.
- `tests/app/metrics.test.ts` now covers negative duration observations and
  keeps non-integer positive durations valid.

Verification:
- Focused metrics/server/health/sweeper/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
