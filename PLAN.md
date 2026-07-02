# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP Session Prompt Limit Validation

Status:
- `akasha_session_start` prompt limits now accept only positive safe integer
  numbers or decimal digit strings up to the shared maximum.
- Malformed numeric-looking strings such as `0x10` now fail schema validation
  instead of being coerced with `z.coerce.number()`.

Verification:
- Focused MCP server prompt tests passed after a RED reproducer.
- Related MCP HTTP/server tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed. One full-test run exposed
  transient background-worker test failures; the failed files passed in
  isolation and the full suite passed on rerun.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
