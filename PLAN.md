# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Scope Filter Normalization

Status:
- Qdrant and PGVector query filters now trim direct scope type and scope ID
  values before backend filters are built.
- Direct vector filter `scopeType` values outside `user` and `project` are
  rejected before backend queries.

Verification:
- Focused vector adapter tests passed after RED coverage showed raw scope
  fields and invalid scope types reaching backend query paths.
- Full Qdrant and PGVector adapter test files passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
