# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Audit Row DB Helper Reuse

Status:
- `src/audit/audit-log-repository.ts` now maps audit row `id`,
  `duration_ms`, and `created_at` through shared DB row helpers instead of local
  coercion.
- `tests/audit/audit-truncation.test.ts` covers numeric string mapping and
  malformed audit row numeric values from `listByOrganization`.

Verification:
- Focused audit/helper tests passed.
- Typecheck, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
