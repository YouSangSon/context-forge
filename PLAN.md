# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Unreleased Node Runtime Changelog Drift

Status:
- `CHANGELOG.md` and `CHANGELOG.ko.md` Unreleased now describe the README
  landing badges as Node ≥22, matching the current runtime floor.
- `tests/scripts/public-docs-drift.test.ts` now checks only Unreleased
  changelog sections for stale Node ≥20 / `node-%3E%3D20` / `Node 20+22`
  wording while leaving historical release notes alone.

Loop closeout:
- Focused public docs drift test passed. Local commit is expected/done by the
  controller; do not push or merge from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
