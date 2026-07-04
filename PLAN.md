# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Clean-Main Backlog Discovery

Status:
- PR #23 was squash-merged into `main` as `db93314`
  (`Hardening production boundaries and package surface`).
- The previous branch's implementation work is closed; planning docs are reset
  to reflect the current `main` state.
- `BACKLOG.md` has no known P0/P1/P2 implementation items after the merge.
- Next work should discover one narrow backlog item from current repo evidence,
  then implement it in a fresh loop.

Verification:
- Confirm local `main` tracks `origin/main` at `db93314` before branching.
- `git diff --check` passed for the docs-only cleanup.
- `npm test -- tests/scripts/public-docs-drift.test.ts --reporter=dot` passed
  (`45` tests).
- No root planning-doc-specific automated test is currently available.

## Next Loop Candidates

- Audit current `main` for one clear improvement target, preferring stability,
  tests, scalability, developer experience, documentation, then features.
