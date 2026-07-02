# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Unarchive Archive Enum Validation

Status:
- Unarchive restore now validates archive scope/kind/durability enum fields
  before calling canonical restore or building chunk/vector payloads.
- Malformed archive model enum values fail per archive outcome before restore
  side effects run.

Verification:
- Focused unarchive compaction tests passed after a RED malformed-archive
  reproducer.
- Related archive repository, compaction, outbox, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
