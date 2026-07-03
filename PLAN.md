# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Canonical Chunk Scope Normalization

Status:
- `listChunks` now trims direct scope IDs before building canonical chunk SQL
  params.
- Existing scope type and blank scope ID validation remains unchanged.

Verification:
- Focused canonical-indexing tests passed after RED coverage showed raw scope
  IDs reaching SQL params.
- Full canonical-indexing test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
