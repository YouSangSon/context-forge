# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Apply Qdrant Point Row Validation

Status:
- Memory archive repository apply result mapping now validates returned qdrant
  point ID arrays before exposing cleanup payloads.
- Malformed archive apply rows fail at the repository boundary instead of
  falling back to empty cleanup IDs or leaking invalid point IDs.

Verification:
- Focused memory archive repository tests passed after a RED qdrant point row
  reproducer.
- Related apply, outbox sweeper, compaction, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
