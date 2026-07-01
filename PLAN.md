# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Workflow Token Permission Guard

Status:
- `.github/workflows/ci.yml` now sets top-level `GITHUB_TOKEN` permissions to
  `contents: read`, which is enough for checkout, installs, typecheck, build,
  and tests.
- `tests/scripts/ci-workflow-hygiene.test.ts` now guards that the workflow
  keeps read-only contents access and does not grant broad write permissions.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed for this token permission guard.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
