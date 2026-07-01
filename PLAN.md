# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Focused Pgvector CI Guard

Status:
- The pgvector integration job already runs the focused pgvector suite with
  `PGVECTOR_TEST_URL`, but CI workflow hygiene coverage did not guard that
  command/env contract directly.
- The loop adds that guard beside the Postgres integration job coverage.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
