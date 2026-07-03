# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Add Memory Scope Normalization

Status:
- `addMemory` now validates direct memory/source scope types and scope IDs
  before opening a transaction.
- Direct memory/source scope IDs are trimmed before source lookup, source
  insert, memory insert, and entity graph persistence.

Verification:
- Focused memory repository tests passed after RED coverage showed malformed
  scope values reaching the transaction path and raw scope IDs reaching SQL.
- Full memory repository test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
