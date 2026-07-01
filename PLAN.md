# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Lockfile Bundled/Linked Package Guard

Status:
- Package manifest coverage guards that lockfile package descriptors do not
  declare bundled or linked package metadata.
- The loop catches dependency tree drift that would introduce bundled
  dependency extraction or local/symlink package resolution without an explicit
  dependency review.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
