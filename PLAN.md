# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Backup Creation Script Guard

Status:
- Package manifest coverage guards documented backup creation scripts for the
  backend-aware default, forced Qdrant, and forced pgvector paths.
- The loop keeps README, operations, and self-hosted backup guidance aligned
  with the shell entrypoint and `VECTOR_BACKEND` overrides operators run.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
