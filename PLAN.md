# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Memory Archive BIGINT Row Mapping

Status:
- `src/store/memory-archive-repository.ts` now maps `BIGSERIAL`/`BIGINT`
  archive, run, cleanup, and restore row values through shared DB helpers.
- `tests/store/memory-archive-repository.test.ts` now uses string BIGINT row
  fixtures for archive repository mappers while preserving numeric API output.

Verification:
- Focused archive/db-utils/convention tests passed.
- Typecheck, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
