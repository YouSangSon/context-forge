# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Node Matrix Guard

Status:
- The durable runtime decision is Node 22 minimum with CI coverage on Node 22
  and Node 24.
- The loop adds a CI workflow hygiene guard that keeps the main Node matrix on
  those supported runtime lines and confirms `setup-node` consumes the matrix
  value.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
