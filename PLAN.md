# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Korean README Comparison Table

Status:
- Korean README comparison table no longer carries non-code English status
  labels such as `OpenAI default`, `hosted`, `varies`, or `deprecated`.
- `tests/scripts/public-docs-drift.test.ts` now guards the localized Korean
  comparison table labels.

Verification:
- Focused public docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this Korean README comparison-table update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
