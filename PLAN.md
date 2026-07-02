# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Operator Server Test Isolation

Status:
- `startOperatorServer` now accepts explicit test hooks for the background
  worker starter and readiness probe pool while preserving production defaults.
- Operator server worker/metrics tests no longer use module-level mocks for
  `background-workers`, `background-queue-metrics`, or `db/connection`.

Verification:
- Focused operator server worker and metrics tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
