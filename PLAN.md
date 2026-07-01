# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Dependency Scope Guard

Status:
- Package manifest coverage guards the intended runtime dependency set
  separately from development-only tooling.
- The loop catches package metadata drift where runtime libraries and local
  build/test tools move across the `dependencies` / `devDependencies`
  boundary.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
