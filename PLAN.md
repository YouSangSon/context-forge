# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Contributor Verification Guidance Alignment

Status:
- `CONTRIBUTING.md` and `CONTRIBUTING.ko.md` now tell contributors to run
  typecheck, build, moderate-level npm audit, and tests before pushing.
- `tests/scripts/public-docs-drift.test.ts` now guards the shared verification
  command set across the PR template and both contributing docs.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this contributor guidance alignment.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
