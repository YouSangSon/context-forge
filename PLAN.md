# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Package Browser Metadata Guard

Status:
- Package manifest coverage guards that package `browser` stays absent in
  `package.json`.
- The loop catches metadata drift that would add client-side entrypoint
  hints/replacements to this Node-oriented MCP server package without an
  explicit packaging decision.

Verification:
- Focused package manifest coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
