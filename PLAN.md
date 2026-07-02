# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Search Handler Organization Normalization

Status:
- `search_memory` record resolution now trims direct organization identifiers
  before retrieve overrides, legacy collection, and canonical retrieval.

Verification:
- Focused tool-registry and MCP server tests passed after the RED retrieval
  override reproducer.
- Related search retrieval and memory repository tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
