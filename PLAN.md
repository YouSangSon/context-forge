# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Sweeper Row Counter Validation

Status:
- `src/app/metrics.ts` now validates sweeper row outcome counters as
  non-negative safe integers instead of clamping negatives or accepting
  fractional values.
- `tests/app/metrics.test.ts` now covers infinite, `NaN`, negative,
  fractional, and unsafe integer sweeper row counts.

Verification:
- Focused metrics/sweeper-loop/operator-server/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
