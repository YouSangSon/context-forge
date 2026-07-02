# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Context Pack Task Normalization

Status:
- `build_context_pack` now trims direct task text before retrieval, markdown
  rendering, and context-pack run persistence.

Verification:
- Focused MCP server tests passed after the RED context-pack task reproducer.
- Related context-pack and tool-registry tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
