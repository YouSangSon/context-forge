const DATABASE_TIMESTAMP_PATTERN =
  /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}(?::?\d{2})?)$/;

export function toIsoString(value: string | Date): string {
  if (value instanceof Date) {
    assertValidTimestamp(value);
    return value.toISOString();
  }

  if (typeof value !== "string") {
    throw new Error("database timestamp must be a valid timestamp");
  }

  const normalized = value.trim();
  if (
    normalized.length === 0 ||
    !DATABASE_TIMESTAMP_PATTERN.test(normalized)
  ) {
    throw new Error("database timestamp must be a valid timestamp");
  }

  const parsed = new Date(normalized);
  assertValidTimestamp(parsed);
  return parsed.toISOString();
}

function assertValidTimestamp(value: Date): void {
  if (!Number.isFinite(value.getTime())) {
    throw new Error("database timestamp must be a valid timestamp");
  }
}

export function toNumber(value: unknown): number {
  if (typeof value !== "number" && typeof value !== "string") {
    throw new Error("database number must be finite");
  }

  if (
    typeof value === "string" &&
    !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value)
  ) {
    throw new Error("database number must be finite");
  }

  const numberValue = typeof value === "number" ? value : Number(value);
  if (
    !Number.isFinite(numberValue) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    throw new Error("database number must be finite");
  }
  return numberValue;
}

export function requireSingleRow<TRow>(
  row: TRow | undefined,
  label: string,
): TRow {
  if (!row) {
    throw new Error(`Expected ${label} row to be returned`);
  }

  return row;
}
