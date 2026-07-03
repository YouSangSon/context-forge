# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Adapter Provided Tags Validation

Status:
- Qdrant and PGVector upserts now reject malformed provided point
  `payload.tags` before backend writes.
- Missing or `null` tags remain allowed for direct adapter compatibility.

Verification:
- Focused Qdrant/pgvector tags tests passed after RED coverage showed
  malformed provided tags reaching backend paths.
- Related vector tests and typecheck passed.
- Scoped reviewer agent passed the diff.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or delete
  remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
