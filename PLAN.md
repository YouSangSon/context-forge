# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Bug Report Deployment Options

Status:
- `.github/ISSUE_TEMPLATE/bug_report.yml` now mentions both supported vector
  backends in the custom deployment option: Qdrant or pgvector.
- `tests/scripts/public-docs-drift.test.ts` now shares a dropdown-option helper
  and guards both provider and deployment option drift.

Loop closeout:
- Focused public docs drift coverage passed for the pgvector-aware deployment
  option, and full typecheck, build, audit, test, and diff gates passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
