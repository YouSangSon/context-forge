# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Governance Filter Normalization

Status:
- `list_memory` tag filters and `inspect_memory_graph` query filters now trim
  direct text before canonical repository calls.

Verification:
- Focused MCP server tests passed after the RED governance filter reproducers.
- Related memory repository and canonical indexing tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
