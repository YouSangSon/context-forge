# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Postgres Pool Tuning

Status:
- Postgres pool creation now supports validated max, idle timeout, and connect
  timeout options while preserving existing defaults.
- Service config, runtime server startup, canonical service bootstrap, and
  migration startup now pass the resolved pool tuning values.
- English/Korean configuration docs and `.env.example` document the new
  variables.

Verification:
- Focused Postgres pool/config/server coverage and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
