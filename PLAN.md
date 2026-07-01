# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Generated Metadata Hygiene

Status:
- Removed ignored desktop metadata artifacts from the workspace.
- `.gitignore` and `tests/scripts/repo-secret-hygiene.test.ts` now cover common
  desktop/editor metadata files, not only `.DS_Store`.

Verification:
- Focused repo hygiene coverage, generated-metadata workspace scan, typecheck,
  build, audit, full tests, and diff check passed for this generated metadata
  hygiene update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
