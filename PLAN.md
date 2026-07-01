# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — NPM Package Metadata Keywords

Status:
- `package.json#keywords` now includes `pgvector`, matching the package
  description and documented Qdrant/pgvector vector-backend support.
- `tests/scripts/package-manifest.test.ts` guards the package metadata keywords
  alongside the description.

Loop closeout:
- Focused package manifest coverage, `npm pack --dry-run --json`, typecheck,
  build, audit, full tests, and diff check passed for this metadata update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
