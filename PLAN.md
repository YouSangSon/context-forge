# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Memory Direct Id Validation

Status:
- Memory repository governance archive entrypoint now validates direct memory
  IDs before querying.
- Malformed archive IDs fail at the repository boundary instead of reaching the
  Postgres archive query.

Verification:
- Focused memory repository tests passed after a RED direct-id
  reproducer.
- Related HTTP memory route and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
