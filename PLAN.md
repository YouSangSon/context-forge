# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Point Payload Metadata Normalization

Status:
- `buildVectorPoint` now trims direct organization, scope, and project-key
  payload metadata before returning vector points.
- Existing blank scoping metadata validation remains unchanged.

Verification:
- Focused point-builder test passed after RED coverage showed raw payload
  metadata reaching vector points.
- Full point-builder test file and related vector adapter tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
