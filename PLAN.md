# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Compaction Run Row Organization Validation

Status:
- Memory archive repository compaction run row mapping now validates returned
  organization IDs before exposing run metadata.
- Malformed run rows fail at the repository boundary instead of leaking invalid
  organization metadata into compaction results or replay lookups.

Verification:
- Focused memory archive repository tests passed after a RED run-row metadata
  reproducer.
- Related compaction and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
