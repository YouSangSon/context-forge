# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Korean Backup Docs Translation

Status:
- Korean backup guidance no longer inherits the English logical-vector-data
  phrasing for pgvector backups.
- `tests/scripts/public-docs-drift.test.ts` now validates English and Korean
  backup wording separately.

Verification:
- Focused public docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this Korean backup wording update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
