# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Store Nullable Text Normalization

Status:
- Store nullable text normalization now trims nonblank title/summary values
  before persistence.
- Blank nullable text still normalizes to `null`.

Verification:
- Focused memory repository tests passed after the RED nullable text trimming
  reproducer.
- Related canonical indexing and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
