# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Background Queue Count Row Mapping

Status:
- `src/app/background-queue-metrics.ts` now maps `COUNT(*)` rows as
  non-negative safe integers instead of truncating fractional values or
  clamping negatives to zero.
- `tests/app/background-queue-metrics.test.ts` now covers nonnumeric,
  negative, fractional, and `NaN` count rows.

Verification:
- Focused background queue/metrics/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
