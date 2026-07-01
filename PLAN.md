# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Bare Catch Binding Convention

Status:
- Contributor guidance says `catch (err: unknown)` should always be used, but
  bare `catch {}` clauses were still allowed.
- The loop annotates remaining bare catch clauses as `_err: unknown` and makes
  the source convention suite reject catch clauses without bindings.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
