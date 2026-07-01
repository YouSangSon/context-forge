# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Source Ref Parse Reuse

Status:
- `updateMemoryRecord` now parses the current `source_ref` once before
  rebuilding entity graph provenance and reuses the parsed source metadata for
  both `sourceRef` and `uri`.
- This avoids duplicate JSON parsing and duplicate malformed-source warnings
  without changing the update contract.

Verification:
- Focused repository/source-ref coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
