# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Eval Harness Exclusion

Status:
- `npm pack --dry-run` showed compiled eval-harness files under
  `dist/src/eval/`, but those modules are imported only by tests.
- The loop excludes the compiled eval harness from the npm package allowlist
  and updates package/changelog drift coverage.

Verification:
- Focused package manifest and public-docs drift coverage passed.
- `npm pack --dry-run --json` confirmed no `dist/src/eval/` paths in the
  tarball.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
