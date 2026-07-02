# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Scope Lock Input Validation

Status:
- Memory archive repository advisory lock acquisition now validates the input
  object before reading lock fields.
- Malformed direct lock inputs fail before SQL instead of throwing incidental
  property-access errors.

Verification:
- Focused memory archive repository tests passed after a RED direct-input
  reproducer.
- Related compaction and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
