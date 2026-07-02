# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Archive Cleanup Row Metadata Validation

Status:
- Memory archive repository pending cleanup row mapping now validates returned
  organization IDs and qdrant point ID arrays.
- Malformed cleanup rows fail at the repository boundary instead of leaking
  invalid metadata into qdrant cleanup workers or monitoring reads.

Verification:
- Focused memory archive repository tests passed after a RED row-metadata
  reproducer.
- Related compaction, outbox sweeper, and MCP server tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
