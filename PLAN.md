# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Entity Mention Id Row Mapping

Status:
- `src/store/memory-repository.ts` now maps returned `entities.id` rows as
  positive safe integers before inserting `memory_entity_mentions` or
  relationship rows.
- `tests/store/memory-repository.test.ts` now covers malformed entity id rows
  through the mock-pool `addMemory` transaction path.

Verification:
- Focused memory-repository/db-utils/MCP/search/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
