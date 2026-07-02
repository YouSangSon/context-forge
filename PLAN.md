# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Background Worker Stop Cleanup

Status:
- Background worker shutdown now attempts every worker stop and still closes
  canonical services when one `stop()` method throws synchronously.
- Synchronous and asynchronous stop failures now flow through the same
  `Promise.allSettled` cleanup path.

Verification:
- Focused background worker tests passed after a RED cleanup reproducer.
- Related worker/operator server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
