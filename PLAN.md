# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Database Service Health Guard

Status:
- CI Postgres and pgvector integration jobs use Docker health checks so tests
  wait for database service containers before connecting.
- The loop adds a CI workflow hygiene guard that keeps the `pg_isready` health
  command, interval, timeout, and retry settings in place.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
