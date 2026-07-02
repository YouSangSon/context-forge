# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP Search Handler Query Normalization

Status:
- `search_memory` handler now trims direct query values before resolving
  records.
- Handler responses report the same normalized query value used for retrieval.

Verification:
- Focused tool handler tests passed after the RED direct query trimming
  reproducer.
- Related MCP server and retrieve-memory tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
