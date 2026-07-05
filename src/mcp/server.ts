import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { pathToFileURL } from "node:url";
import { createToolRegistry } from "./tool-registry.js";
import {
  assertCreateToolRegistryOptions,
  assertFunction,
  assertNonBlankString,
  assertObject,
} from "./tool-registry-validation.js";
import { registerMcpContextTools } from "./context-tools.js";
import { registerAkashaPrompts } from "./prompts.js";
import { registerAkashaResources } from "./resources.js";
import { registerServiceTools } from "./service-tools.js";
import type {
  CreateMcpServerOptions,
  ToolRegistry,
} from "./types.js";

export { createToolRegistry } from "./tool-registry.js";
export type {
  AddMemoryToolInput,
  AddMemoryToolResult,
  AuditLogEntryView,
  BuildContextPackToolInput,
  BuildContextPackToolResult,
  CanonicalServices,
  CompactMemoryToolInput,
  CompactMemoryToolResult,
  CreateMcpServerOptions,
  CreateToolRegistryOptions,
  DeleteMemoryToolInput,
  DeleteMemoryToolResult,
  ListMemoryToolInput,
  ListMemoryToolResult,
  ListAuditLogToolInput,
  ListAuditLogToolResult,
  ReindexMemoryToolInput,
  ReindexMemoryToolResult,
  RetrieveMemoryServiceInput,
  RetrieveMemoryService,
  SearchMemoryToolInput,
  SearchMemoryToolResult,
  TagMemoryToolInput,
  TagMemoryToolResult,
  ToolRegistry,
  UnarchiveMemoryToolInput,
  UnarchiveMemoryToolResult,
  UpdateMemoryToolInput,
  UpdateMemoryToolResult,
} from "./types.js";

export function createMcpServer(
  options: CreateMcpServerOptions = {},
): McpServer {
  assertCreateMcpServerOptions(options);

  const registry =
    options.registry ??
    createToolRegistry({
      cwd: options.cwd,
      repository: options.repository,
      projectRepository: options.projectRepository,
      userRepository: options.userRepository,
      resolveRepository: options.resolveRepository,
      resolveCanonicalServices: options.resolveCanonicalServices,
      withCanonicalServices: options.withCanonicalServices,
      defaultUserScopeId: options.defaultUserScopeId,
      retrieveMemory: options.retrieveMemory,
      logger: options.logger,
      auditLog: options.auditLog,
      defaultActor: options.defaultActor,
    });

  const server = new McpServer({
    name: "developer-memory-os",
    version: "0.1.0",
  });

  registerServiceTools(server, registry);
  registerMcpContextTools(server, registry, options.authorizeTool);
  registerAkashaResources(server, registry);
  registerAkashaPrompts(server, registry);

  return server;
}

export async function startStdioServer(options: CreateMcpServerOptions = {}) {
  const server = createMcpServer(options);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  return server;
}

export function resolveStdioCwd(
  env: NodeJS.ProcessEnv = process.env,
  getFallbackCwd: () => string = () => process.cwd(),
): string {
  const candidateEnv = assertObject(env, "env");
  assertFunction(getFallbackCwd, "getFallbackCwd");

  const cwd = candidateEnv.DMO_CWD;
  if (cwd === undefined) {
    const fallbackCwd = getFallbackCwd();
    assertNonBlankString(fallbackCwd, "fallback cwd");
    return fallbackCwd;
  }
  assertNonBlankString(cwd, "DMO_CWD");
  return cwd;
}

function assertCreateMcpServerOptions(
  value: unknown,
): asserts value is CreateMcpServerOptions {
  const candidate = assertObject(value, "MCP server options");
  const registry = candidate.registry;
  const authorizeTool = candidate.authorizeTool;

  assertCreateToolRegistryOptions(candidate);

  if (registry !== undefined) {
    assertObject(registry, "registry");
  }
  if (authorizeTool !== undefined) {
    assertFunction(authorizeTool, "authorizeTool");
  }
}

async function main() {
  const cwd = resolveStdioCwd();
  await startStdioServer({ cwd });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}
