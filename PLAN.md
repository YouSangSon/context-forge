# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Generated Metadata Ignore Guard

Status:
- `tests/scripts/repo-secret-hygiene.test.ts` now guards that `.gitignore`
  keeps the common desktop/editor metadata patterns it expects.

Verification:
- Focused repo hygiene coverage, generated-metadata workspace scan, typecheck,
  build, audit, full tests, and diff check passed for this generated metadata
  ignore-pattern guard.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
