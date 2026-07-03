# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Upsert Scope Type Validation

Status:
- Qdrant and PGVector upserts now reject direct point `payload.scope_type`
  values outside `user` and `project` before backend writes.
- Existing missing and blank scope-type validation remains unchanged.

Verification:
- Focused vector adapter tests passed after RED coverage showed invalid
  `scope_type` values reaching backend client paths.
- Related vector adapter and point-builder tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
