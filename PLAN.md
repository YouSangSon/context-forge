# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Eval Harness Runtime Import Guard

Status:
- The package allowlist now excludes `dist/src/eval/`, which is correct only
  while the eval harness stays test-only.
- The loop adds package manifest coverage that scans runtime source files and
  fails if they import the excluded eval harness.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
