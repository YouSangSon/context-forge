# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Monotonic Dependency Probe Durations

Status:
- `src/health/check-dependencies.ts` now measures dependency probe durations
  with `process.hrtime.bigint()` instead of wall-clock `Date.now()` deltas.
- `tests/health/check-dependencies.test.ts` now covers wall-clock time moving
  backward while probe duration remains non-negative.

Verification:
- Focused health/metrics/server/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
