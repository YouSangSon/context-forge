# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Graph Memory Row Scalar Validation

Status:
- Memory repository graph entity and relationship row mapping now validates
  returned scalar metadata and entity kind values before exposing graph
  inspection results.
- Malformed graph rows fail at the repository boundary instead of leaking
  invalid entity or relationship values to callers.

Verification:
- Focused memory repository tests passed after RED graph row reproducers.
- Related MCP and HTTP graph inspection tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
