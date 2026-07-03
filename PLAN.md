# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - RetrieveMemory Scope Identifier Trim

Status:
- `retrieveMemory` now trims direct `projectKey` and `userScopeId` once after
  validation.
- Vector filters and lexical repository scopes now receive normalized scope
  identifiers.

Verification:
- Focused scope identifier test passed after RED coverage showed raw whitespace
  reaching vector filters.
- Related search tests and typecheck passed.
- Scoped reviewer agent timed out; no reviewer PASS is recorded for this loop.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
