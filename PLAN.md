# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Postgres-Backed Test Wording

Status:
- The CI step and Postgres-gated test comments still used `PG-dependent`
  wording while public docs now describe the same coverage as
  Postgres-backed repository/migration suites.
- The loop aligns the CI/test wording and updates the CI hygiene guard.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
