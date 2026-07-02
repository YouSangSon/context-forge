# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Ingest Job Row Scalar Validation

Status:
- Ingest job row mapping now validates returned organization IDs and nullable
  ingest/qdrant error strings before exposing job state.
- Malformed job scalar rows fail at the repository boundary instead of leaking
  invalid retry metadata to background workers.

Verification:
- Focused ingest job repository tests passed after RED scalar-row reproducers.
- Related ingest claim, serialize-error, and canonical indexing tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
