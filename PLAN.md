# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Architecture Phase Label Cleanup

Status:
- `docs/architecture.md` and `docs/architecture.ko.md` exposed internal phase
  labels such as `(P17)`, `(P19.1)`, and `pre-P19.1` in public data-flow docs.
- The loop replaces those labels with current feature-oriented wording and adds
  focused drift coverage so the public architecture docs stay phase-label free.

Verification:
- Focused public-docs drift coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
