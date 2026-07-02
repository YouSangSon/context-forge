# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Lifecycle Init User Scope Normalization

Status:
- Lifecycle init now trims direct user scope identifiers before rendering
  generated hook output.
- Existing nonblank validation still rejects whitespace-only user scope IDs.

Verification:
- Focused CLI tests passed after the RED lifecycle generated-output
  user scope trimming reproducer.
- Related package manifest tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
