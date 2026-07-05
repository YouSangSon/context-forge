# CONTRACTS

Akasha refactors must preserve the public contracts below unless a later PR
adds an explicit compatibility plan. `docs/api-reference.md` remains the full
per-tool schema reference; this file is the contract inventory for architecture
work.

## Contract Sources

- Shared service tool descriptors and JSON HTTP routes:
  `src/mcp/tool-schemas.ts`
- SDK-facing TypeScript tool input/result types:
  `src/mcp/types.ts`
- JSON HTTP transport, organization resolution, and response envelope:
  `src/app/routes/memory.ts`,
  `src/app/middleware/organization-resolution.ts`,
  `src/app/middleware/envelope.ts`
- MCP stdio and MCP Streamable HTTP transport wiring:
  `src/mcp/server.ts`, `src/app/mcp-http.ts`
- Operator HTTP endpoints:
  `src/app/server.ts`
- CLI and package command surface:
  `package.json`, `src/cli.ts`, `src/lifecycle/init.ts`
- DB-facing schema and migration order:
  `src/db/migrations/001_initial.sql` through
  `src/db/migrations/015_background_queue_metrics_indexes.sql`

## Transports

- MCP stdio entrypoint: `dist/src/mcp/server.js`
- MCP Streamable HTTP endpoint: `/mcp`
- JSON HTTP service routes: `/v1/*`
- JSON HTTP success envelope:
  `{ "success": true, "data": <ToolResult> }`
- JSON HTTP failure envelope:
  `{ "success": false, "error": { "message": "<human-readable>" } }`
- MCP responses use native SDK content plus structured tool output; they do not
  use the JSON HTTP envelope.

## Service Tools And JSON HTTP Routes

All 20 service tools use `POST` JSON HTTP routes and share the same zod-backed
tool schema before registry dispatch.

| Tool | JSON HTTP route |
|---|---|
| `add_memory` | `/v1/memory` |
| `search_memory` | `/v1/memory/search` |
| `build_context_pack` | `/v1/memory/context-pack` |
| `reindex_memory` | `/v1/memory/reindex` |
| `compact_memory` | `/v1/memory/compact` |
| `list_memory` | `/v1/memory/list` |
| `inspect_memory_graph` | `/v1/memory/graph` |
| `update_memory` | `/v1/memory/update` |
| `delete_memory` | `/v1/memory/delete` |
| `tag_memory` | `/v1/memory/tag` |
| `list_audit_log` | `/v1/audit/list` |
| `unarchive_memory` | `/v1/memory/unarchive` |
| `start_goal_run` | `/v1/goal-run/start` |
| `record_iteration` | `/v1/goal-run/iteration` |
| `get_goal_run` | `/v1/goal-run/get` |
| `list_goal_runs` | `/v1/goal-run/list` |
| `complete_goal_run` | `/v1/goal-run/complete` |
| `abandon_goal_run` | `/v1/goal-run/abandon` |
| `build_goal_context` | `/v1/goal-run/context` |
| `check_repeat_attempt` | `/v1/goal-run/check-repeat` |

## MCP-Only Tools

These tools have no `/v1/*` route and must keep unsupported-client behavior as
structured success results rather than transport failures.

- `list_workspace_roots`
- `add_memory_interactive`
- `classify_memory_candidate`

## Operator HTTP Endpoints

- `GET /healthz`
- `GET /readyz`
- `GET /metrics`
- `GET /admin/memory`
- OAuth protected-resource metadata:
  `/.well-known/oauth-protected-resource` and
  `/.well-known/oauth-protected-resource/mcp`

## Compatibility Rules

- Do not rename tool names, JSON HTTP paths, package scripts, CLI flags, DB
  migration filenames, or documented response fields without an adapter or
  versioned migration path.
- Preserve `organizationId` semantics, token-org binding precedence, HTTP status
  classes, response envelope shapes, default values, nullable fields, ordering,
  and side effects.
- Clean-architecture and DDD refactors should move internals behind the existing
  descriptors, handlers, repositories, and CLI entrypoints first.

## Current Contract Guards

- `tests/scripts/public-docs-drift.test.ts` verifies public docs include every
  service tool and JSON HTTP route from `TOOL_ROUTES`.
- `tests/app/memory-routes-boundary.test.ts` verifies JSON HTTP routes are
  constructed from `TOOL_ROUTES`.
- `tests/mcp/server.test.ts` verifies MCP tool descriptor registration.
- `tests/scripts/package-manifest.test.ts` verifies public package scripts and
  package surface.
