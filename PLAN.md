# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP HTTP Cleanup Task Wrapping

Status:
- Per-request MCP HTTP cleanup now wraps transport and server close calls as
  promise tasks before `Promise.allSettled`.
- Synchronous transport cleanup failures no longer prevent the per-request MCP
  server from closing.

Verification:
- Focused MCP HTTP tests passed after a RED cleanup reproducer.
- Related MCP HTTP, operator server, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
