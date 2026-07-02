# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP Optional Text Normalization

Status:
- Shared MCP optional text normalization now trims nonblank values before
  handler dispatch.
- Blank optional text still normalizes to `null`.

Verification:
- Focused MCP server tests passed after the RED optional text trimming
  reproducer.
- Related MCP and goal-run handler tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
