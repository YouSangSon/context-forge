# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Metrics Label String Boundary Validation

Status:
- Metrics registry now rejects blank direct HTTP route labels and dependency
  check names before rendering Prometheus output.
- Malformed direct metrics observations now fail before producing empty labels.

Verification:
- Focused metrics tests passed after RED blank-label reproducers.
- Related server, metrics wiring, and background queue metrics tests passed.
- Typecheck, build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push, merge, or
  delete remote branches from this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
