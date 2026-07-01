# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — DB Number Mapping Guard

Status:
- `toNumber` now rejects malformed database numeric values instead of silently
  returning `NaN` or accepting blank strings.
- `tests/store/db-utils.test.ts` covers finite numeric values and malformed DB
  number inputs; the ingest-job serialization fixture now uses DB row shape.

Verification:
- Focused repository mapping tests passed.
- Typecheck, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
