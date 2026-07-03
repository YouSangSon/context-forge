# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Point Tag Metadata Normalization

Status:
- `buildVectorPoint` now trims direct tag metadata before building vector
  payloads.
- Direct builder calls now reject blank tag entries before backend writes.
- Existing tag type validation and vector metadata validation remain
  unchanged.

Verification:
- Focused point-builder tags tests passed after RED coverage showed raw tag
  whitespace and blank tag pass-through.
- Full point-builder tests, related Qdrant/pgvector vector tests, and
  typecheck passed.
- Scoped reviewer agent passed the diff.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or delete
  remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
