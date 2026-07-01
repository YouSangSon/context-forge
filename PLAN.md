# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Focused Postgres CI Job

Status:
- The `pg-integration` job is named for PG-dependent suites but currently runs
  the full `npm test` suite after the main Node matrix already ran it.
- The loop narrows that job to the three Postgres-backed suites and guards the
  command shape in CI workflow hygiene coverage.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
