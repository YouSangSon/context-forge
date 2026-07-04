import { createHash, timingSafeEqual } from "node:crypto";

// Each configured token may bind to a single organization. Format:
//   "rawToken"             -> no binding (legacy: any org allowed)
//   "rawToken:dev-team"    -> bound to organization_id "dev-team"
//
// Tokens are configured via MEMORY_API_TOKENS as a comma-separated list:
//   MEMORY_API_TOKENS="alpha-token:dev-team,beta-token:finance-team,legacy-token"
// Multi-token support allows zero-downtime rotation: deploy with [old, new],
// rotate clients to new, then drop old in next deploy.
export type BearerToken = {
  token: string;
  organizationId?: string;
  authType?: "static" | "oauth";
  scopes?: readonly string[];
  subject?: string;
  issuer?: string;
  audience?: string | readonly string[];
};

export type OAuthTokenVerifier = {
  verify(token: string): Promise<BearerToken | null>;
};

export function loadBearerTokens(env: NodeJS.ProcessEnv): BearerToken[] {
  const raw = env.MEMORY_API_TOKENS;
  if (raw === undefined || raw === "") {
    return [];
  }
  const entries = raw.split(",").map((entry) => entry.trim());
  if (entries.some((entry) => entry.length === 0)) {
    throw new Error(
      "Invalid MEMORY_API_TOKENS entry: entries must not be blank",
    );
  }
  return entries.map(parseBearerEntry);
}

function parseBearerEntry(entry: string): BearerToken {
  const colonMatches = entry.match(/:/g) ?? [];
  if (colonMatches.length > 1) {
    throw new Error(
      "Invalid MEMORY_API_TOKENS entry: tokens may contain at most one colon",
    );
  }

  const colonIndex = entry.indexOf(":");
  if (colonIndex === -1) {
    const token = entry.trim();
    if (token.length === 0) {
      throw new Error("Invalid MEMORY_API_TOKENS entry: token is empty");
    }
    return { token };
  }

  const token = entry.slice(0, colonIndex).trim();
  const organizationId = entry.slice(colonIndex + 1).trim();

  if (token.length === 0) {
    throw new Error("Invalid MEMORY_API_TOKENS entry: token is empty");
  }
  if (organizationId.length === 0) {
    throw new Error(
      "Invalid MEMORY_API_TOKENS entry: organization id is empty",
    );
  }

  return { token, organizationId };
}

// Compare fixed-width token digests and scan the whole configured token list.
// This avoids leaking configured token length or match position through obvious
// early-exit timing differences while still returning the matched binding.
export function matchBearer(
  authHeader: string | undefined,
  tokens: readonly BearerToken[],
): BearerToken | null {
  if (tokens.length === 0) {
    return null;
  }
  const provided = extractBearerValue(authHeader);
  if (!provided) {
    return null;
  }

  const providedDigest = tokenDigest(provided);
  let matched: BearerToken | null = null;

  for (const entry of tokens) {
    const entryDigest = tokenDigest(entry.token);
    if (timingSafeEqual(entryDigest, providedDigest) && matched === null) {
      matched = entry;
    }
  }

  return matched;
}

export async function authenticateBearer(
  authHeader: string | undefined,
  tokens: readonly BearerToken[],
  oauthVerifier: OAuthTokenVerifier | null,
): Promise<BearerToken | null> {
  const staticMatch = matchBearer(authHeader, tokens);
  if (staticMatch) {
    return { ...staticMatch, authType: "static" };
  }

  const provided = extractBearerValue(authHeader);
  if (!provided || !oauthVerifier) {
    return null;
  }

  const oauthMatch = await oauthVerifier.verify(provided);
  return normalizeOAuthVerifierResult(oauthMatch, provided);
}

function normalizeOAuthVerifierResult(
  value: BearerToken | null,
  providedToken: string,
): BearerToken | null {
  if (value === null) {
    return null;
  }

  const candidate = assertObject(value, "OAuth verifier result");
  if (typeof candidate.token !== "string") {
    throw new Error("OAuth verifier result.token must be a string");
  }
  assertNonBlankString(candidate.token, "OAuth verifier result.token");

  const organizationId = candidate.organizationId;
  if (organizationId !== undefined && typeof organizationId !== "string") {
    throw new Error("OAuth verifier result.organizationId must be a string");
  }
  if (organizationId !== undefined) {
    assertNonBlankString(
      organizationId,
      "OAuth verifier result.organizationId",
    );
  }

  const scopes = candidate.scopes;
  if (scopes !== undefined) {
    if (!Array.isArray(scopes)) {
      throw new Error("OAuth verifier result.scopes must be an array");
    }
    for (const [index, scope] of scopes.entries()) {
      if (typeof scope !== "string") {
        throw new Error(`OAuth verifier result.scopes[${index}] must be a string`);
      }
    }
  }

  return {
    ...value,
    token: providedToken,
    authType: "oauth",
    ...(organizationId !== undefined
      ? { organizationId: organizationId.trim() }
      : {}),
  };
}

function extractBearerValue(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }
  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  const provided = authHeader.slice("Bearer ".length).trim();
  return provided.length > 0 ? provided : null;
}

function assertObject(value: unknown, fieldName: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${fieldName} must be an object`);
  }
  return value as Record<string, unknown>;
}

function assertNonBlankString(value: string, fieldName: string): void {
  if (value.trim().length === 0) {
    throw new Error(`${fieldName} must contain non-whitespace text`);
  }
}

function tokenDigest(token: string): Buffer {
  return createHash("sha256").update(token, "utf8").digest();
}
