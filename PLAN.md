# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Admin Shell HTTP Error Fallback

Status:
- The static `/admin/memory` shell fell back to a generic `request failed`
  message when an HTTP error response was not JSON.
- The loop includes the HTTP status and status text in that fallback while
  preserving API-provided error messages.

Verification:
- Focused server coverage, typecheck, build, audit, full tests, and diff check
  passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
