# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Qdrant Hit Record ID Validation

Status:
- Qdrant query mapping now rejects object payloads with malformed
  `memory_record_id` before returning `VectorHit[]`.
- Non-object Qdrant payloads still map to `{}` for existing compatibility.

Verification:
- Focused Qdrant hit `memory_record_id` tests passed after RED coverage showed
  malformed IDs leaking into `VectorHit.payload`.
- Qdrant vector tests, related vector tests, and typecheck passed.
- Scoped reviewer agent passed the diff.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
