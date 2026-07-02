# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal Run Start Text Normalization

Status:
- Goal-run start now trims direct goal and termination criteria text before
  inserting.
- Existing nonblank validation still rejects whitespace-only goal text.

Verification:
- Focused goal-run repository tests passed after the RED start text trimming
  reproducer.
- Related goal-run handler/context and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
