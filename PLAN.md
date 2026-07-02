# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Pgvector Row Record ID String Validation

Status:
- Pgvector query row mapping now accepts only decimal integer strings for
  returned `memory_record_id` values.
- Malformed numeric-looking strings such as `0x10` now fail closed instead of
  being coerced with `Number()`.

Verification:
- Focused pgvector tests passed after a RED reproducer.
- Related vector/search/canonical-indexing/compaction tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
