# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Compaction Apply Comment Drift

Status:
- Stale pre-P17 compaction-apply comments in `src/app/server.ts` and
  `tests/compact/compact-memory.test.ts` now describe the current apply path.
- `tests/scripts/public-docs-drift.test.ts` now narrowly guards those touched
  files against the old future-tense P17 wording.

Loop closeout:
- Focused compaction/public-docs drift tests passed, and `git diff --check`
  passed. Local commit is expected/done by the controller; do not push or merge
  from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
