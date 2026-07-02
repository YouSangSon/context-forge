# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Qdrant Client URL Boundary Validation

Status:
- Qdrant client construction now rejects non-absolute and non-HTTP(S) direct
  URLs before instantiating the SDK client.
- Direct Qdrant URL and API key values are trimmed before SDK construction.

Verification:
- Focused Qdrant client tests passed after RED malformed URL and trimming
  reproducers.
- Related Qdrant vector/config/MCP construction tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
