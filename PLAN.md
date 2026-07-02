# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Audit Wrapper Organization Normalization

Status:
- MCP tool audit instrumentation now trims direct organization identifiers
  before writing success or error audit rows.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused audit tests passed after the RED audit organization trimming
  reproducer.
- Related MCP registry/server/audit tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
