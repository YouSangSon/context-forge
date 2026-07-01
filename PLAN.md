# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Optional Dependencies Guard

Status:
- Package manifest coverage guards that package `optionalDependencies` stays
  absent in both `package.json` and the lockfile root metadata.
- The loop catches dependency metadata drift that would make runtime dependency
  install failures non-fatal or override normal dependency entries without an
  explicit dependency policy decision.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
