# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Recent Apply Count Organization Normalization

Status:
- Memory archive recent-apply counting now trims direct organization
  identifiers before rate-limit SQL queries.
- Existing nonblank validation still rejects whitespace-only organization IDs.

Verification:
- Focused archive repository tests passed after the RED recent-apply count
  organization trimming reproducer.
- Related apply-compaction/outbox tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
