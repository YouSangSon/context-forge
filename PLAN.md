# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Semantic Compaction Comment Refresh

Status:
- `src/compact/compact-memory.ts` and `src/mcp/types.ts` still had
  planning-era `P18`/`P18.1` wording around implemented semantic dedup.
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
