# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Compaction Run Scope Type Validation

Status:
- `createCompactionRun` now rejects direct `scopeType` values outside
  `user` and `project` before querying.
- Existing compaction-run scope trimming remains unchanged.

Verification:
- Focused memory archive repository tests passed after RED coverage showed
  malformed compaction-run scope types reaching the insert path.
- Full memory archive repository test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
