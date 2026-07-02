# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Audit Row Outcome Validation

Status:
- Audit log row mapping now validates stored `outcome` values before returning
  list results.
- Malformed DB row outcomes fail at the repository boundary instead of leaking
  into MCP audit-log responses.

Verification:
- Focused audit repository tests passed after a RED malformed-row reproducer.
- Related audit, MCP server, and operator server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
