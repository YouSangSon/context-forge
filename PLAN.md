# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — HTTP Metrics Status Code Validation

Status:
- `src/app/metrics.ts` now validates HTTP metric `statusCode` observations as
  safe integers in the `100..599` range before rendering status labels.
- `tests/app/metrics.test.ts` now covers `NaN`, fractional, low, and high
  status code observations.

Verification:
- Focused metrics/server/operator-server/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
