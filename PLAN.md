# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Feature Request Vector Scope

Status:
- `.github/ISSUE_TEMPLATE/feature_request.yml` now describes vector-related
  scope as `Vector backend (Qdrant / pgvector)`.
- `tests/scripts/public-docs-drift.test.ts` now uses a shared issue-template
  dropdown helper and guards the feature-request scope option.

Loop closeout:
- Focused public docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this issue-template update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
