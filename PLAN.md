# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Canonical Chunk Delete Organization Normalization

Status:
- Canonical chunk deletion now trims direct organization identifiers before
  deleting chunks for a restored or replaced memory record.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused canonical indexing tests passed after the RED chunk delete
  organization trimming reproducer.
- Related ingest/unarchive/MCP tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
