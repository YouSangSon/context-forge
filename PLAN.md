# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Contributor Test Command Alignment

Status:
- README common commands and PR verification checklist use `npm test`, while
  the CONTRIBUTING daily command tables still listed `npm run test`.
- The loop aligns the contributor tables and extends public-docs drift coverage
  to pin the exact table rows.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
