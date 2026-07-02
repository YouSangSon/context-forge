# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Governance List Organization Normalization

Status:
- Governance memory listing now trims direct organization identifiers before
  building query parameters.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused memory repository tests passed after the RED governance list
  organization trimming reproducer.
- Related memory repository and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
