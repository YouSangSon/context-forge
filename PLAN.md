# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Korean Public Docs Mirror Links

Status:
- Korean public-doc body links now point to Korean mirrors when the mirror file
  exists, while explicit English language-switch links remain unchanged.
- `tests/scripts/public-docs-drift.test.ts` guards the corrected Korean mirror
  links.

Loop closeout:
- Focused public docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed for this Korean mirror-link update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
