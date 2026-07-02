# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Background Worker Handle Validation

Status:
- Background worker startup now validates compaction and ingest sweeper handles
  immediately after each starter returns.
- Malformed starter results such as `{ stop: null }` now use the existing
  startup failure path instead of being recorded as started workers and failing
  later during cleanup.

Verification:
- Focused background worker tests passed after a RED reproducer.
- Related worker/operator server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
