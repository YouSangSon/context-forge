# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal Run Iteration Text Normalization

Status:
- Goal-run iteration recording now trims direct attempt, summary, and error
  text before inserting.
- Existing nonblank validation still rejects whitespace-only attempt/summary
  text.

Verification:
- Focused goal-run repository tests passed after the RED iteration text
  trimming reproducer.
- Related goal-run handler/context and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
