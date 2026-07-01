# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Admin Shell Error Status Fallback

Status:
- The static `/admin/memory` shell showed caught errors with `error.message`,
  which can fail when browser code catches a non-`Error` thrown value.
- The loop adds a tiny browser-side error message helper and guards the rendered
  shell against the unsafe direct `error.message` pattern.

Verification:
- Focused server coverage, typecheck, build, audit, full tests, and diff check
  passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
