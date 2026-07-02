# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP Mutation Handler Organization Normalization

Status:
- `update_memory`, `delete_memory`, and `tag_memory` now trim direct
  organization identifiers before canonical mutation repository and vector
  cleanup calls.

Verification:
- Focused MCP server tests passed after the RED mutation handler reproducers.
- Related memory repository, canonical indexing, and point-builder tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
