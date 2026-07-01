# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — MCP Dead Type Cleanup

Status:
- `src/mcp/types.ts` no longer exports unused
  `CompactMemoryToolInput_v2Extension` or `_AuditLogEntryRef`.
- Removing `_AuditLogEntryRef` also removes the now-unused
  `StoredAuditLogEntry` import from the MCP type surface.

Verification:
- Typecheck and focused MCP smoke coverage passed.
- Build, audit, full tests, and diff check passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
