# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Finder Metadata Hygiene

Status:
- Removed an ignored `.github/.DS_Store` workspace artifact.
- `tests/scripts/repo-secret-hygiene.test.ts` now guards against tracked
  macOS Finder metadata files.

Verification:
- Focused repo hygiene coverage, typecheck, build, audit, full tests, and diff
  check passed for this Finder metadata hygiene update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
