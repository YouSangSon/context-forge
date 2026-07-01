# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Bearer Auth Active API Coverage

Status:
- `tests/app/bearer-auth.test.ts` now directly covers `authenticateBearer`
  static-token precedence, OAuth verifier fallback, and null auth results.
- This keeps the active bearer-auth API covered after removing unused wrapper
  exports.

Verification:
- Focused bearer-auth coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
