# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Memory Archive Row Enum Validation

Status:
- Memory archive row mapping now validates stored compaction run status and
  archived record scope/kind/durability values before returning repository
  results.
- Malformed archive DB enum values fail at the repository boundary instead of
  leaking into compaction restore paths.

Verification:
- Focused memory archive repository tests passed after a RED malformed-row
  reproducer.
- Related compaction apply, unarchive, outbox sweeper, and compaction tests
  passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
