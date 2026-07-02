# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Operator Bearer Token Boundary Validation

Status:
- Direct operator server `bearerTokens` options now reject blank token strings
  and blank organization bindings before server construction/startup.
- Direct token normalization now trims injected token and organization values,
  matching the env-derived token path.

Verification:
- Focused operator-server boundary tests passed after RED direct-token
  reproducers.
- Related server, bearer-auth, and MCP HTTP tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
