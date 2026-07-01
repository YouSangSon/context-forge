# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Lockfile Registry Source Guard

Status:
- Package manifest coverage guards that every non-root lockfile package
  descriptor resolves from the public npm registry and carries SHA-512
  integrity metadata.
- The loop catches dependency tree drift that would introduce git, file, link,
  local tarball, or non-registry HTTP package sources without an explicit
  dependency review.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
