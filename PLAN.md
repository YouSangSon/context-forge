# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Source Provenance Write Normalization

Status:
- `addMemory` now rejects blank source provenance before opening a transaction.
- Source lookup and insert SQL now use trimmed `sourceRef`, `source.title`,
  and `uri` metadata.

Verification:
- Focused memory repository tests passed after RED coverage showed raw source
  provenance reaching SQL params and blank provenance opening a transaction.
- Full memory repository test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
