# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Ranking Candidate Score Validation

Status:
- `src/search/rank-results.ts` now validates candidate score components before
  sorting candidates.
- `tests/search/rank-results.test.ts` now covers malformed required and
  optional candidate score components.

Verification:
- Focused vector/search tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
