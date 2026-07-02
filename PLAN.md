# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal Run Close Note Normalization

Status:
- Goal-run close operations now trim direct completion/abandonment notes before
  updating.
- Existing nonblank validation still rejects whitespace-only notes.

Verification:
- Focused goal-run repository tests passed after the RED close note trimming
  reproducer.
- Related goal-run handler/context and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
