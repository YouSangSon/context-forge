# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Concurrency Guard

Status:
- CI uses a workflow-level concurrency group to cancel stale runs for the same
  branch or pull request when a newer commit arrives.
- The loop adds a CI workflow hygiene guard that keeps the concurrency group
  expression and `cancel-in-progress: true` contract in place.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
