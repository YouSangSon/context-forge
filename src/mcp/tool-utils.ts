import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import os from "node:os";
import type { AddMemoryInput, ScopeType } from "../types.js";

export const SUPPORTED_MEMORY_KINDS = ["decision", "summary", "fact"] as const;
export const SUPPORTED_DURABILITY_VALUES = [
  "ephemeral",
  "durable",
  "archived",
] as const;
export const SUPPORTED_SCOPE_TYPES = ["project", "user"] as const;
export const SUPPORTED_GOAL_RUN_OUTCOMES = [
  "success",
  "failure",
  "partial",
] as const;
export const SUPPORTED_GOAL_RUN_STATUSES = [
  "active",
  "completed",
  "abandoned",
] as const;
export const POSTGRES_INTEGER_MIN = -2147483648;
export const POSTGRES_INTEGER_MAX = 2147483647;

export function formatMemoryIdentifier(record: {
  scopeType: string;
  scopeId: string;
  id: number;
}): string {
  assertFormatMemoryIdentifierRecord(record);
  return `${record.scopeType}:${record.scopeId}:${record.id}`;
}

export function requireProjectKey(
  projectKey: unknown,
  scope: ScopeType,
): string {
  if (projectKey === undefined) {
    throw new Error(
      `projectKey is required for ${scope} scope operations and must contain non-whitespace text`,
    );
  }
  if (typeof projectKey !== "string") {
    throw new Error("projectKey must be a string");
  }
  const normalized = projectKey.trim();
  if (normalized.length === 0) {
    throw new Error(
      `projectKey is required for ${scope} scope operations and must contain non-whitespace text`,
    );
  }

  return normalized;
}

export function requireUserScopeId(userScopeId: unknown): string {
  if (userScopeId === undefined) {
    throw new Error("userScopeId could not be resolved to non-whitespace text");
  }
  if (typeof userScopeId !== "string") {
    throw new Error("userScopeId must be a string");
  }
  const normalized = userScopeId.trim();
  if (normalized.length === 0) {
    throw new Error("userScopeId could not be resolved to non-whitespace text");
  }

  return normalized;
}

export function normalizeLimit(limit: number | undefined): number {
  if (limit === undefined) {
    return 10;
  }
  if (typeof limit !== "number") {
    throw new Error("limit must be a number");
  }
  if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
    throw new Error("limit must be a positive integer up to 100");
  }
  return limit;
}

export function optionalNonBlankText(
  value: string | null | undefined,
  fieldName = "value",
): string | null {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }
  const normalized = value.trim();
  return normalized.length === 0 ? null : normalized;
}

export function assertPositiveIntegerArray(
  values: readonly number[] | undefined,
  fieldName: string,
): void {
  if (values === undefined) {
    return;
  }
  if (!Array.isArray(values)) {
    throw new Error(`${fieldName} must be an array`);
  }
  for (const value of values) {
    assertPositiveInteger(value, fieldName);
  }
}

export function assertPositiveInteger(value: number, fieldName: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive safe integer`);
  }
}

export function assertOptionalPositiveInteger(
  value: number | undefined,
  fieldName: string,
  max?: number,
): void {
  if (value === undefined) {
    return;
  }
  assertPositiveInteger(value, fieldName);
  if (max !== undefined && value > max) {
    throw new Error(`${fieldName} must be at most ${max}`);
  }
}

export function assertOptionalPostgresInteger(
  value: number | undefined,
  fieldName: string,
): void {
  if (value === undefined) {
    return;
  }
  if (
    !Number.isInteger(value) ||
    value < POSTGRES_INTEGER_MIN ||
    value > POSTGRES_INTEGER_MAX
  ) {
    throw new Error(`${fieldName} must be a Postgres integer`);
  }
}

export function assertOptionalAllowedValue(
  value: string | undefined,
  fieldName: string,
  allowedValues: readonly string[],
): void {
  if (value === undefined) {
    return;
  }
  if (!allowedValues.includes(value)) {
    throw new Error(
      `${fieldName} must be one of: ${allowedValues.join(", ")}`,
    );
  }
}

export function assertAllowedValue(
  value: string | undefined,
  fieldName: string,
  allowedValues: readonly string[],
): void {
  if (value === undefined || !allowedValues.includes(value)) {
    throw new Error(
      `${fieldName} must be one of: ${allowedValues.join(", ")}`,
    );
  }
}

export function assertOptionalNonNegativeFiniteNumber(
  value: number | undefined,
  fieldName: string,
): void {
  if (value === undefined) {
    return;
  }
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${fieldName} must be a non-negative finite number`);
  }
}

export function assertOptionalPositiveFiniteNumber(
  value: number | undefined,
  fieldName: string,
  max?: number,
): void {
  if (value === undefined) {
    return;
  }
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive finite number`);
  }
  if (max !== undefined && value > max) {
    throw new Error(`${fieldName} must be at most ${max}`);
  }
}

export function assertProvidedScopeIdentifiers(input: {
  projectKey?: string;
  userScopeId?: string;
}): void {
  if (input.projectKey !== undefined) {
    requireProjectKey(input.projectKey, "project");
  }
  if (input.userScopeId !== undefined) {
    requireUserScopeId(input.userScopeId);
  }
}

export function ensureGovernanceCanonicalMode(hasOverrides: boolean): void {
  if (hasOverrides) {
    throw new Error(
      "memory governance tools require canonical services (Postgres + vector index); " +
        "legacy repository or retrieval overrides are not supported.",
    );
  }
}

export function toMemoryType(kind: string): AddMemoryInput["memoryType"] {
  if (typeof kind !== "string") {
    throw new Error("memory kind must be a string");
  }

  switch (kind) {
    case "decision":
    case "summary":
    case "fact":
      return kind;
    default:
      throw new Error(`Unsupported memory kind: ${kind}`);
  }
}

export function summarize(content: string): string {
  if (typeof content !== "string") {
    throw new Error("content must be a string");
  }

  return content.slice(0, 80);
}

export type ResolveUserScopeIdInput = {
  cwd: string;
  explicitUserScopeId?: string;
  defaultUserScopeId?: string;
};

export function resolveUserScopeId(input: ResolveUserScopeIdInput): string {
  assertResolveUserScopeIdInput(input);

  if (input.explicitUserScopeId !== undefined) {
    return requireUserScopeId(input.explicitUserScopeId);
  }

  if (input.defaultUserScopeId !== undefined) {
    return requireUserScopeId(input.defaultUserScopeId);
  }

  if (process.env.DEVELOPER_MEMORY_USER_ID !== undefined) {
    const configuredUserId = process.env.DEVELOPER_MEMORY_USER_ID.trim();
    if (configuredUserId.length === 0) {
      throw new Error(
        "DEVELOPER_MEMORY_USER_ID must contain non-whitespace text",
      );
    }
    return configuredUserId;
  }

  const gitEmail = readGitEmail(input.cwd);

  if (gitEmail) {
    return `git-${createHash("sha256").update(gitEmail).digest("hex").slice(0, 12)}`;
  }

  return `local-${sanitizeScopeId(os.userInfo().username)}`;
}

function assertResolveUserScopeIdInput(
  input: unknown,
): asserts input is ResolveUserScopeIdInput {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new Error("resolveUserScopeId input must be an object");
  }

  const candidate = input as Record<string, unknown>;
  assertNonBlankString(candidate.cwd, "cwd");
  assertOptionalString(candidate.explicitUserScopeId, "explicitUserScopeId");
  assertOptionalString(candidate.defaultUserScopeId, "defaultUserScopeId");
}

function assertFormatMemoryIdentifierRecord(record: unknown): void {
  if (typeof record !== "object" || record === null || Array.isArray(record)) {
    throw new Error("memory identifier record must be an object");
  }

  const candidate = record as Record<string, unknown>;
  assertNonBlankString(candidate.scopeType, "scopeType");
  assertNonBlankString(candidate.scopeId, "scopeId");
  assertPositiveSafeInteger(candidate.id, "id");
}

function assertPositiveSafeInteger(value: unknown, fieldName: string): void {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive safe integer`);
  }
}

function assertNonBlankString(value: unknown, fieldName: string): void {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }
  if (value.trim().length === 0) {
    throw new Error(`${fieldName} must contain non-whitespace text`);
  }
}

function assertOptionalString(value: unknown, fieldName: string): void {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }
}

function readGitEmail(cwd: string): string | null {
  try {
    return execFileSync("git", ["config", "user.email"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (_err: unknown) {
    return null;
  }
}

function sanitizeScopeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]+/g, "-");
}
