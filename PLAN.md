# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Service Config Numeric Boundary Validation

Status:
- Direct operator server `ServiceConfig` now validates port and Postgres pool
  numeric fields before construction/startup.
- Direct `port: 0` remains valid for ephemeral test servers, while negative or
  out-of-range ports fail at the option boundary.

Verification:
- Focused operator-server boundary tests passed after RED numeric config
  reproducers.
- Related server, service-config, DB connection, background worker, and metrics
  wiring tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
