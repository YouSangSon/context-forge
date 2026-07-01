# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Development Script Guard

Status:
- Package manifest coverage guards documented development watch package
  scripts for HTTP, worker, MCP, CLI, and Vitest watch mode.
- The loop keeps README and CONTRIBUTING command tables aligned with source
  entrypoints that developers actually run locally.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
