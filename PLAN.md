# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Background Queue Backlog Count Validation

Status:
- `src/app/metrics.ts` now validates rendered background queue backlog counts
  as non-negative safe integers instead of clamping negatives or truncating
  fractional values.
- `tests/app/metrics.test.ts` now covers `NaN`, negative, fractional, and
  unsafe integer backlog count snapshots.

Verification:
- Focused metrics/background-queue/operator-server/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
