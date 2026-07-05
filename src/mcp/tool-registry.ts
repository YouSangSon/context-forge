import { createCanonicalServicesResolver } from "./canonical-services.js";
import { createToolHandlers } from "./tool-handlers.js";
import type {
  CreateToolRegistryOptions,
  ToolRegistry,
} from "./types.js";
import { instrumentToolRegistry } from "./tool-registry-instrumentation.js";
import { assertCreateToolRegistryOptions } from "./tool-registry-validation.js";

export function createToolRegistry(
  options: CreateToolRegistryOptions = {},
): ToolRegistry {
  assertCreateToolRegistryOptions(options);

  const cwd = options.cwd ?? process.cwd();
  const withCanonicalServices =
    options.withCanonicalServices ??
    createCanonicalServicesResolver({
      resolveCanonicalServices: options.resolveCanonicalServices,
    });
  const handlers = createToolHandlers({ options, cwd, withCanonicalServices });

  return instrumentToolRegistry({ options, handlers, withCanonicalServices });
}
