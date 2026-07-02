# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Shared DB Number String Validation

Status:
- Shared DB row number mapping now accepts only decimal/exponent numeric
  strings before numeric conversion.
- Malformed numeric-looking strings such as `0x10` now fail closed in
  repository row mappers instead of being coerced with `Number()`.

Verification:
- Focused shared DB utility tests passed after a RED reproducer.
- Related repository/row-mapping tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
