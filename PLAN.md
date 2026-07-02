# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - OAuth Protected Resource String Boundary Validation

Status:
- OAuth protected-resource challenge helpers now reject blank direct metadata
  URL, resource, authorization server, and scope strings.
- Malformed direct challenge config now fails before constructing
  `WWW-Authenticate` headers.

Verification:
- Focused OAuth protected-resource tests passed after RED blank-string
  reproducers.
- Related OAuth token, server, MCP HTTP, and operator boundary tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
