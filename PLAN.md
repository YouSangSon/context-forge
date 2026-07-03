# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Upsert Project Identity Validation

Status:
- Qdrant and PGVector upserts now reject project-scope points when
  `payload.project_key` is `null` and `payload.scope_id` is missing or blank.
- Existing project points with a nonblank `project_key` can still use nullable
  `scope_id`.

Verification:
- Focused vector adapter tests passed after RED coverage showed project points
  without a usable `project_key` or `scope_id` reaching backend client paths.
- Related vector adapter and point-builder tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
