# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Admin Shell Action Error Fallback

Status:
- The static `/admin/memory` shell now stringifies caught load errors safely,
  but save/tag/archive action handlers still let rejected promises escape.
- The loop catches those action handler failures and routes them through the
  same status error fallback.

Verification:
- Focused server coverage, typecheck, build, audit, full tests, and diff check
  passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
