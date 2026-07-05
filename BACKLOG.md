# BACKLOG

Prioritize in this order unless a core product capability materially changes
the value of Akasha: stability/bugs, testability, scalability, developer
experience, documentation, features.

## P0

- None currently known.

## P1

- None currently known.

## P2

- None currently known.

## Recently Merged

- PR #23 was squash-merged into `main` as `db93314`
  (`Hardening production boundaries and package surface`), covering the
  post-v1 hardening branch. Detailed implementation history remains in
  `WORKLOG.md`, git history, and the GitHub PR.

## Recently Updated

- `PLAN.md` now records the current architecture state, target structure,
  transition plan, contract gate, risks, rollback, and continuation handoff for
  the clean-architecture/DDD goal.
- JSON body parsing is now shared by JSON HTTP routes and MCP Streamable HTTP;
  both transports keep their previous oversized-body status behavior.
- JSON HTTP organization resolution is now isolated behind an internal
  middleware boundary while `src/app/routes/memory.ts` preserves the existing
  route factory and `resolveOrganizationId` re-export.
- `CONTRACTS.md` now records the public contract baseline for future
  clean-architecture/DDD refactors, and public-docs drift tests guard it against
  route/source drift.
- README comparison now positions code-intelligence MCP servers such as
  `codebase-memory-mcp` as complementary repository-graph tools, not
  replacements for Akasha's durable agent-memory scope.

## Discovery Queue

- Refresh the backlog from current `main` by checking repo docs, recent git
  history, CI/test state, dependency/security posture, and comparable OSS
  memory MCP projects. Promote exactly one concrete item into P0/P1/P2 before
  implementing the next loop.
