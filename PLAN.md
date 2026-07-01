# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Local Secret Artifact Ignore Guard

Status:
- `.gitignore` now ignores local `.env` variants, `.envrc`, and generated
  `.akasha/` client/hook artifacts while keeping `.env.example` tracked.
- `tests/scripts/repo-secret-hygiene.test.ts` now guards those local secret and
  generated config artifact ignore patterns and tracked-file exclusions.

Verification:
- Focused repo hygiene coverage, `git check-ignore` checks for `.env`/
  `.env.local`/`.envrc`/`.akasha/` with `.env.example` unignored, typecheck,
  build, audit, full tests, and diff check passed for this local artifact
  ignore guard.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
