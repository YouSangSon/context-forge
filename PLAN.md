# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Audit Log Row Text Normalization

Status:
- Audit log row mapping now trims stored organization, actor, tool, project
  key, request ID, and error-message text before returning API results.
- Blank stored audit error messages now normalize to `null` on read.

Verification:
- Focused audit row mapping tests passed after RED coverage showed raw stored
  text reaching returned entries.
- Related audit boundary tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
