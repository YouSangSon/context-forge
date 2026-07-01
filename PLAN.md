# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Compaction Count Row Guard

Status:
- `src/store/memory-archive-repository.ts` now maps
  `countRecentApplyRuns` count rows through shared numeric validation instead
  of `Number.parseInt`.
- `tests/store/memory-archive-repository.test.ts` covers numeric count strings,
  no-row fallback, and malformed count values.

Verification:
- Focused archive/convention tests passed.
- Typecheck, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
