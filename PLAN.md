# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Hydrated Memory Tag Row Validation

Status:
- Memory repository hydrated row mapping now validates returned tag arrays
  before exposing search/list records.
- Malformed hydrated tag rows fail at the repository boundary instead of
  falling back to empty tags or leaking invalid tag values.

Verification:
- Focused memory repository tests passed after a RED hydrated tag row
  reproducer.
- Related retrieval, context-pack, compaction, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
