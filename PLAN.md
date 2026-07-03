# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Scope Lock Normalization

Status:
- `acquireScopeLock` now trims direct organization, scope type, and scope ID
  fields before building advisory-lock keys.
- Direct scope lock `scopeType` values outside `user` and `project` are
  rejected before querying.

Verification:
- Focused memory archive repository tests passed after RED coverage showed
  raw scope lock fields and invalid lock scope types reaching the query path.
- Full memory archive repository test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
