# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Compaction Run Completion Input Validation

Status:
- Memory archive repository completion now validates run id, status, outcome
  counters, and optional error message before updating compaction run rows.
- Malformed completion inputs fail before SQL instead of being sent to
  Postgres.

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
