import { QdrantClient } from "@qdrant/js-client-rest";

export type CreateQdrantClientInput = {
  url: string;
  apiKey: string;
};

export function createQdrantClient(input: CreateQdrantClientInput) {
  assertCreateQdrantClientInput(input);

  return new QdrantClient({
    url: input.url.trim(),
    apiKey: input.apiKey.trim(),
  });
}

function assertCreateQdrantClientInput(
  value: unknown,
): asserts value is CreateQdrantClientInput {
  const candidate = assertObject(value, "qdrant client input");
  assertNonBlankText(candidate.url, "url");
  assertAbsoluteHttpUrl(candidate.url, "url");
  assertNonBlankText(candidate.apiKey, "apiKey");
}

function assertAbsoluteHttpUrl(value: string, fieldName: string): void {
  let parsed: URL;
  try {
    parsed = new URL(value.trim());
  } catch (_err: unknown) {
    throw new Error(`${fieldName} must be an absolute HTTP(S) URL`);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`${fieldName} must be an absolute HTTP(S) URL`);
  }
}

function assertObject(
  value: unknown,
  fieldName: string,
): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${fieldName} must be an object`);
  }
  return value as Record<string, unknown>;
}

function assertNonBlankText(
  value: unknown,
  fieldName: string,
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }
  if (value.trim().length === 0) {
    throw new Error(`${fieldName} must contain non-whitespace text`);
  }
}
