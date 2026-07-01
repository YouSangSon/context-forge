# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — PR Verification Checklist Alignment

Status:
- `.github/PULL_REQUEST_TEMPLATE.md` now asks contributors to report
  typecheck, build, moderate-level npm audit, and test results for
  non-trivial changes.
- `tests/scripts/public-docs-drift.test.ts` now guards the PR test-plan
  command checklist.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this PR verification checklist alignment.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
