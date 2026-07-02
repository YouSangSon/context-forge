# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal-Run Text Normalization

Status:
- Goal-run handlers now trim direct `goal`, `record_iteration.attempt`, and
  `check_repeat_attempt.attempt` text before service and embedding dispatch.

Verification:
- Focused goal-run handler tests passed after RED text-boundary reproducers.
- Related goal-run repository, context, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
