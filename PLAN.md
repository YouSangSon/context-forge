# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Context Pack Nonblank Source Labels

Status:
- Context pack rendering now picks the first nonblank label from
  `source.title`, `sourceRef`, and `externalId`.
- Source labels are trimmed before markdown rendering.

Verification:
- Focused source label test passed after RED coverage showed blank title text
  rendering as the source label instead of falling back.
- Context-pack tests, related MCP context-pack tests, and typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
