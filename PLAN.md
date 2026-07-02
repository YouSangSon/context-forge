# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Graph Inspect Organization Normalization

Status:
- Memory graph inspection now trims direct organization identifiers before
  entity and relationship queries.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused memory repository tests passed after the RED graph inspection
  organization trimming reproducer.
- Related memory repository and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
