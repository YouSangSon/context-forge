import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { ElicitRequestFormParams } from "@modelcontextprotocol/sdk/types.js";
import { pathToFileURL } from "node:url";
import * as z from "zod/v4";
import {
  MCP_CONTEXT_TOOL_DESCRIPTORS,
  SERVICE_TOOL_DESCRIPTORS,
  nonBlankTextInputSchema,
} from "./tool-schemas.js";
import { toToolResult } from "./tool-result.js";
import { createToolRegistry } from "./tool-registry.js";
import {
  assertCreateToolRegistryOptions,
  assertFunction,
  assertNonBlankString,
  assertObject,
} from "./tool-registry-validation.js";
import {
  requireProjectKey,
  requireUserScopeId,
  SUPPORTED_MEMORY_KINDS,
} from "./tool-utils.js";
import { registerAkashaResources } from "./resources.js";
import type {
  AddMemoryInteractiveToolInput,
  ClassifyMemoryCandidateToolInput,
  CreateMcpServerOptions,
  McpToolAuthorizer,
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

const ELICITED_MEMORY_SCHEMA = z.object({
  projectKey: nonBlankTextInputSchema.optional(),
  kind: z.enum(SUPPORTED_MEMORY_KINDS).optional(),
  content: nonBlankTextInputSchema,
});

const MEMORY_CLASSIFICATION_SCHEMA = z.object({
  kind: z.enum(SUPPORTED_MEMORY_KINDS),
  summary: nonBlankTextInputSchema,
  confidence: z.number().min(0).max(1).optional(),
});

const sessionPromptLimitSchema = z.union([
  z.number().int().positive().max(100),
  z
    .string()
    .regex(/^\d+$/)
    .transform((value) => Number(value))
    .pipe(z.number().int().positive().max(100)),
]);

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

  for (const descriptor of SERVICE_TOOL_DESCRIPTORS) {
    server.registerTool(
      descriptor.name,
      {
        description: descriptor.description,
        inputSchema: descriptor.inputSchema,
        outputSchema: descriptor.outputSchema,
      },
      async (input: Record<string, unknown>) => {
        const handler = registry[descriptor.name] as (
          toolInput: typeof input,
        ) => Promise<unknown>;
        return toToolResult(await handler(input));
      },
    );
  }

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

function registerMcpContextTools(
  server: McpServer,
  registry: ToolRegistry,
  authorizeTool?: McpToolAuthorizer,
): void {
  const listRootsDescriptor = descriptorByName("list_workspace_roots");
  server.registerTool(
    listRootsDescriptor.name,
    {
      description: listRootsDescriptor.description,
      inputSchema: listRootsDescriptor.inputSchema,
      outputSchema: listRootsDescriptor.outputSchema,
    },
    async (input: Record<string, unknown>) => {
      await authorizeTool?.({
        toolName: "list_workspace_roots",
        input,
      });

      if (!server.server.getClientCapabilities()?.roots) {
        return toToolResult({
          ok: true,
          supported: false,
          roots: [],
          message: "Connected MCP client did not advertise roots support.",
        });
      }

      const result = await server.server.listRoots();
      return toToolResult({
        ok: true,
        supported: true,
        roots: result.roots.map((root) => ({
          uri: root.uri,
          ...(root.name ? { name: root.name } : {}),
        })),
      });
    },
  );

  const interactiveDescriptor = descriptorByName("add_memory_interactive");
  server.registerTool(
    interactiveDescriptor.name,
    {
      description: interactiveDescriptor.description,
      inputSchema: interactiveDescriptor.inputSchema,
      outputSchema: interactiveDescriptor.outputSchema,
    },
    async (input: AddMemoryInteractiveToolInput & Record<string, unknown>) => {
      await authorizeTool?.({
        toolName: "add_memory_interactive",
        input,
      });

      if (!server.server.getClientCapabilities()?.elicitation) {
        return toToolResult({
          ok: true,
          action: "unsupported",
          stored: false,
          message:
            "Connected MCP client did not advertise elicitation support.",
        });
      }

      const elicited = await server.server.elicitInput({
        mode: "form",
        message:
          input.message ??
          "Provide the memory Akasha should store for future agent sessions.",
        requestedSchema: buildMemoryElicitationSchema(input),
      });

      if (elicited.action !== "accept") {
        return toToolResult({
          ok: true,
          action: elicited.action,
          stored: false,
        });
      }

      const parsed = ELICITED_MEMORY_SCHEMA.parse(elicited.content ?? {});
      const rawProjectKey = input.projectKey ?? parsed.projectKey;
      let organizationId: string | undefined;
      if (input.organizationId !== undefined) {
        assertNonBlankString(input.organizationId, "organizationId");
        organizationId = input.organizationId.trim();
      }
      const projectKey =
        rawProjectKey === undefined
          ? undefined
          : requireProjectKey(rawProjectKey, "project");
      const userScopeId =
        input.userScopeId === undefined
          ? undefined
          : requireUserScopeId(input.userScopeId);
      const kind = input.kind ?? parsed.kind;
      if (input.scope !== "user" && !projectKey) {
        throw new Error("projectKey is required to store project memory.");
      }
      if (!kind) {
        throw new Error("kind is required to store memory.");
      }

      const stored = await registry.add_memory({
        ...(organizationId ? { organizationId } : {}),
        ...(projectKey ? { projectKey } : {}),
        ...(input.scope ? { scope: input.scope } : {}),
        ...(userScopeId ? { userScopeId } : {}),
        kind,
        content: parsed.content,
      });

      return toToolResult({
        ok: true,
        action: "accept",
        stored: true,
        memoryId: stored.memoryId,
        summary: stored.summary,
        collected: {
          ...(projectKey ? { projectKey } : {}),
          kind,
          content: parsed.content,
        },
      });
    },
  );

  const classifyDescriptor = descriptorByName("classify_memory_candidate");
  server.registerTool(
    classifyDescriptor.name,
    {
      description: classifyDescriptor.description,
      inputSchema: classifyDescriptor.inputSchema,
      outputSchema: classifyDescriptor.outputSchema,
    },
    async (input: ClassifyMemoryCandidateToolInput & Record<string, unknown>) => {
      await authorizeTool?.({
        toolName: "classify_memory_candidate",
        input,
      });

      if (!server.server.getClientCapabilities()?.sampling) {
        return toToolResult({
          ok: true,
          supported: false,
          message: "Connected MCP client did not advertise sampling support.",
        });
      }

      const response = await server.server.createMessage({
        systemPrompt:
          "You classify candidate Akasha memory. Return only compact JSON.",
        includeContext: "none",
        maxTokens: input.maxTokens ?? 300,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: buildMemoryClassificationPrompt(input),
            },
          },
        ],
      });
      const rawText = extractTextContent(response.content);
      const classification = MEMORY_CLASSIFICATION_SCHEMA.parse(
        parseJsonObjectFromText(rawText),
      );

      return toToolResult({
        ok: true,
        supported: true,
        classification,
        model: response.model,
        rawText,
      });
    },
  );
}

function descriptorByName(
  name:
    | "list_workspace_roots"
    | "add_memory_interactive"
    | "classify_memory_candidate",
) {
  const descriptor = MCP_CONTEXT_TOOL_DESCRIPTORS.find(
    (candidate) => candidate.name === name,
  );
  if (!descriptor) {
    throw new Error(`Missing MCP context tool descriptor: ${name}`);
  }
  return descriptor;
}

function buildMemoryClassificationPrompt(
  input: ClassifyMemoryCandidateToolInput,
): string {
  return [
    "Classify the candidate memory for a persistent coding-agent memory store.",
    "Return JSON only, with this shape:",
    '{"kind":"decision|summary|fact","summary":"one concise sentence","confidence":0.0}',
    "Rules:",
    "- kind must be exactly one of decision, summary, fact.",
    "- summary must preserve operational identifiers, file paths, env vars, and dates.",
    "- confidence is optional but, if present, must be between 0 and 1.",
    input.instruction ? `Additional instruction: ${input.instruction}` : "",
    "",
    "Candidate memory:",
    input.content,
  ].filter(Boolean).join("\n");
}

function extractTextContent(content: unknown): string {
  if (
    typeof content === "object" &&
    content !== null &&
    "type" in content &&
    content.type === "text" &&
    "text" in content &&
    typeof content.text === "string"
  ) {
    return content.text;
  }

  throw new Error("sampling response did not contain text content");
}

function parseJsonObjectFromText(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (_err: unknown) {
    const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    if (fenced?.[1]) {
      return JSON.parse(fenced[1]);
    }

    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    }
    throw new Error("sampling response did not contain a valid JSON object");
  }
}

function buildMemoryElicitationSchema(
  input: AddMemoryInteractiveToolInput,
): ElicitRequestFormParams["requestedSchema"] {
  const properties: ElicitRequestFormParams["requestedSchema"]["properties"] = {
    content: {
      type: "string",
      title: "Memory",
      description: "Durable memory content to store in Akasha.",
      minLength: 1,
    },
  };
  const required = ["content"];

  if (input.scope !== "user" && !input.projectKey) {
    properties.projectKey = {
      type: "string",
      title: "Project key",
      description: "Project scope where this memory should be stored.",
      minLength: 1,
    };
    required.push("projectKey");
  }

  if (!input.kind) {
    properties.kind = {
      type: "string",
      title: "Memory kind",
      description: "Type of memory to store.",
      enum: [...SUPPORTED_MEMORY_KINDS],
      default: "fact",
    };
    required.push("kind");
  }

  return {
    type: "object",
    properties,
    required,
  };
}

function registerAkashaPrompts(server: McpServer, registry: ToolRegistry): void {
  server.registerPrompt(
    "akasha_session_start",
    {
      title: "Akasha Session Start",
      description: "Build a project context pack for the start of an agent session.",
      argsSchema: {
        organizationId: nonBlankTextInputSchema.optional(),
        projectKey: nonBlankTextInputSchema,
        task: nonBlankTextInputSchema,
        limit: sessionPromptLimitSchema.optional(),
      },
    },
    async ({ organizationId, projectKey, task, limit }) => {
      const pack = await registry.build_context_pack({
        ...(organizationId ? { organizationId } : {}),
        projectKey,
        task,
        ...(limit ? { limit } : {}),
      });

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `${pack.packMarkdown}\n\nUse this Akasha context while working on: ${task}`,
            },
          },
        ],
      };
    },
  );

  server.registerPrompt(
    "akasha_store_memory",
    {
      title: "Akasha Store Memory",
      description: "Template for asking an agent to store durable project memory in Akasha.",
      argsSchema: {
        projectKey: nonBlankTextInputSchema,
        kind: z.enum(SUPPORTED_MEMORY_KINDS),
        content: nonBlankTextInputSchema,
      },
    },
    async ({ projectKey, kind, content }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text:
              `Store this durable Akasha memory for project "${projectKey}" ` +
              `as kind "${kind}":\n\n${content}`,
          },
        },
      ],
    }),
  );
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
