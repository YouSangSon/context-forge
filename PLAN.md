# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Project Key Filter Normalization

Status:
- Qdrant and PGVector query filters now trim direct `projectKey` values before
  backend filters are built.
- Existing project-key type and blank validation remains unchanged.

Verification:
- Focused vector adapter tests passed after RED coverage showed raw project
  keys reaching backend query paths.
- Full Qdrant and PGVector adapter test files passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
