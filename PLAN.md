# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Point Required Metadata Trimming

Status:
- `buildVectorPoint` now trims direct `updatedAt` and `embeddingVersion`
  metadata before building vector payloads.
- Existing non-empty validation remains unchanged; timestamp parsing is left to
  store row mapping.

Verification:
- Focused point-builder payload metadata test passed after RED coverage showed
  raw `updatedAt`/`embeddingVersion` whitespace reaching payloads.
- Full point-builder tests, related Qdrant/pgvector vector tests, and
  typecheck passed.
- Scoped reviewer agent passed the diff.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or delete
  remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
