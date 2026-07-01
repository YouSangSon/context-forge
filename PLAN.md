# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Lock Metadata Guard

Status:
- Package manifest coverage guards `package-lock.json` root identity,
  license, dependency, and dev-dependency metadata against `package.json`.
- The loop keeps lockfile package metadata drift visible before publish or CI
  installs depend on stale root package data.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
