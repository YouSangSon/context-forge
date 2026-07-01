# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Job Timeout Hygiene

Status:
- `.github/workflows/ci.yml` relied on GitHub Actions' default 360-minute job
  timeout for all CI jobs.
- The loop adds explicit 30-minute job timeouts and guards them in
  `tests/scripts/ci-workflow-hygiene.test.ts`.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
