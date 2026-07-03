# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Ingest Sweeper Chunk Enum Validation

Status:
- The ingest sweeper now rejects malformed chunk `scopeType`, `kind`, and
  `durability` enum values before embedding or vector side effects.
- Existing malformed chunk retry behavior remains unchanged.

Verification:
- Focused ingest-sweeper tests passed after RED coverage showed malformed chunk
  enums being treated as successful sweeps.
- Full ingest-sweeper and point-builder tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
