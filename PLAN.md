# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Qdrant Payload Projection

Status:
- Qdrant vector queries now request only the `memory_record_id` payload field
  and explicitly keep vectors out of query responses.
- Focused adapter coverage guards the projected payload request options.

Verification:
- Focused Qdrant adapter coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
