# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Integration Skip Guidance

Status:
- CONTRIBUTING, troubleshooting docs, and the main CI test comment still
  described only three Postgres-gated test files.
- The current default `npm test` also includes pgvector adapter integration
  cases that skip unless `PGVECTOR_TEST_URL` is set, with CI coverage in a
  dedicated pgvector job.

Verification:
- Focused public-docs/CI workflow hygiene coverage, typecheck, build, audit,
  full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
