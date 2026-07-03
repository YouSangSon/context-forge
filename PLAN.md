# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Source Ref Metadata Text Normalization

Status:
- Stored Postgres source metadata parsing now trims valid JSON `sourceRef` and
  `uri` text before returning provenance fields.
- Blank parsed `sourceRef` values still fall back to the raw stored value
  instead of returning an empty provenance identifier.

Verification:
- Focused parser tests passed after RED coverage showed raw parsed provenance
  text reaching returned results.
- Parser and memory repository test files passed together.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
