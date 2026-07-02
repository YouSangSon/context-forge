# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Operator Server Cleanup Task Wrapping

Status:
- Operator server shutdown now wraps probe-pool cleanup and background worker
  shutdown as promise tasks before passing them to `settleCleanup`.
- Synchronous probe-pool `end()` failures no longer prevent background worker
  shutdown; close events now receive a rejected cleanup promise instead of an
  uncaught synchronous throw.

Verification:
- Focused operator server startup tests passed after a RED cleanup reproducer.
- Related operator/server/MCP tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
