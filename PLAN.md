# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Compaction Run Row Mapping

Status:
- `src/store/memory-archive-repository.ts` now maps compaction run ids as
  positive safe integers and run outcome counters as non-negative safe
  integers before returning create/find run rows.
- `tests/store/memory-archive-repository.test.ts` now covers malformed
  existing run id and counter rows through mock-pool idempotency lookup
  coverage.

Verification:
- Focused archive/db-utils/apply/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
