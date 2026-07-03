# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Upsert User Scope ID Validation

Status:
- Qdrant and PGVector upserts now reject user-scope points with missing or
  blank `payload.scope_id` before backend writes.
- Existing project-scope nullable `scope_id` behavior remains unchanged because
  project points can be filtered by `project_key`.

Verification:
- Focused vector adapter tests passed after RED coverage showed user points
  without usable `scope_id` values reaching backend client paths.
- Related vector adapter and point-builder tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
