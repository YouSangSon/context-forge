# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Contributing Daily Commands Alignment

Status:
- `CONTRIBUTING.md` and `CONTRIBUTING.ko.md` now list `npm run build` and
  `npm audit --audit-level=moderate` in the daily command tables.
- `tests/scripts/public-docs-drift.test.ts` now guards those contributing
  table entries alongside the shared verification command set.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this daily-command alignment.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
