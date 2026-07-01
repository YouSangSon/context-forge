# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Secret Scrubber Public Docs Coverage

Status:
- `README.md`, `docs/architecture.md`, and `docs/api-reference.md` now describe
  the implemented secret scrubber scope: provider API keys, PEM blocks,
  bearer/JWT tokens, and credentialed database URLs.
- Korean mirrors carry the same scope, and public-docs drift coverage now
  checks the implemented `src/store/secret-scrub.ts` categories against those
  summaries.

Verification:
- Focused public-docs drift coverage passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
