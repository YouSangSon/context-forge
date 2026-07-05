import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { nonBlankTextInputSchema } from "./tool-schemas.js";
import { SUPPORTED_MEMORY_KINDS } from "./tool-utils.js";
import type { ToolRegistry } from "./types.js";

const sessionPromptLimitSchema = z.union([
  z.number().int().positive().max(100),
  z
    .string()
    .regex(/^\d+$/)
    .transform((value) => Number(value))
    .pipe(z.number().int().positive().max(100)),
]);

export function registerAkashaPrompts(
  server: McpServer,
  registry: ToolRegistry,
): void {
  server.registerPrompt(
    "akasha_session_start",
    {
      title: "Akasha Session Start",
      description:
        "Build a project context pack for the start of an agent session.",
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
      description:
        "Template for asking an agent to store durable project memory in Akasha.",
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
