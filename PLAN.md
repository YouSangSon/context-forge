# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal-Run Handler Organization Normalization

Status:
- Goal-run service dispatch handlers now trim direct organization identifiers
  before start, iteration, get, list, complete, and abandon calls.

Verification:
- Focused goal-run handler tests passed after the RED dispatch reproducers.
- Related goal-run repository and context tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
