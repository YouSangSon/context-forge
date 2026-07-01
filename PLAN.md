# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Best-Effort Audit Failure Logging

Status:
- Tool registry audit writes remain best-effort, but async audit write failures
  now emit `warn` logs with the tool name and audit outcome.
- Focused audit-write coverage checks both successful tool calls and tool-error
  paths when audit persistence fails.

Verification:
- Focused audit-write coverage and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
