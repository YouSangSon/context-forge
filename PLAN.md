# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Graph Relationship Row Mapping

Status:
- `src/store/memory-repository.ts` now maps graph relationship `id`,
  `from_entity_id`, `to_entity_id`, and `evidence_memory_record_id` as
  positive safe integers before returning graph relationships.
- `tests/store/memory-repository.test.ts` now covers malformed graph
  relationship id/reference rows after a valid entity lookup.

Verification:
- Focused memory-repository/db-utils/MCP/search/convention tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
