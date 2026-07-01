# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Archive Source Label Cleanup

Status:
- `src/store/memory-archive-repository.ts` still used internal phase labels in
  compaction/unarchive comments and in the direct `restoreToCanonical`
  missing-`source_id` error text.
- The loop updates those source-facing labels to current feature/error wording
  and adds focused drift coverage. The documented unarchive outcome reason is
  intentionally unchanged for client compatibility.

Verification:
- Focused memory archive / unarchive / drift coverage, typecheck, build,
  audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
