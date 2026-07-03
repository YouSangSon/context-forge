# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Audit Log Text Normalization

Status:
- Audit log repository writes now trim direct organization, actor, tool,
  project key, request ID, and error-message text before SQL persistence.
- Audit log listing now trims direct organization IDs before querying.

Verification:
- Focused audit repository tests passed after RED coverage showed raw text
  reaching SQL parameters.
- Related audit boundary tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
