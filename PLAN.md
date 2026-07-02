# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Memory Archive Restore Organization Normalization

Status:
- Memory archive restore and restored-record compensation delete now trim
  direct organization identifiers before ownership checks and SQL writes.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused archive repository tests passed after RED restore/delete organization
  trimming reproducers.
- Related unarchive/outbox tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
