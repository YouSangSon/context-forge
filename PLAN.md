# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Rate Limit Decision Boundary Validation

Status:
- Rate limiter `check()` decisions now validate `allowed`, `remaining`, and
  `retryAfterMs` before HTTP/MCP handlers act on them.
- Malformed injected limiter decisions now fail at the boundary instead of
  writing invalid `Retry-After` headers.

Verification:
- Focused rate-limit and MCP HTTP boundary tests passed after RED malformed
  decision reproducers.
- Related MCP HTTP, server, and operator boundary tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
