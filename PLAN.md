# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Setup-Node Cache Guard

Status:
- CI uses `actions/setup-node` with npm caching in every Node setup step to
  keep dependency installs consistent and faster.
- The loop adds a CI workflow hygiene guard that keeps `cache: npm` present on
  all three `setup-node` steps.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
