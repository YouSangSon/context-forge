# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Runtime Type-Erasure Assertion Guard

Status:
- Source convention coverage now scans runtime and script TypeScript files for
  unsafe `as any`, `as never`, `<any>`, and `<never>` assertions.
- Test fixtures can still use `as never` to exercise malformed-input runtime
  validation paths.

Verification:
- Focused source-convention coverage and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
