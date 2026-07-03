# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Ingest Job Error Text Normalization

Status:
- Ingest job error serialization now trims stored `last_error` and
  `qdrant_last_error` text.
- Blank serialized or persisted ingest job errors now normalize to `null`.

Verification:
- Focused ingest job tests passed after RED coverage showed raw error text
  reaching SQL parameters and returned job rows.
- Related ingest job claim tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
