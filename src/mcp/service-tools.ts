import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SERVICE_TOOL_DESCRIPTORS } from "./tool-schemas.js";
import { toToolResult } from "./tool-result.js";
import type { ToolRegistry } from "./types.js";

export function registerServiceTools(
  server: McpServer,
  registry: ToolRegistry,
): void {
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
}
