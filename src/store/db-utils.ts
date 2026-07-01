export function toIsoString(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}

export function toNumber(value: unknown): number {
  if (typeof value !== "number" && typeof value !== "string") {
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
