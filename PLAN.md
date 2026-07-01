# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Peer Dependencies Guard

Status:
- Package manifest coverage guards that package `peerDependencies` and
  `peerDependenciesMeta` stay absent in both `package.json` and the lockfile
  root metadata.
- The loop catches dependency metadata drift that would turn Akasha's runtime
  dependencies into host/plugin compatibility contracts without an explicit
  dependency policy decision.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
