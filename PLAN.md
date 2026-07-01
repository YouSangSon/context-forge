# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Admin Shell Changelog Coverage

Status:
- Recent `/admin/memory` shell fixes are user-visible, but Unreleased
  changelog notes did not mention the safer status/error handling.
- The loop records the admin shell reliability fixes in English/Korean
  changelogs and guards the note with public-docs drift coverage.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
