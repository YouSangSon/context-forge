# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP Governance Handler Organization Normalization

Status:
- `reindex_memory` now trims its required organization identifier before
  canonical reindexing and rejects whitespace-only values before resolving
  canonical services.
- `list_memory` now trims direct organization identifiers before governance
  repository listing calls.

Verification:
- Focused MCP server tests passed after the RED governance listing
  reproducer.
- Related canonical indexing and audit tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
