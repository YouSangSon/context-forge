# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Tsconfig-Driven Convention Coverage

Status:
- Contributor guidance expects strict TypeScript without `any`, and the source
  convention suite guards catch bindings, explicit `any` types, suppression
  comments, and strict compiler options.
- The loop makes the convention suite derive its checked TypeScript files from
  `tsconfig.json` instead of keeping a second hand-maintained path list.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
