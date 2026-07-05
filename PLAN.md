# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - HTTP Organization Resolution Boundary

Status:
- Started the first internal-boundary loop after freezing public contracts.
- Moved JSON HTTP `organizationId` resolution into
  `src/app/middleware/organization-resolution.ts`.
- Kept `src/app/routes/memory.ts` as the public route factory and compatibility
  re-export path for existing imports.
- Updated `CONTRACTS.md` so the new boundary remains part of the contract
  source inventory.
- Target structure remains staged: preserve contracts first, then split
  internals behind existing descriptors, handlers, repositories, and CLI
  entrypoints.

Verification:
- `npm test -- tests/mcp/resolve-org.test.ts tests/app/memory-routes-boundary.test.ts --reporter=dot`
  (`2` files passed; `31` tests)
- `npm test -- tests/scripts/public-docs-drift.test.ts -t "contract baseline" --reporter=dot`
  (`1` file passed; `1` test passed, `46` skipped)
- `npm test -- tests/scripts/public-docs-drift.test.ts --reporter=dot`
  (`1` file passed; `47` tests)
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
