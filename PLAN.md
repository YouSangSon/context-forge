# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Apply Input Validation

Status:
- Memory archive repository apply now validates run/record ids, archive reason,
  optional kept record id, optional decay score, and plan timestamp before SQL.
- Malformed archive apply inputs fail before the destructive delete/archive CTE.

Verification:
- Focused memory archive repository tests passed after a RED direct-input
  reproducer.
- Related archive repository, compaction, outbox, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
