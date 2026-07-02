# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Retrieve Memory Query Normalization

Status:
- `retrieveMemory` now trims direct lexical queries before calling the
  repository and scoring lexical evidence.
- Whitespace-only direct queries now skip lexical repository search instead of
  issuing an empty search.

Verification:
- Focused retrieve-memory tests passed after RED blank/trimmed query
  reproducers.
- Related search ranking, lexical scoring, MCP, and retrieval eval tests
  passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
