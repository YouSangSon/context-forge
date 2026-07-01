# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Build Step Alignment

Status:
- Local contributor and PR guidance require `npm run build`, but the main CI
  Node matrix only ran audit, typecheck, and tests.
- The loop adds `npm run build` after typecheck and before tests, with workflow
  hygiene coverage for the step and ordering.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
