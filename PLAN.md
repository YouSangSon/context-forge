# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - MCP HTTP Bearer Token Boundary Validation

Status:
- Direct MCP HTTP handler `bearerTokens` options now validate each static token
  entry before authentication logic runs.
- Malformed direct token objects now fail with clear boundary errors instead of
  reaching token digest/authentication code.

Verification:
- Focused MCP HTTP boundary tests passed after RED direct-token reproducers.
- Related MCP HTTP, server, bearer-auth, and operator boundary tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
