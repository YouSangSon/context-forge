# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP Graph Handler Organization Normalization

Status:
- `inspect_memory_graph` now trims direct organization identifiers before
  canonical graph inspection repository calls.

Verification:
- Focused MCP server tests passed after the RED graph inspection reproducer.
- Related memory repository and canonical indexing tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
