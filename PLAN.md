# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Unarchive Compaction Organization Normalization

Status:
- Unarchive compaction now trims direct organization identifiers before
  archive lookup, canonical restore, chunk insertion, vector upsert, and
  compensation paths.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused unarchive compaction tests passed after the RED restored side-effect
  organization trimming reproducer.
- Related archive repository/outbox tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
