# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Multi-Replica Rate Limit Boundary

Status:
- Configuration, security, and deployment docs now state that
  `RATE_LIMIT_PER_MINUTE` is a process-local in-memory bucket.
- Public docs drift coverage guards the multi-replica boundary so future docs
  do not imply a strict deployment-wide quota from the app-local limiter alone.

Verification:
- Focused public-docs drift coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
