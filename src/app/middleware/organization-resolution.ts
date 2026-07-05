import type { IncomingMessage } from "node:http";
import type { BearerToken } from "./bearer-auth.js";
import { assertObject } from "../../mcp/tool-registry-validation.js";

// Resolution order for the request's organizationId:
//   1. token binding (server-enforced, takes precedence -- caller cannot escape)
//   2. x-organization-id header
//   3. body.organizationId
// If a token has a binding AND header/body specify a different org, reject 403.
export function resolveOrganizationId(
  req: IncomingMessage,
  bodyOrgRaw: unknown,
  auth: BearerToken | null | undefined,
): {
  organizationId: string | undefined;
  conflict: boolean;
  validationError?: string;
} {
  const request = assertObject(req, "req");
  const headers = assertObject(request.headers, "req.headers");
  const rawHeaders = assertOptionalStringArray(
    request.rawHeaders,
    "req.rawHeaders",
  );

  const headerValue = headers["x-organization-id"];
  if (countRawHeader(rawHeaders, "x-organization-id") > 1) {
    return {
      organizationId: undefined,
      conflict: false,
      validationError: "x-organization-id must be provided at most once",
    };
  }

  if (headerValue !== undefined && typeof headerValue !== "string") {
    return {
      organizationId: undefined,
      conflict: false,
      validationError: "x-organization-id must be a string",
    };
  }

  const headerOrg =
    typeof headerValue === "string" ? headerValue.trim() : undefined;
  if (headerValue !== undefined && headerOrg?.length === 0) {
    return {
      organizationId: undefined,
      conflict: false,
      validationError: "x-organization-id must contain non-whitespace text",
    };
  }

  if (bodyOrgRaw !== undefined && typeof bodyOrgRaw !== "string") {
    return {
      organizationId: undefined,
      conflict: false,
      validationError: "organizationId must be a string",
    };
  }

  let bodyOrg: string | undefined;
  if (typeof bodyOrgRaw === "string") {
    bodyOrg = bodyOrgRaw.trim();
    if (bodyOrg.length === 0) {
      return {
        organizationId: undefined,
        conflict: false,
        validationError: "organizationId must contain non-whitespace text",
      };
    }
  }

  const callerOrg = headerOrg ?? bodyOrg;

  if (auth?.organizationId) {
    if (callerOrg !== undefined && callerOrg !== auth.organizationId) {
      return { organizationId: auth.organizationId, conflict: true };
    }
    return { organizationId: auth.organizationId, conflict: false };
  }

  return { organizationId: callerOrg, conflict: false };
}

export function normalizeUnresolvedOrganizationId(
  input: Record<string, unknown>,
): Record<string, unknown> {
  if (!Object.hasOwn(input, "organizationId")) {
    return input;
  }
  if (
    typeof input.organizationId !== "string" ||
    input.organizationId.trim().length > 0
  ) {
    return input;
  }
  const { organizationId: _organizationId, ...rest } = input;
  return rest;
}

function countRawHeader(
  rawHeaders: readonly string[],
  headerName: string,
): number {
  let count = 0;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    if (rawHeaders[i]?.toLowerCase() === headerName) {
      count += 1;
    }
  }
  return count;
}

function assertOptionalStringArray(
  value: unknown,
  fieldName: string,
): readonly string[] {
  if (value === undefined) {
    return [];
  }
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
  for (const [index, item] of value.entries()) {
    if (typeof item !== "string") {
      throw new Error(`${fieldName}[${index}] must be a string`);
    }
  }
  if (value.length % 2 !== 0) {
    throw new Error(`${fieldName} must contain header name/value pairs`);
  }
  return value;
}
