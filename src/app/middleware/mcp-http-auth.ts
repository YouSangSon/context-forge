import type { ServerResponse } from "node:http";
import type { ToolName } from "../../mcp/tool-schemas.js";
import type { McpToolAuthorizer, ToolRegistry } from "../../mcp/types.js";
import {
  setOAuthInsufficientScopeHeader,
  type OAuthProtectedResourceConfig,
} from "../oauth-protected-resource.js";
import type { BearerToken } from "./bearer-auth.js";
import { checkOAuthScopes } from "./oauth-token-auth.js";

const ORGANIZATION_MISMATCH_ERROR =
  "organizationId mismatch: token is bound to a different organization";

export function withAuthenticatedRegistry(
  registry: ToolRegistry,
  auth: BearerToken,
  oauthProtectedResource: OAuthProtectedResourceConfig | null,
  res: ServerResponse,
): ToolRegistry {
  const wrap =
    <
      TInput extends Record<string, unknown> & { organizationId?: string },
      TResult,
    >(
      toolName: ToolName,
      handler: (input: TInput) => Promise<TResult>,
    ) =>
    async (input: TInput): Promise<TResult> => {
      const scopeCheck = checkOAuthScopes(
        auth,
        toolName,
        input,
        oauthProtectedResource,
      );
      if (!scopeCheck.ok) {
        setOAuthInsufficientScopeHeader(
          res,
          oauthProtectedResource,
          scopeCheck.challengeScope,
        );
        throw new Error("insufficient_scope");
      }

      if (
        auth.organizationId !== undefined &&
        input.organizationId !== undefined &&
        input.organizationId.trim() !== auth.organizationId
      ) {
        throw new Error(ORGANIZATION_MISMATCH_ERROR);
      }
      const enriched =
        auth.organizationId !== undefined
          ? { ...input, organizationId: auth.organizationId }
          : input;
      return handler(enriched);
    };

  return {
    add_memory: wrap("add_memory", registry.add_memory),
    search_memory: wrap("search_memory", registry.search_memory),
    build_context_pack: wrap("build_context_pack", registry.build_context_pack),
    reindex_memory: wrap("reindex_memory", registry.reindex_memory),
    compact_memory: wrap("compact_memory", registry.compact_memory),
    list_memory: wrap("list_memory", registry.list_memory),
    inspect_memory_graph: wrap(
      "inspect_memory_graph",
      registry.inspect_memory_graph,
    ),
    update_memory: wrap("update_memory", registry.update_memory),
    delete_memory: wrap("delete_memory", registry.delete_memory),
    tag_memory: wrap("tag_memory", registry.tag_memory),
    list_audit_log: wrap("list_audit_log", registry.list_audit_log),
    unarchive_memory: wrap("unarchive_memory", registry.unarchive_memory),
    start_goal_run: wrap("start_goal_run", registry.start_goal_run),
    record_iteration: wrap("record_iteration", registry.record_iteration),
    get_goal_run: wrap("get_goal_run", registry.get_goal_run),
    list_goal_runs: wrap("list_goal_runs", registry.list_goal_runs),
    complete_goal_run: wrap("complete_goal_run", registry.complete_goal_run),
    abandon_goal_run: wrap("abandon_goal_run", registry.abandon_goal_run),
    build_goal_context: wrap("build_goal_context", registry.build_goal_context),
    check_repeat_attempt: wrap(
      "check_repeat_attempt",
      registry.check_repeat_attempt,
    ),
  };
}

export function createMcpToolAuthorizer(
  auth: BearerToken,
  oauthProtectedResource: OAuthProtectedResourceConfig | null,
  res: ServerResponse,
): McpToolAuthorizer {
  return ({ toolName, input }) => {
    const scopeCheck = checkOAuthScopes(
      auth,
      toolName,
      input,
      oauthProtectedResource,
    );
    if (!scopeCheck.ok) {
      setOAuthInsufficientScopeHeader(
        res,
        oauthProtectedResource,
        scopeCheck.challengeScope,
      );
      throw new Error("insufficient_scope");
    }

    if (
      auth.organizationId !== undefined &&
      typeof input.organizationId === "string" &&
      input.organizationId.trim() !== auth.organizationId
    ) {
      throw new Error(ORGANIZATION_MISMATCH_ERROR);
    }
  };
}
