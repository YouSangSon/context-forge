# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Dev Engines Guard

Status:
- Package manifest coverage guards that package `devEngines` stays absent in
  both `package.json` and the lockfile root metadata.
- The loop catches metadata drift that would add npm-managed dev-time gates
  before install, ci, or run commands without an explicit tooling policy
  decision.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
