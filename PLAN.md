# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - Contract Baseline Before Architecture Refactor

Status:
- Started the clean architecture / DDD transition by freezing public contract
  inventory before any internal refactor.
- `CONTRACTS.md` records transport, tool, route, response-envelope, operator
  endpoint, CLI/package, and DB-facing contract sources.
- Target structure remains staged: preserve contracts first, then split
  internals behind existing descriptors, handlers, repositories, and CLI
  entrypoints.

Verification:
- `npm test -- tests/scripts/public-docs-drift.test.ts -t "contract baseline" --reporter=dot`
  (`1` test passed, `46` skipped)
- `npm test -- tests/scripts/public-docs-drift.test.ts --reporter=dot`
  (`47` tests)
- `npm run typecheck`
- `git diff --check`

Architecture transition plan:
- Current structure: transports (`src/mcp`, `src/app`) route into shared tool
  descriptors/registry, domain orchestrators, repositories, vector adapters, and
  migrations.
- Target structure: keep public entrypoints stable while extracting internal
  boundaries around contract schemas, application services, domain operations,
  adapters, repositories, and customer/module-specific extensions.
- First rule: every refactor must prove `CONTRACTS.md` plus existing API/docs
  tests still match current behavior.
- Rollback: revert the small refactor commit; contracts stay as the baseline.

## Next Loop Candidates

- Pick one internal boundary behind an existing public entrypoint and add
  characterization coverage before moving code.
