# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - OAuth Verifier Result Boundary Validation

Status:
- OAuth verifier fallback results now validate token, optional organization
  binding, and optional scopes before becoming an authenticated bearer.
- Malformed injected verifier results now fail at the auth boundary instead of
  leaking blank org bindings or malformed scopes into HTTP/MCP authorization.

Verification:
- Focused bearer-auth tests passed after RED verifier-result reproducers.
- Related OAuth, MCP HTTP, server, and operator boundary tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
