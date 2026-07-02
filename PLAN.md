# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - PGVector Organization Normalization

Status:
- PGVector queries and deletes now trim direct organization identifiers before
  building SQL filters.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused PGVector tests passed after RED query/delete/delete-by-record-id
  organization trimming reproducer.
- Related Qdrant, vector helper, and point-builder tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
