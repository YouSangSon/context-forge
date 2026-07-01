# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Lockfile Precedence Guard

Status:
- Package manifest coverage guards that tracked `npm-shrinkwrap.json` stays
  absent so `package-lock.json` remains the active npm lockfile.
- The loop catches lockfile precedence drift that would make npm ignore the
  repository's existing package-lock contract.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
