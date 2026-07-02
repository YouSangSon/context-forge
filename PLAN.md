# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Restore Input Validation

Status:
- Memory archive repository restore now maps archive objects through explicit
  id, org, enum, content, timestamp, and nullable string guards before insert.
- Malformed direct restore archive inputs fail before SQL instead of inserting
  invalid canonical rows or throwing incidental property-access errors.

Verification:
- Focused memory archive repository tests passed after a RED direct-input
  reproducer.
- Related unarchive, compaction, outbox, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
