# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Background Worker Test Isolation

Status:
- Background-worker operator server tests now reset module cache and relevant
  mocks before each test, so per-test `vi.doMock` imports do not inherit stale
  server/background-worker modules from prior test execution.
- The change addresses transient full-suite failures observed around worker
  startup mocks and shutdown cleanup expectations.

Verification:
- Focused affected background-worker server tests passed.
- Related operator server/background-worker tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
