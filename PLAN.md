# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Canonical Chunk Metadata Text Normalization

Status:
- Canonical chunk row mapping now trims stored metadata text before returning
  reindexable chunk rows.
- Raw chunk content remains unchanged so stored offsets stay meaningful.

Verification:
- Focused canonical indexing tests passed after RED coverage showed raw stored
  metadata reaching returned chunk rows.
- Full canonical indexing test file passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
