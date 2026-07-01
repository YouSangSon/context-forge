# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Esbuild Lockfile Override Guard

Status:
- Package manifest coverage guards that the current `esbuild` npm override is
  reflected in lockfile package resolution.
- The loop catches package-lock drift where the root override remains present
  but the resolved build tooling package tree moves to another version.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
