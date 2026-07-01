# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Bug Report Template Hygiene

Status:
- `.github/ISSUE_TEMPLATE/bug_report.yml` now offers the supported
  `EMBEDDING_PROVIDER` values in default-first order: `transformers`, `openai`,
  `local`.
- The same template now uses the repository-rooted `../../SECURITY.md` link in
  both security guidance locations.
- `tests/scripts/public-docs-drift.test.ts` guards the provider option list and
  security links so bug reports stay aligned.

Loop closeout:
- Focused public docs drift coverage passed for the issue-template provider
  options and security links, and full typecheck, build, audit, test, and diff
  gates passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
