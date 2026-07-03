# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Lexical Source Identifier Fallback

Status:
- Lexical scoring now uses the first nonblank source identifier from
  `sourceRef` and `externalId`.
- Blank `sourceRef` no longer hides a useful `externalId`.

Verification:
- Focused lexical source metadata test passed after RED coverage showed blank
  `sourceRef` preventing `externalId` matches.
- Related search tests and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
