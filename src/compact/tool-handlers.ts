import type { Logger } from "../logger.js";
import type { ToolRegistry, WithCanonicalServices } from "../mcp/types.js";
import { assertPositiveIntegerArray } from "../mcp/tool-utils.js";
import { unarchiveCompaction } from "./unarchive-compaction.js";

type CompactionToolHandlers = Pick<ToolRegistry, "unarchive_memory">;

export function createCompactionToolHandlers(input: {
  hasOverrides: boolean;
  logger: Logger;
  withCanonicalServices: WithCanonicalServices;
}): CompactionToolHandlers {
  const { hasOverrides, logger, withCanonicalServices } = input;

  return {
    async unarchive_memory(toolInput) {
      // Apply path requires canonical services (archiveRepository +
      // chunkRepository + embeddings + qdrantClient). Legacy override mode
      // doesn't have any of those.
      if (hasOverrides) {
        throw new Error(
          "unarchive_memory requires canonical services (Postgres + Qdrant); " +
            "legacy repository overrides are not supported.",
        );
      }
      if (!Array.isArray(toolInput.archiveIds)) {
        throw new Error("archiveIds must be an array");
      }
      assertPositiveIntegerArray(toolInput.archiveIds, "archiveIds");
      if (toolInput.archiveIds.length === 0) {
        return {
          ok: true,
          outcomes: [],
          restoredCount: 0,
          skippedCount: 0,
          failedCount: 0,
        };
      }
      return await withCanonicalServices(async (services) => {
        const organizationId = toolInput.organizationId?.trim() ?? "default";
        const result = await unarchiveCompaction(
          {
            archiveIds: toolInput.archiveIds,
            organizationId,
            actor: "unarchive_memory",
          },
          {
            archiveRepository: services.archiveRepository,
            chunkRepository: services.chunkRepository,
            embeddings: services.embeddings,
            vectorIndex: services.vectorIndex,
            embedding: {
              provider: services.config.embedding.provider,
              model: services.config.embedding.model,
              dimensions: services.config.embedding.dimensions,
              version: services.config.embedding.version,
              targetTokens: services.config.embedding.chunkTargetTokens,
              overlapTokens: services.config.embedding.chunkOverlapTokens,
            },
            logger,
          },
        );
        return {
          ok: true,
          outcomes: result.outcomes,
          restoredCount: result.restoredCount,
          skippedCount: result.skippedCount,
          failedCount: result.failedCount,
        };
      });
    },
  };
}
