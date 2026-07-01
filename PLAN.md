# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Docker Build Context Hygiene

Status:
- The Docker builder stage copies the repository with `COPY . .`, so
  `.dockerignore` should exclude local agent artifacts and internal docs that
  are not needed for image builds.
- The loop adds those ignore patterns and guards the important exclusions in
  Docker hardening coverage.

Verification:
- Focused Docker hardening coverage, typecheck, build, audit, full tests, and
  diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
