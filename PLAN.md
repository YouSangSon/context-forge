# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Pg Pool Connection String Normalization

Status:
- Pg pool construction now trims direct connection strings before
  instantiating the node-postgres pool.
- Pool option validation and defaults remain unchanged.

Verification:
- Focused DB connection tests passed after the RED connection-string trimming
  reproducer.
- Related config and operator server boundary tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
