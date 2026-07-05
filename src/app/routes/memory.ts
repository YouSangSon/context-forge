import type { IncomingMessage, ServerResponse } from "node:http";
import type { Logger } from "../../logger.js";
import { CompactionRateLimitError } from "../../compact/apply-compaction.js";
import {
  TOOL_ROUTES,
  type ServiceToolName,
  validateToolInput,
} from "../../mcp/tool-schemas.js";
import {
  assertFunction,
  assertObject,
} from "../../mcp/tool-registry-validation.js";
import type { ToolRegistry } from "../../mcp/types.js";
import { SecretDetectedError } from "../../store/secret-scrub.js";
import type { BearerToken } from "../middleware/bearer-auth.js";
import { checkOAuthScopes } from "../middleware/oauth-token-auth.js";
import { sendError, sendOk } from "../middleware/envelope.js";
import { JsonBodyError, readJsonBody } from "../middleware/json-body.js";
import {
  normalizeUnresolvedOrganizationId,
  resolveOrganizationId,
} from "../middleware/organization-resolution.js";
import {
  setOAuthInsufficientScopeHeader,
  type OAuthProtectedResourceConfig,
} from "../oauth-protected-resource.js";

export { resolveOrganizationId } from "../middleware/organization-resolution.js";

export type RouteContext = {
  registry: ToolRegistry;
  logger: Logger;
  oauthProtectedResource?: OAuthProtectedResourceConfig | null;
};

export type Route = {
  method: "GET" | "POST";
  path: string;
  handle(
    req: IncomingMessage,
    res: ServerResponse,
    auth?: BearerToken | null,
  ): Promise<void>;
};

function buildHandler<K extends ServiceToolName>(toolName: K, ctx: RouteContext) {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    auth?: BearerToken | null,
  ): Promise<void> => {
    try {
      const body = await readJsonBody(req);
      if (typeof body !== "object" || body === null || Array.isArray(body)) {
        sendError(res, 400, "request body must be a JSON object");
        return;
      }

      const bodyRecord = body as Record<string, unknown>;
      const resolved = resolveOrganizationId(
        req,
        bodyRecord.organizationId,
        auth,
      );

      if (resolved.validationError) {
        sendError(res, 400, resolved.validationError);
        return;
      }

      if (resolved.conflict) {
        sendError(
          res,
          403,
          "organizationId mismatch: token is bound to a different organization",
        );
        return;
      }

      const enrichedInput =
        resolved.organizationId !== undefined
          ? { ...bodyRecord, organizationId: resolved.organizationId }
          : normalizeUnresolvedOrganizationId(bodyRecord);

      const scopeCheck = checkOAuthScopes(
        auth,
        toolName,
        enrichedInput,
        ctx.oauthProtectedResource ?? null,
      );
      if (!scopeCheck.ok) {
        setOAuthInsufficientScopeHeader(
          res,
          ctx.oauthProtectedResource ?? null,
          scopeCheck.challengeScope,
        );
        sendError(res, 403, "insufficient_scope");
        return;
      }

      const validation = validateToolInput(toolName, enrichedInput);
      if (!validation.ok) {
        sendError(res, 400, validation.message);
        return;
      }

      const handler = ctx.registry[toolName] as (
        input: Record<string, unknown>,
      ) => Promise<unknown>;
      const result = await handler(validation.data);
      sendOk(res, 200, result);
    } catch (error: unknown) {
      if (error instanceof SecretDetectedError) {
        sendError(res, 400, error.message);
        return;
      }
      if (error instanceof JsonBodyError) {
        sendError(res, error.status, error.message);
        return;
      }
      if (error instanceof CompactionRateLimitError) {
        const retryAfterSeconds = Math.ceil(error.retryAfterMs / 1000);
        res.setHeader("Retry-After", String(retryAfterSeconds));
        sendError(res, 429, "compaction rate limit exceeded; retry later");
        return;
      }

      ctx.logger.error(
        { event: "http.tool_error", tool: toolName, err: error },
        "tool handler failed",
      );
      sendError(res, 500, "internal server error");
    }
  };
}

export function createMemoryRoutes(ctx: RouteContext): Route[] {
  assertRouteContext(ctx);

  return TOOL_ROUTES.map((route) => ({
    method: route.method,
    path: route.path,
    handle: buildHandler(route.name, ctx),
  }));
}

function assertRouteContext(value: unknown): asserts value is RouteContext {
  const candidate = assertObject(value, "memory route context");
  assertObject(candidate.registry, "registry");

  const logger = assertObject(candidate.logger, "logger");
  assertFunction(logger.error, "logger.error");

  if (
    candidate.oauthProtectedResource !== undefined &&
    candidate.oauthProtectedResource !== null
  ) {
    assertObject(candidate.oauthProtectedResource, "oauthProtectedResource");
  }
}
