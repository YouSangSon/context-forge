# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Admin Shell Numeric Payload Guard

Status:
- The static `/admin/memory` shell used `Number(...)` for numeric form fields,
  allowing non-finite values to serialize as JSON `null`.
- The loop routes limit and importance inputs through a small finite-number
  helper before building API payloads.

Verification:
- Focused server coverage, typecheck, build, audit, full tests, and diff check
  passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
