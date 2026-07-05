import type { ToolRegistry } from "../mcp/types.js";
import { assertOptionalPositiveInteger } from "../mcp/tool-utils.js";
import type { AuditLogRepository } from "./audit-log-repository.js";

type AuditToolHandlers = Pick<ToolRegistry, "list_audit_log">;

export function createAuditToolHandlers(input: {
  auditLog?: AuditLogRepository;
}): AuditToolHandlers {
  const { auditLog } = input;

  return {
    async list_audit_log(toolInput) {
      if (!auditLog) {
        throw new Error(
          "audit log not configured: pass options.auditLog to enable list_audit_log",
        );
      }
      assertOptionalPositiveInteger(toolInput.limit, "limit", 1000);
      const organizationId = toolInput.organizationId?.trim() ?? "default";
      const entries = await auditLog.listByOrganization(organizationId, {
        limit: toolInput.limit,
      });
      return {
        ok: true,
        organizationId,
        entries: entries.map((entry) => ({
          id: entry.id,
          organizationId: entry.organizationId,
          actor: entry.actor,
          tool: entry.tool,
          projectKey: entry.projectKey ?? null,
          outcome: entry.outcome,
          errorMessage: entry.errorMessage ?? null,
          durationMs: entry.durationMs,
          requestId: entry.requestId ?? null,
          createdAt: entry.createdAt,
        })),
      };
    },
  };
}
