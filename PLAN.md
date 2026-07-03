# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Adapter Provided Text Validation

Status:
- Qdrant and PGVector upserts now reject malformed provided point
  `payload.title` and `payload.summary` before backend writes.
- Missing keys and explicit `null` remain allowed for direct adapter
  compatibility.

Verification:
- Focused Qdrant/pgvector text metadata tests passed after RED coverage showed
  malformed provided title/summary reaching backend paths.
- Related vector tests and typecheck passed.
- Scoped reviewer agent passed the diff.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
