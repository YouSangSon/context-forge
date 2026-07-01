# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — Code Quality Audit Triage Notes

Status:
- The tracked continuation docs now record which code-quality audit findings
  have current-branch evidence, without force-adding ignored audit snapshots.
- Evidence was checked for CQ-01, CQ-02, CQ-03, CQ-04, CQ-05, CQ-06, CQ-07,
  CQ-10, CQ-12, CQ-13, CQ-14, and CQ-15.

Verification:
- Focused evidence tests passed.
- Diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
