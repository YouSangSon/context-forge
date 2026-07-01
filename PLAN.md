# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Compaction Apply Comment Cleanup

Status:
- `src/compact/apply-compaction.ts` and `src/mcp/types.ts` still used internal
  phase labels in current compaction/unarchive comments.
- The loop updates those comments to current feature wording and adds focused
  drift coverage while leaving historical changelog and migration comments
  untouched.

Verification:
- Focused compaction apply / drift coverage, typecheck, build, audit, full
  tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
