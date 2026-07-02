# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Canonical Chunk Insert Organization Normalization

Status:
- Canonical chunk insertion now trims direct record organization identifiers
  before writing `memory_chunks.organization_id`.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused canonical indexing tests passed after the RED chunk insert
  organization trimming reproducer.
- Related ingest/unarchive/MCP tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
