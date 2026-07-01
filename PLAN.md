# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Ranking Unit Score Validation

Status:
- `src/search/rank-results.ts` now validates normalized vector and lexical
  scores as unit-interval values before ranking.
- `tests/search/rank-results.test.ts` now covers negative and greater-than-one
  score options so bad internal scoring inputs fail before ranking.

Verification:
- Focused vector/search tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
