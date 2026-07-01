# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Bearer Token Colon Guidance

Status:
- `.env.example`, `docs/configuration.md`, and `docs/configuration.ko.md` now
  state that `MEMORY_API_TOKENS` token values must not contain `:` because it
  is reserved for optional `token:org` binding.
- `tests/scripts/public-docs-drift.test.ts` now guards the English/Korean
  configuration wording and env-template comment.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this token guidance update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
