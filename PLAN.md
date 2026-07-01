# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Shared DB Row Utilities

Status:
- `requireSingleRow`, `toNumber`, and `toIsoString` now live in
  `src/store/db-utils.ts` instead of being duplicated across repository files.
- Memory, canonical chunking, ingest-job, and goal-run repositories import the
  shared helpers with no behavior changes intended.

Verification:
- Focused repository coverage and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
