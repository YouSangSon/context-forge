# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP Scope Identifier Normalization

Status:
- `requireProjectKey` and `requireUserScopeId` now return trimmed identifiers
  after nonblank validation.
- Direct MCP handler paths using these helpers now receive normalized scope
  identifiers.

Verification:
- Focused tool utility tests passed after the RED scope identifier trimming
  reproducer.
- Related MCP registry/server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
