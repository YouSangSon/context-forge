import {
  ResourceTemplate,
  type McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolRegistry } from "./types.js";

export function registerAkashaResources(
  server: McpServer,
  registry: ToolRegistry,
): void {
  server.registerResource(
    "recent-project-memory",
    new ResourceTemplate("akasha://memory/recent/{projectKey}", {
      list: undefined,
    }),
    {
      title: "Recent Project Memory",
      description:
        "Search recent Akasha memory for a project. Query params: organizationId, query, limit.",
      mimeType: "application/json",
    },
    async (uri) => {
      const resourceUrl = parseResourceUrl(uri);
      const projectKey = getPathSegment(resourceUrl, 1, "projectKey");
      const query = parseRecentMemoryQuery(resourceUrl);
      const organizationId = parseOptionalNonEmptySearchParam(
        resourceUrl,
        "organizationId",
      );
      const limit = parseOptionalPositiveInteger(
        resourceUrl.searchParams.get("limit"),
        "limit",
        100,
      );
      const result = await registry.search_memory({
        ...(organizationId ? { organizationId } : {}),
        projectKey,
        query,
        ...(limit === undefined ? {} : { limit }),
      });

      return {
        contents: [
          {
            uri: resourceUrl.href,
            mimeType: "application/json",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );

  server.registerResource(
    "context-pack",
    new ResourceTemplate("akasha://context-pack/{projectKey}/{task}", {
      list: undefined,
    }),
    {
      title: "Context Pack",
      description:
        "Build an Akasha context pack. Query params: organizationId, limit.",
      mimeType: "text/markdown",
    },
    async (uri) => {
      const resourceUrl = parseResourceUrl(uri);
      const projectKey = getPathSegment(resourceUrl, 0, "projectKey");
      const task = getPathSegment(resourceUrl, 1, "task");
      const organizationId = parseOptionalNonEmptySearchParam(
        resourceUrl,
        "organizationId",
      );
      const limit = parseOptionalPositiveInteger(
        resourceUrl.searchParams.get("limit"),
        "limit",
        100,
      );
      const result = await registry.build_context_pack({
        ...(organizationId ? { organizationId } : {}),
        projectKey,
        task,
        ...(limit === undefined ? {} : { limit }),
      });

      return {
        contents: [
          {
            uri: resourceUrl.href,
            mimeType: "text/markdown",
            text: result.packMarkdown,
          },
        ],
      };
    },
  );
}

function parseResourceUrl(uri: URL | { href: string }): URL {
  return uri instanceof URL ? uri : new URL(uri.href);
}

function getPathSegment(resourceUrl: URL, index: number, label: string): string {
  const segments = resourceUrl.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
  const value = segments[index];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required ${label} resource path segment.`);
  }
  return value;
}

function parseRecentMemoryQuery(resourceUrl: URL): string {
  const query = resourceUrl.searchParams.get("query");
  if (query === null) {
    return "recent decisions constraints open questions";
  }
  if (query.trim().length === 0) {
    throw new Error("Query must contain non-whitespace text when provided.");
  }
  return query;
}

function parseOptionalNonEmptySearchParam(
  resourceUrl: URL,
  label: string,
): string | undefined {
  const rawValue = resourceUrl.searchParams.get(label);
  if (rawValue === null) {
    return undefined;
  }
  if (rawValue.trim().length === 0) {
    throw new Error(`${label} must contain non-whitespace text when provided.`);
  }
  return rawValue;
}

function parseOptionalPositiveInteger(
  rawValue: string | null,
  label: string,
  max?: number,
): number | undefined {
  if (rawValue === null) {
    return undefined;
  }
  if (!/^\d+$/.test(rawValue)) {
    throw new Error(`${label} must be a positive integer when provided.`);
  }
  const parsedValue = Number(rawValue);
  if (!Number.isSafeInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`${label} must be a positive integer when provided.`);
  }
  if (max !== undefined && parsedValue > max) {
    throw new Error(`${label} must be a positive integer up to ${max}.`);
  }
  return parsedValue;
}
