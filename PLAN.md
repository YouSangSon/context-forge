# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Compaction Run Create Input Validation

Status:
- Memory archive repository run creation now validates actor, dry-run flag,
  plan timestamp, and idempotency key before inserting compaction run rows.
- Malformed create-run inputs fail before SQL instead of being inserted or
  failing through incidental timestamp serialization.

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
