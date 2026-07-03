# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Point Metadata Enum Validation

Status:
- `buildVectorPoint` now trims direct `kind` and `durability` metadata before
  building vector payloads.
- Direct builder calls now reject memory metadata enum values outside the
  existing Qdrant/pgvector adapter contract.

Verification:
- Focused point-builder metadata tests passed after RED coverage showed raw
  `kind`/`durability` payload values and invalid enum pass-through.
- Full point-builder tests and related Qdrant/pgvector vector tests passed.
- Spec and code-quality reviewer agents passed the scoped diff.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or delete
  remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
