# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — TypeScript Nocheck Comment Guard

Status:
- Contributor guidance expects strict TypeScript without `any`, and the source
  convention suite already guards catch bindings, explicit `any` types, and
  line-level TypeScript suppression comments.
- The loop extends coverage to keep tracked TypeScript files free of file-wide
  `@ts-nocheck` comments.

Verification:
- Focused source convention coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
