# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Goal Run Row Enum Validation

Status:
- Goal-run row mapping now validates stored run scope/status and iteration
  outcome values before returning repository results.
- Malformed goal-run DB enum values fail at the repository boundary instead of
  leaking into MCP/HTTP goal-run responses.

Verification:
- Focused goal-run repository tests passed after a RED malformed-row
  reproducer.
- Related goal-run handlers, MCP server, and operator server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
