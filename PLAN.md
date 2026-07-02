# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Pgvector Query Organization Id Validation

Status:
- `src/vector/pgvector-index.ts` now validates pgvector query
  `organization_id` values before returning vector-hit payloads.
- `tests/vector/pgvector-index.integration.test.ts` now covers null and
  whitespace-only `organization_id` rows with a mocked pool.

Verification:
- Focused pgvector tests passed after a RED reproducer.
- Related vector/search tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
