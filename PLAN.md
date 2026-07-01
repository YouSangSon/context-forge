# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — DB Number Runtime Type Guard

Status:
- `toNumber` now accepts `unknown` at the runtime boundary and rejects
  non-number/string values before JavaScript numeric coercion can turn them into
  `0` or `1`.
- `tests/store/db-utils.test.ts` covers `null`, booleans, arrays, objects,
  non-finite numbers, blank strings, and non-numeric strings.

Verification:
- Focused repository mapping tests passed.
- Typecheck, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
