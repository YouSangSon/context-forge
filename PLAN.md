# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - DB Timestamp Normalization

Status:
- Shared DB timestamp mapping now validates Date/string timestamp values before
  returning API-facing ISO strings.
- Parseable timestamp strings with explicit time zones are canonicalized to
  `Date#toISOString`; malformed timestamps fail at the repository boundary
  instead of flowing into ranking/serialization paths.

Verification:
- Focused DB utility tests passed after a RED timestamp reproducer.
- Related repository tests for memory, archive, chunks, ingest jobs, goal runs,
  and audit logs passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
