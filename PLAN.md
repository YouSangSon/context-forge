# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Korean Setup And Embedding Labels

Status:
- Korean public setup, embedding, and backup snippets no longer carry mixed
  English labels such as `default 그대로 동작`, `CI stub`, or
  `backend-aware backup`.
- `tests/scripts/public-docs-drift.test.ts` now guards the localized Korean
  setup and embedding labels.

Verification:
- Focused public docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this Korean setup/embedding label update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
