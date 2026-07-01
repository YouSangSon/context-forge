# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — AST Catch Binding Guard

Status:
- The catch binding convention guard used regex matching, which can flag
  strings or comments instead of real TypeScript catch clauses.
- The loop switches the guard to TypeScript AST traversal so only actual
  `CatchClause` bindings are checked.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
