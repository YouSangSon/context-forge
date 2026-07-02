# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Lookup Row Scalar Validation

Status:
- Memory archive repository archive lookup row mapping now validates returned
  scalar metadata before exposing archive rows.
- Malformed archive lookup rows fail at the repository boundary instead of
  leaking invalid organization, scope, content, or nullable text metadata into
  restore flows.

Verification:
- Focused memory archive repository tests passed after a RED archive-row scalar
  reproducer.
- Related unarchive, compaction, outbox sweeper, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
