# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Lockfile Runtime Flag Guard

Status:
- Package manifest coverage guards that direct runtime dependencies exist in
  lockfile package descriptors without `dev`, `optional`, or `devOptional`
  runtime classification flags.
- The loop catches dependency tree drift that would move a runtime dependency
  into a dev-only or optional install path without an explicit dependency
  review.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
