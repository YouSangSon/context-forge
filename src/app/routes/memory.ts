import { TOOL_ROUTES } from "../../mcp/tool-schemas.js";
import {
  assertFunction,
  assertObject,
} from "../../mcp/tool-registry-validation.js";
import { buildToolRouteHandler } from "./tool-handler.js";
import type { Route, RouteContext } from "./types.js";

export { resolveOrganizationId } from "../middleware/organization-resolution.js";
export type { Route, RouteContext } from "./types.js";

export function createMemoryRoutes(ctx: RouteContext): Route[] {
  assertRouteContext(ctx);

  return TOOL_ROUTES.map((route) => ({
    method: route.method,
    path: route.path,
    handle: buildToolRouteHandler(route.name, ctx),
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
