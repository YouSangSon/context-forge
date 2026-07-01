# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Verification Script Guard

Status:
- Package manifest coverage guards the contributor-facing `typecheck` and
  `test` package scripts used throughout README, CONTRIBUTING, and CI docs.
- The loop keeps those verification commands anchored to `tsc --noEmit` and
  `vitest run` so docs cannot stay green while scripts drift underneath them.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
