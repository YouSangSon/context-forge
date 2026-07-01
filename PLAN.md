# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Entrypoint Surface Guard

Status:
- Package manifest coverage guards that the package does not add a top-level
  `main` entrypoint alongside the existing `bin` and `exports` absence checks.
- The loop catches package metadata drift where npm consumers could get an
  unintended module entrypoint instead of using the documented scripts.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
