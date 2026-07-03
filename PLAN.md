# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Ingest Sweeper Job Organization Normalization

Status:
- The ingest sweeper now trims claimed job organization IDs before vector
  delete filters are built.
- Existing claimed-job blank organization validation remains unchanged.

Verification:
- Focused ingest-sweeper test passed after RED coverage showed raw job
  organization IDs reaching vector delete filters.
- Full ingest-sweeper tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
