# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI Install Hygiene Guard

Status:
- CI install steps intentionally set `ONNXRUNTIME_NODE_INSTALL_CUDA=skip` before
  `npm ci` so GitHub-hosted runners do not attempt flaky GPU binary downloads.
- The loop adds a CI workflow hygiene guard that rejects raw `npm ci`,
  `npm install`, or `npm i` commands without that CPU-only environment setting.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
