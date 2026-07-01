# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Korean README Comparison Copy

Status:
- Korean README comparison/positioning copy no longer carries mixed English
  phrases such as `무료/로컬 default` or `distinctively`.
- `tests/scripts/public-docs-drift.test.ts` now guards the localized Korean
  comparison copy.

Verification:
- Focused public docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this Korean README comparison-copy update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
