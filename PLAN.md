# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Repository Result Shape Validation

Status:
- `src/search/retrieve-memory.ts` now rejects non-array hydration and lexical
  repository results before ranking.
- `tests/search/retrieve-memory.test.ts` now covers malformed hydrated and
  lexical repository result shapes.

Verification:
- Focused vector/search tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
