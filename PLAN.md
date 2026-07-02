# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Handler Organization Boundary Guard

Status:
- Remaining raw `toolInput.organizationId` handler pass-throughs were removed
  from search and unarchive boundaries.
- MCP handler tests now include a static guard against raw organization ID
  pass-through and raw defaulting patterns.

Verification:
- Focused tool-registry and MCP server tests passed after the RED static
  handler-boundary reproducer.
- Related unarchive and archive repository tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
