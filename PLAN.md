# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Matrix Fail-Fast Guard

Status:
- CI's Node matrix keeps `fail-fast: false` so one runtime failure does not
  cancel the sibling Node runtime job before it reports.
- The loop adds a CI workflow hygiene guard that keeps the matrix fail-fast
  setting and supported Node matrix together.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
