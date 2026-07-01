# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Rank Results Timestamp Reuse

Status:
- `rankResults` now parses each canonical `updatedAt` timestamp once and
  reuses it for newest-record detection, recency scoring, and tie-break sorting.
- `rankCandidates` still validates external candidate timestamps before
  sorting, but shares the same timestamped sorting helper.

Verification:
- Focused rank-results coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
