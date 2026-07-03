# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Context Pack Source Label Fallback

Status:
- Context pack rendering now falls back from `source.title` to `sourceRef`,
  `externalId`, then `unknown source`.
- `sourceRef` is now validated as an optional string before rendering.

Verification:
- Focused source label fallback test passed after RED coverage showed
  `source: undefined` rendering.
- Context-pack tests, related MCP context-pack tests, and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
