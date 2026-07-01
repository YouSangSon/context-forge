export function toIsoString(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}

export function toNumber(value: number | string): number {
  return typeof value === "number" ? value : Number(value);
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
