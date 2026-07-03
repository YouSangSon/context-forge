# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Graph Scope Normalization

Status:
- `inspectMemoryGraph` now validates direct scope types and scope IDs before
  querying.
- Direct graph scope IDs are trimmed before entity and relationship SQL params
  are built.

Verification:
- Focused memory repository tests passed after RED coverage showed malformed
  graph scopes reaching the query path and raw scope IDs reaching SQL.
- Full memory repository test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
