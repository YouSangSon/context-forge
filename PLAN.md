# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Add Memory Handler Organization Normalization

Status:
- `add_memory` now trims direct organization identifiers before repository
  input construction for legacy and service-backed write paths.

Verification:
- Focused MCP server tests passed after the RED service-backed add reproducer.
- Related canonical indexing and audit tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
