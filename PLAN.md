# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Streaming Text Chunk Tokens

Status:
- `chunkText` now iterates regex token matches into a bounded overlap window
  instead of materializing every match object upfront.
- Focused coverage guards target-boundary and crossed-boundary overlap behavior.

Verification:
- Focused chunk coverage and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
