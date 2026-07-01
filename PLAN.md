# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Operator Script Guard

Status:
- Package manifest coverage guards documented operator package scripts that
  run built `dist/` entrypoints for server, worker, migrations, lifecycle, and
  backup/restore helpers.
- The loop keeps operational docs from staying green while package scripts
  drift away from built runtime artifacts.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
