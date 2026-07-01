# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Audit Log Numeric Row Mapping

Status:
- `src/audit/audit-log-repository.ts` now maps audit log `id` as a positive
  safe integer and `duration_ms` as a non-negative safe integer before
  returning audit entries.
- `tests/audit/audit-truncation.test.ts` now covers malformed audit id and
  duration rows through mock-pool list coverage.

Verification:
- Focused audit/db-utils/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
