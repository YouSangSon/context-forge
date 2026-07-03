# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Point Scope Type Enum Validation

Status:
- `buildVectorPoint` now rejects direct `scopeType` values outside `user` and
  `project` before building vector payloads.
- Existing scope payload trimming and metadata enum validation remain
  unchanged.

Verification:
- Focused point-builder `scopeType` test passed after RED coverage showed
  invalid direct scope types passing the builder.
- Full point-builder tests, related Qdrant/pgvector vector tests, and
  typecheck passed.
- Scoped reviewer agent passed the diff.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or delete
  remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
