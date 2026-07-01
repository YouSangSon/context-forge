# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — CI CPU-Only Install Guard

Status:
- CI already skips the `onnxruntime-node` CUDA/GPU binary download in all
  install steps to avoid flaky GitHub release downloads on CPU-only runners.
- The loop adds workflow hygiene coverage so future CI edits keep all install
  steps on `ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm ci`.

Verification:
- Focused CI workflow hygiene coverage, typecheck, build, audit, full tests,
  and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
