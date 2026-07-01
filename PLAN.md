# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Outbox Sweeper Batched Deletes

Status:
- `runOutboxSweep` now groups claimed cleanup rows by `organizationId` and
  calls `vectorIndex.delete` once per org with the combined point IDs.
- Archive rows still get row-level status updates, so retry and failed counts
  remain tied to individual cleanup rows.

Verification:
- Focused outbox-sweeper coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
