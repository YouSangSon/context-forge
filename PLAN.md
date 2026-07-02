# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Canonical Chunk Row Enum Validation

Status:
- Canonical memory chunk row mapping now validates stored scope/kind/durability
  enum fields before returning reindexable chunks.
- Malformed chunk DB enum values fail at the repository boundary before
  reindex/ingest sweeper code builds vector payloads.

Verification:
- Focused canonical indexing tests passed after a RED malformed-row
  reproducer.
- Related ingest sweeper, retrieval, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
