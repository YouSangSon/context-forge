# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Lockfile Platform Metadata Guard

Status:
- Package manifest coverage guards that the package-lock root descriptor does
  not add `os`, `cpu`, or `libc` platform restriction metadata.
- The loop keeps the self-hosted npm install surface platform-neutral unless a
  future packaging decision intentionally narrows supported install targets.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
