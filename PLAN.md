# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Reindex Organization Normalization

Status:
- Canonical reindex now trims direct organization identifiers before chunk
  paging and vector cleanup calls.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused canonical indexing tests passed after the RED reindex
  organization trimming reproducer.
- Related indexing, ingest, context-pack, and vector tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
