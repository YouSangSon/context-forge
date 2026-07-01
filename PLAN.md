# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Bearer Auth Dead Export Cleanup

Status:
- `src/app/middleware/bearer-auth.ts` no longer exports the unused
  `checkBearer` and `checkBearerFromRequest` boolean compatibility wrappers.
- `tests/app/bearer-auth.test.ts` now focuses on the active token-loading,
  `matchBearer`, and request-header matching paths.

Verification:
- Focused bearer-auth coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
