# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal Run Row Text Normalization

Status:
- Goal-run row mapping now trims stored run and iteration text before returning
  API results.
- Existing blank-row validation remains unchanged for nullable nonblank fields.

Verification:
- Focused goal-run repository tests passed after RED coverage showed raw
  stored text reaching returned run/iteration entries.
- Related goal-run handler and context tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
