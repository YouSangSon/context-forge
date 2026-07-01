# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Lockfile Development Flag Guard

Status:
- Package manifest coverage guards that direct development dependencies exist
  in lockfile package descriptors without `optional` or `devOptional`
  classification flags.
- The exact direct dev-only lockfile package set remains explicit for the
  current development tooling while shared dev dependencies may stay
  non-dev-only.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
