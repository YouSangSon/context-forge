# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Root TypeScript Config Coverage

Status:
- Contributor guidance expects strict TypeScript without `any`, and the source
  convention suite guards catch bindings, explicit `any` types, suppression
  comments, and strict compiler options.
- The loop extends the tracked TypeScript file set to include
  `vitest.config.ts`, which is already compiled by `tsconfig.json`.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
