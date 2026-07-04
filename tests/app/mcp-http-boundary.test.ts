import { describe, expect, it, vi } from "vitest";
import { handleMcpHttpRequest } from "../../src/app/mcp-http.js";
import type { HandleMcpHttpRequestOptions } from "../../src/app/mcp-http.js";

function baseOptions(): HandleMcpHttpRequestOptions {
  return {
    req: {
      method: "GET",
      headers: {},
    } as never,
    res: {
      writeHead: vi.fn(),
      end: vi.fn(),
      setHeader: vi.fn(),
      once: vi.fn(),
    } as never,
    registry: {} as never,
    bearerTokens: [],
    oauthTokenVerifier: null,
    rateLimiter: null,
    logger: {
      error: vi.fn(),
    } as never,
  };
}

describe("handleMcpHttpRequest boundary validation", () => {
  it.each([
    {
      input: null,
      message: "MCP HTTP request options must be an object",
    },
    {
      input: { ...baseOptions(), req: null },
      message: "req must be an object",
    },
    {
      input: { ...baseOptions(), req: { method: "GET", headers: null } },
      message: "req.headers must be an object",
    },
    {
      input: {
        ...baseOptions(),
        res: { writeHead: null, end: vi.fn(), setHeader: vi.fn(), once: vi.fn() },
      },
      message: "res.writeHead must be a function",
    },
    {
      input: { ...baseOptions(), registry: null },
      message: "registry must be an object",
    },
    {
      input: { ...baseOptions(), bearerTokens: null },
      message: "bearerTokens must be an array",
    },
    {
      input: { ...baseOptions(), bearerTokens: [null] },
      message: "bearerTokens[0] must be an object",
    },
    {
      input: { ...baseOptions(), bearerTokens: [{ token: 123 }] },
      message: "bearerTokens[0].token must be a string",
    },
    {
      input: { ...baseOptions(), bearerTokens: [{ token: " \n\t " }] },
      message: "bearerTokens[0].token must contain non-whitespace text",
    },
    {
      input: {
        ...baseOptions(),
        bearerTokens: [{ token: "token-a", organizationId: 123 }],
      },
      message: "bearerTokens[0].organizationId must be a string",
    },
    {
      input: {
        ...baseOptions(),
        bearerTokens: [{ token: "token-a", organizationId: "" }],
      },
      message: "bearerTokens[0].organizationId must contain non-whitespace text",
    },
    {
      input: { ...baseOptions(), oauthTokenVerifier: {} },
      message: "oauthTokenVerifier.verify must be a function",
    },
    {
      input: { ...baseOptions(), rateLimiter: {} },
      message: "rateLimiter.check must be a function",
    },
    {
      input: { ...baseOptions(), logger: {} },
      message: "logger.error must be a function",
    },
    {
      input: { ...baseOptions(), oauthProtectedResource: "resource" },
      message: "oauthProtectedResource must be an object",
    },
    {
      input: { ...baseOptions(), allowedHostnames: ["localhost", 42] },
      message: "allowedHostnames[1] must be a string",
    },
  ])("rejects malformed direct options %#", async ({ input, message }) => {
    await expect(handleMcpHttpRequest(input as never)).rejects.toThrow(message);
  });

  it("rejects malformed rate limiter decisions before writing Retry-After", async () => {
    const options = {
      ...baseOptions(),
      rateLimiter: {
        check: vi.fn().mockReturnValue({
          allowed: false,
          remaining: 0,
          retryAfterMs: "soon",
        }),
      },
    };

    await expect(handleMcpHttpRequest(options as never)).rejects.toThrow(
      "rate-limit decision.retryAfterMs must be a finite non-negative number",
    );
    expect(options.res.setHeader).not.toHaveBeenCalled();
  });
});
