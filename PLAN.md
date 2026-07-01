# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Test Catch Binding Convention

Status:
- Source catch bindings were guarded, but several test files still used
  untyped `catch (err)`/`catch (error)` bindings.
- The loop annotates those test catch bindings and widens source convention
  coverage across tracked `src/`, `tests/`, and `scripts/` TypeScript files.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
