# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Source Metadata Fail-Fast Validation

Status:
- `addMemory` now rejects non-string `source.title` and `source.uri` values
  before opening a transaction.
- Source metadata still uses the same nullable text normalization as the
  source write path.

Verification:
- Focused memory repository tests passed after RED coverage showed invalid
  source metadata reaching the transaction path.
- Full memory repository test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
