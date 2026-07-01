# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Dependency Audit Guard

Status:
- `.github/workflows/ci.yml` now runs `npm audit --audit-level=moderate`
  after dependency installation in the `typecheck-and-test` CI job.
- `tests/scripts/ci-workflow-hygiene.test.ts` now guards that CI keeps the
  dependency audit step before typecheck.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed for this dependency audit guard.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
