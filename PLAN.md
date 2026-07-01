# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — README Command Alignment

Status:
- `README.md` and `README.ko.md` common command lists included typecheck and
  test but not the build and dependency audit commands now required by
  contributor, PR, and CI verification.
- The loop adds those commands to both README files and extends public-docs
  drift coverage.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
