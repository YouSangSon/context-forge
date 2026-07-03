# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Memory Repository Row Text Normalization

Status:
- Memory repository row mapping now trims stored hydrated memory, graph, and
  archive point-id text before returning results.
- Raw memory `content` remains unchanged so saved payload text is preserved.

Verification:
- Focused memory repository tests passed after RED coverage showed raw stored
  row text reaching returned results.
- Full memory repository test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
