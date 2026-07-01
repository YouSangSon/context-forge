# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Lock Runtime Guard

Status:
- Package manifest coverage guards the minimum supported Node runtime policy
  across both `package.json` and the root lockfile package entry.
- The loop extends the package guard so `package-lock.json` root metadata stays
  aligned with `engines.node` and root `@types/node`.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
