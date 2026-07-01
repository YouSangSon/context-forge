# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Compaction Plan Comment Refresh

Status:
- `src/compact/compact-memory.ts` now describes its current shared dry-run and
  destructive-apply planning role instead of a future P17 extension point.
- `tests/scripts/public-docs-drift.test.ts` now guards that the stale P17
  planning comment does not return.

Verification:
- Focused compaction/public-docs drift coverage, typecheck, build, audit, full
  tests, and diff check passed for this comment refresh.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
