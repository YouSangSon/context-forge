# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop - HTTP JSON Body Boundary

Status:
- Continuing small HTTP boundary extractions after freezing public contracts.
- Moved duplicated JSON body parsing from `src/app/routes/memory.ts` and
  `src/app/mcp-http.ts` into `src/app/middleware/json-body.ts`.
- Preserved JSON HTTP oversized-body status `400` and MCP HTTP oversized-body
  status `413`.
- Updated `CONTRACTS.md` so the shared body parser remains part of the contract
  source inventory.
- Target structure remains staged: preserve contracts first, then split
  internals behind existing descriptors, handlers, repositories, and CLI
  entrypoints.

Verification:
- `npm test -- tests/app/server.test.ts -t "invalid JSON body|JSON HTTP body exceeds|JSON but not an object" --reporter=dot`
  (`1` file passed; `3` tests passed, `65` skipped)
- `npm test -- tests/app/mcp-http.test.ts -t "oversized POST bodies|POST JSON is invalid|POST body exceeds" --reporter=dot`
  (`1` file passed; `3` tests passed, `18` skipped)
- `npm test -- tests/app/memory-routes-boundary.test.ts --reporter=dot`
  (`1` file passed; `14` tests)
- `npm test -- tests/app/server.test.ts tests/app/mcp-http.test.ts tests/app/memory-routes-boundary.test.ts tests/scripts/public-docs-drift.test.ts --reporter=dot`
  (`4` files passed; `150` tests)
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
