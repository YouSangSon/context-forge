# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current State

Branch: `docs/contract-architecture-baseline`.

Recent completed architecture-goal commits; run `git log -1 --oneline` for the
newest local commit:
- `2bbf1b2 refactor(mcp): split registry audit instrumentation`
- `a3d44e0 refactor(cli): split argument parsing`
- `a3d346d docs(plan): refresh architecture handoff commits`
- `5aaa78b refactor(app): split mcp http auth guard`
- `13fe610 docs(worklog): record full suite verification`
- `09c1491 refactor(app): split json http tool handler`
- `e897a10 test(app): guard json http route handler contract`
- `c9a15d7 refactor(mcp): split tool result formatting`
- `158395b docs(contracts): list mcp response guard`
- `7ab0c09 test(app): guard json http envelope contract`
- `bc7b6d2 docs(architecture): expand transition handoff plan`
- `9534382 refactor(app): share http json body parsing`
- `ec8bba9 refactor(app): split organization resolution boundary`
- `47e8e59 docs(contracts): add public contract baseline`

Current structure:
- Public transports live in `src/mcp/server.ts`, `src/app/mcp-http.ts`, and
  `src/app/routes/memory.ts`.
- MCP tool result formatting lives in `src/mcp/tool-result.ts`.
- MCP Streamable HTTP authenticated tool authorization lives in
  `src/app/middleware/mcp-http-auth.ts`.
- JSON HTTP route handler execution lives in `src/app/routes/tool-handler.ts`;
  shared route types live in `src/app/routes/types.ts`.
- CLI argument parsing lives in `src/cli-args.ts`; `src/cli.ts` keeps the
  public re-export and command dispatch.
- Shared public service schemas and JSON HTTP route descriptors live in
  `src/mcp/tool-schemas.ts`; SDK-facing tool types live in `src/mcp/types.ts`.
- Tool dispatch goes through `src/mcp/tool-registry.ts` and
  `src/mcp/tool-handlers.ts`.
- Tool-boundary audit/log instrumentation lives in
  `src/mcp/tool-registry-instrumentation.ts`.
- Domain work is currently grouped by capability under `src/compact/`,
  `src/context-pack/`, `src/search/`, `src/goal-run/`, `src/store/`,
  `src/vector/`, and `src/embedding/`.
- DB-facing contracts are migration filenames `001-015` plus repository row
  shapes.

Completed in this branch:
- `CONTRACTS.md` freezes the public contract inventory.
- `src/app/middleware/organization-resolution.ts` owns JSON HTTP
  `organizationId` precedence while `src/app/routes/memory.ts` keeps the
  compatibility re-export.
- `src/app/middleware/json-body.ts` owns bounded JSON body parsing for JSON HTTP
  and MCP Streamable HTTP while preserving their previous status behavior.
- `src/mcp/tool-result.ts` owns MCP tool response formatting while preserving
  `structuredContent` and JSON text `content`.
- `tests/app/memory-routes-boundary.test.ts` now characterizes JSON HTTP route
  handler dispatch before deeper route-handler extraction.
- `src/app/routes/tool-handler.ts` owns JSON HTTP tool execution while
  `src/app/routes/memory.ts` owns route table construction.
- `src/app/middleware/mcp-http-auth.ts` owns MCP Streamable HTTP registry
  guarding and MCP-only tool authorization.
- `src/cli-args.ts` owns CLI argument parsing while `src/cli.ts` preserves the
  existing `parseCliArgs` export and command execution.
- `src/mcp/tool-registry-instrumentation.ts` owns tool-boundary audit/log
  wrapping while `src/mcp/tool-registry.ts` owns registry assembly.

Known issues:
- No open P0/P1/P2 backlog item is known from current repo evidence.
- The target architecture is still a staged transition, not a completed module
  split.
- Customer-specific modules and MSA extraction seams are not yet implemented.

## Next Loop Candidates

- Extract one more HTTP or tool-dispatch boundary only when a focused contract
  test can prove behavior stayed stable.
- Shape a first customer/module boundary around an existing capability without
  changing tool names or input/output shapes.
- Add characterization coverage for the next chosen boundary before moving code.

## Target Architecture

Keep public entrypoints stable while moving internals toward:

- Transport adapters: MCP stdio, MCP Streamable HTTP, and JSON HTTP only parse,
  authenticate, authorize, validate envelopes, and call the shared application
  surface.
- Application services: tool use cases coordinate validation, audit, domain
  operations, repositories, vector adapters, and embeddings behind stable
  interfaces already present in the repo.
- Domain modules: memory, search, compaction, goal-run, governance tags, audit,
  and context-pack each own their rules and tests.
- Infrastructure adapters: Postgres, Qdrant, pgvector, embeddings, OAuth, and
  CLI stay replaceable behind existing factories/interfaces.
- Customer-specific modules: add optional modules behind existing tool schemas
  or versioned adapters first; do not fork public request/response shapes.
- MSA readiness: each future service boundary must already have an explicit
  contract, data owner, idempotency/rollback story, and local test gate before
  extraction.

## Transition Plan

1. Preserve contracts first:
   - Keep `CONTRACTS.md`, `docs/api-reference.md`, `src/mcp/tool-schemas.ts`,
     `src/mcp/types.ts`, migrations, CLI scripts, and docs drift tests aligned.
2. Shrink transport files:
   - Move reusable boundary behavior from `src/app/routes/memory.ts` and
     `src/app/mcp-http.ts` into `src/app/middleware/*` or existing helpers.
3. Define application seams:
   - Extract application-level functions only when two transports or tests can
     call the same behavior without new public surface.
4. Clarify domain modules:
   - Move business rules toward capability folders already used by the repo.
5. Add customer/module seams:
   - Introduce adapters or option objects only after a real caller exists.
6. Consider MSA split last:
   - Split deployable services only after module contracts, queues/retries,
     telemetry, and data ownership are proven locally.

## Contract Gate

Every loop must preserve:
- Tool names, JSON HTTP routes, MCP tool registration, response envelope shape,
  status classes, error messages that docs/tests rely on, field names, field
  meaning, defaults, nullability, ordering, and side effects.
- `organizationId` behavior, including token-bound precedence and mismatch
  rejection.
- CLI/package scripts and migration filenames.

Minimum verification for a code loop:
- Focused characterization or contract test for the touched boundary.
- Relevant focused test suite.
- `npm run typecheck`.
- `git diff --check`.
- Broader `npm test` or `npm run build` when the touched surface is shared
  enough to justify the runtime.

## Risks And Rollback

Risks:
- Moving transport code can silently change HTTP status, envelope shape, auth
  precedence, or handler dispatch timing.
- Moving schema or DTO code can break MCP and JSON HTTP at the same time.
- Moving repository code can affect DB-facing row shape or migration order.
- Adding generic module abstractions too early can create dead interfaces.

Rollback:
- Revert only the latest small refactor commit for the failed loop.
- Keep `CONTRACTS.md` unless the contract baseline itself is proven wrong by
  current code.
- If a contract must change, stop and design a compatibility adapter, versioned
  path, or migration plan before changing behavior.

## Continuation Handoff

Before each resume:
- Read `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `docs/architecture.md`,
  `docs/configuration.md`, `docs/api-reference.md`, `docs/README.md`,
  `CONTRACTS.md`, this file, `BACKLOG.md`, `DECISIONS.md`, and recent
  `WORKLOG.md`.
- Check `git status --short --branch` and `git log -1 --oneline`.
- Pick one candidate loop, write or run the smallest contract check, make the
  internal change, rerun checks, update durable docs, and create a local commit.
- Do not push, merge, deploy, change credentials, run paid work, or make
  destructive migrations without explicit approval.
