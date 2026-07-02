# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Memory Result Row Validation

Status:
- Memory repository governance archive result mapping now validates returned
  boolean status fields and qdrant point ID arrays.
- Malformed archive result rows fail at the repository boundary instead of
  falling back to empty cleanup IDs or leaking invalid status/point values.

Verification:
- Focused memory repository tests passed after a RED archive result row
  reproducer.
- Related HTTP memory route, MCP server, retrieval, and context-pack tests
  passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
