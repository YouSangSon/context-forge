# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Audit Log Row Scalar Validation

Status:
- Audit log row mapping now validates returned organization, actor, tool,
  nullable project/request IDs, and error message types before exposing audit
  entries.
- Malformed audit scalar rows fail at the repository boundary instead of
  leaking invalid audit metadata to callers.

Verification:
- Focused audit repository tests passed after RED scalar-row reproducers.
- Related audit write, HTTP route, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
