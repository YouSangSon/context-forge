# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Memory Row Enum Validation

Status:
- Memory hydrated row mapping now validates stored enum fields before returning
  repository results.
- Malformed `kind`, `durability`, `scope_type`, source scope, or source type
  values fail at the repository boundary instead of leaking into search/list
  results.

Verification:
- Focused memory repository tests passed after a RED malformed-row reproducer.
- Related retrieval, MCP server, operator server, and compaction tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
