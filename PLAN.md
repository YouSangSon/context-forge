# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Compaction Run Lookup Key Validation

Status:
- Memory archive repository run lookup now validates idempotency keys before
  querying compaction run rows.
- Malformed lookup keys fail before SQL instead of returning arbitrary rows
  from mocked or injected repository clients.

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
