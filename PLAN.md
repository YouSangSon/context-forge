# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal Run Row Scalar Validation

Status:
- Goal-run row mapping now validates returned run and iteration scalar
  metadata before exposing goal state.
- Malformed goal-run scalar rows fail at the repository boundary instead of
  leaking invalid continuation metadata to callers.

Verification:
- Focused goal-run repository tests passed after RED scalar-row reproducers.
- Related goal-run handler, context, repeat-check, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
