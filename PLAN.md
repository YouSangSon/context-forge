# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Vector Point Scope Metadata Validation

Status:
- `src/vector/point-builder.ts` now rejects blank `scopeType`, `scopeId`, and
  non-null `projectKey` values before building vector point payloads.
- Existing type checks remain intact: `projectKey` still accepts `null`, while
  non-string values fail with the previous string-or-null error.

Verification:
- Focused point-builder tests passed after RED reproducers.
- Related point-builder/vector/canonical-indexing/compaction tests passed.
- Typecheck passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
