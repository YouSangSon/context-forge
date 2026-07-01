# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Compaction Sweeper Comment Refresh

Status:
- `.env.example` and `src/compact/sweeper-loop.ts` still had planning-era
  `P17`/`P19` wording around the current compaction cleanup sweeper.
- The loop refreshes those comments and extends public-docs drift coverage for
  the exact stale phrases.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
