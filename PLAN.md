# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Reindexable Memory Chunk Row Scalar Validation

Status:
- Canonical memory chunk row mapping now validates returned content,
  embedding version, organization/scope metadata, nullable text fields, and tag
  arrays before exposing stored or reindexable chunk results.
- Malformed chunk rows fail at the repository boundary instead of leaking
  invalid indexing metadata to vector rebuild paths.

Verification:
- Focused canonical indexing tests passed after RED chunk row reproducers.
- Related ingest/reindex/context-pack/vector tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
