# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Source Catch Binding Convention

Status:
- A few source files used untyped `catch (err)` bindings even though
  contributor guidance requires `catch (err: unknown)`.
- The loop annotates those source catch bindings and adds a source convention
  guard to prevent the drift from returning.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
