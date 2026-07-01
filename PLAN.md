# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Migration Phase Label Drift

Status:
- Public-facing docs already guard against internal phase labels, but migration
  SQL comments still mentioned `P17` and `P19.1`.
- The loop updates migration comments to current feature wording and adds drift
  coverage for the touched migration files.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
