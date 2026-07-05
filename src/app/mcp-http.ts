import type { IncomingMessage, ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Logger } from "../logger.js";
import { createMcpServer } from "../mcp/server.js";
import type { ToolRegistry } from "../mcp/types.js";
import {
  assertFunction,
  assertObject,
} from "../mcp/tool-registry-validation.js";
import {
  authenticateBearer,
  type BearerToken,
  type OAuthTokenVerifier,
} from "./middleware/bearer-auth.js";
import {
  setOAuthWwwAuthenticateHeader,
  type OAuthProtectedResourceConfig,
} from "./oauth-protected-resource.js";
import {
  assertRateLimitDecision,
  type RateLimiter,
} from "./middleware/rate-limit.js";
import { JsonBodyError, readJsonBody } from "./middleware/json-body.js";
import {
  createMcpToolAuthorizer,
  withAuthenticatedRegistry,
} from "./middleware/mcp-http-auth.js";

export type HandleMcpHttpRequestOptions = {
  req: IncomingMessage;
  res: ServerResponse;
  registry: ToolRegistry;
  bearerTokens: readonly BearerToken[];
  oauthTokenVerifier: OAuthTokenVerifier | null;
  rateLimiter: RateLimiter | null;
  logger: Logger;
  oauthProtectedResource?: OAuthProtectedResourceConfig | null;
  allowedHostnames?: readonly string[];
};

export async function handleMcpHttpRequest(
  options: HandleMcpHttpRequestOptions,
): Promise<void> {
  assertHandleMcpHttpRequestOptions(options);

  const {
    req,
    res,
    registry,
    bearerTokens,
    oauthTokenVerifier,
    rateLimiter,
    logger,
    oauthProtectedResource = null,
    allowedHostnames,
  } = options;

  if (req.method !== "POST" && req.method !== "GET" && req.method !== "DELETE") {
    sendJsonRpcError(res, 405, -32000, "Method not allowed");
    return;
  }

  if (allowedHostnames && allowedHostnames.length > 0) {
    const hostError = validateHostHeader(req.headers.host, allowedHostnames);
    if (hostError) {
      sendJsonRpcError(res, 403, -32000, hostError);
      return;
    }
  }

  if (!isAllowedOrigin(req.headers.origin)) {
    sendJsonRpcError(res, 403, -32000, "Forbidden origin");
    return;
  }

  let matchedToken: BearerToken | null = null;
  if (bearerTokens.length > 0 || oauthTokenVerifier) {
    matchedToken = await authenticateBearer(
      typeof req.headers.authorization === "string"
        ? req.headers.authorization
        : undefined,
      bearerTokens,
      oauthTokenVerifier,
    );
    if (!matchedToken) {
      setOAuthWwwAuthenticateHeader(res, oauthProtectedResource);
      sendJsonRpcError(res, 401, -32001, "Unauthorized");
      return;
    }
  }

  if (rateLimiter) {
    const key = matchedToken?.token ?? "anonymous";
    const decision = rateLimiter.check(key);
    assertRateLimitDecision(decision);
    if (!decision.allowed) {
      res.setHeader(
        "Retry-After",
        Math.ceil(decision.retryAfterMs / 1000).toString(),
      );
      sendJsonRpcError(res, 429, -32002, "Rate limit exceeded");
      return;
    }
  }

  const guardedRegistry = matchedToken
    ? withAuthenticatedRegistry(registry, matchedToken, oauthProtectedResource, res)
    : registry;

  const server = createMcpServer({
    registry: guardedRegistry,
    defaultActor: "mcp-http",
    ...(matchedToken
      ? {
          authorizeTool: createMcpToolAuthorizer(
            matchedToken,
            oauthProtectedResource,
            res,
          ),
        }
      : {}),
  });
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  let cleanupInFinally = true;
  let cleanedUp = false;
  const cleanup = async () => {
    if (cleanedUp) {
      return;
    }
    cleanedUp = true;
    await Promise.allSettled([
      Promise.resolve().then(() => transport.close()),
      Promise.resolve().then(() => server.close()),
    ]);
  };
  const cleanupOnClose = () => {
    void cleanup();
  };
  res.once("close", cleanupOnClose);

  try {
    await server.connect(transport);
    const parsedBody =
      req.method === "POST"
        ? await readJsonBody(req, { oversizedStatus: 413 })
        : undefined;
    await transport.handleRequest(req, res, parsedBody);
    cleanupInFinally = false;
  } catch (error: unknown) {
    logger.error({ event: "mcp_http.error", err: error }, "MCP HTTP request failed");
    if (!res.headersSent) {
      if (error instanceof JsonBodyError) {
        sendJsonRpcError(res, error.status, -32000, error.message);
        return;
      }
      sendJsonRpcError(res, 500, -32603, "Internal server error");
    }
  } finally {
    if (cleanupInFinally) {
      await cleanup();
    }
  }
}

function assertHandleMcpHttpRequestOptions(
  value: unknown,
): asserts value is HandleMcpHttpRequestOptions {
  const candidate = assertObject(value, "MCP HTTP request options");
  const req = assertObject(candidate.req, "req");
  assertObject(req.headers, "req.headers");

  const res = assertObject(candidate.res, "res");
  assertFunction(res.writeHead, "res.writeHead");
  assertFunction(res.end, "res.end");
  assertFunction(res.setHeader, "res.setHeader");
  assertFunction(res.once, "res.once");

  assertObject(candidate.registry, "registry");
  assertBearerTokens(candidate.bearerTokens);
  assertNullableObject(candidate.oauthTokenVerifier, "oauthTokenVerifier");
  if (candidate.oauthTokenVerifier !== null) {
    assertFunction(
      candidate.oauthTokenVerifier.verify,
      "oauthTokenVerifier.verify",
    );
  }
  assertNullableObject(candidate.rateLimiter, "rateLimiter");
  if (candidate.rateLimiter !== null) {
    assertFunction(candidate.rateLimiter.check, "rateLimiter.check");
  }

  const logger = assertObject(candidate.logger, "logger");
  assertFunction(logger.error, "logger.error");

  if (
    candidate.oauthProtectedResource !== undefined &&
    candidate.oauthProtectedResource !== null
  ) {
    assertObject(candidate.oauthProtectedResource, "oauthProtectedResource");
  }

  if (candidate.allowedHostnames !== undefined) {
    assertStringArray(candidate.allowedHostnames, "allowedHostnames");
  }
}

function assertArray(value: unknown, fieldName: string): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
}

function assertStringArray(
  value: unknown,
  fieldName: string,
): asserts value is string[] {
  assertArray(value, fieldName);
  for (const [index, item] of value.entries()) {
    if (typeof item !== "string") {
      throw new Error(`${fieldName}[${index}] must be a string`);
    }
  }
}

function assertBearerTokens(value: unknown): asserts value is BearerToken[] {
  assertArray(value, "bearerTokens");
  for (const [index, token] of value.entries()) {
    const entry = assertObject(token, `bearerTokens[${index}]`);
    if (typeof entry.token !== "string") {
      throw new Error(`bearerTokens[${index}].token must be a string`);
    }
    assertNonBlankString(entry.token, `bearerTokens[${index}].token`);
    if (
      entry.organizationId !== undefined &&
      typeof entry.organizationId !== "string"
    ) {
      throw new Error(
        `bearerTokens[${index}].organizationId must be a string`,
      );
    }
    if (entry.organizationId !== undefined) {
      assertNonBlankString(
        entry.organizationId,
        `bearerTokens[${index}].organizationId`,
      );
    }
  }
}

function assertNullableObject(
  value: unknown,
  fieldName: string,
): asserts value is Record<string, unknown> | null {
  if (value !== null) {
    assertObject(value, fieldName);
  }
}

function assertNonBlankString(value: string, fieldName: string): void {
  if (value.trim().length === 0) {
    throw new Error(`${fieldName} must contain non-whitespace text`);
  }
}

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  try {
    const parsed = new URL(origin);
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1" ||
      parsed.hostname === "[::1]"
    );
  } catch (_err: unknown) {
    return false;
  }
}

function validateHostHeader(
  hostHeader: string | undefined,
  allowedHostnames: readonly string[],
): string | null {
  if (!hostHeader) {
    return "Missing Host header";
  }

  let hostname: string;
  try {
    hostname = new URL(`http://${hostHeader}`).hostname;
  } catch (_err: unknown) {
    return `Invalid Host header: ${hostHeader}`;
  }

  if (!allowedHostnames.includes(hostname)) {
    return `Invalid Host: ${hostname}`;
  }

  return null;
}

function sendJsonRpcError(
  res: ServerResponse,
  status: number,
  code: number,
  message: string,
): void {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify({ jsonrpc: "2.0", error: { code, message }, id: null }));
}
