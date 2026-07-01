# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Ingest Sweeper Comment Alignment

Status:
- `src/jobs/ingest-job-repository.ts` had a stale future-tense note saying a
  sweeper PR would add claim semantics, even though `claimPendingForRetry` and
  the ingest sweeper are now implemented.
- The loop updates that comment to point production sweepers at
  `claimPendingForRetry` and adds focused drift coverage against the old
  phrase.

Verification:
- Focused public-docs drift / ingest claim / ingest sweeper coverage,
  typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
