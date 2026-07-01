# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Rate Limiter Bucket Eviction

Status:
- The in-memory token-bucket limiter now sweeps buckets that have been idle for
  one full refill window.
- Focused coverage verifies stale token buckets are evicted without changing
  normal per-token isolation behavior.

Verification:
- Focused rate-limit coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
