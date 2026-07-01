# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Explicit Any Type Guard

Status:
- Contributor guidance says strict TypeScript with no `any`, but the source
  convention suite only guarded catch bindings.
- The loop adds AST coverage for explicit `any` type keywords across tracked
  `src/`, `tests/`, and `scripts/` TypeScript files.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
