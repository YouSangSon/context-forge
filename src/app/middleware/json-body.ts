import type { IncomingMessage } from "node:http";

const MAX_JSON_BODY_BYTES = 1_000_000; // 1 MB safety cap

export class JsonBodyError extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message);
  }
}

export async function readJsonBody(
  req: IncomingMessage,
  options: { oversizedStatus?: number } = {},
): Promise<unknown> {
  const chunks: Buffer[] = [];
  let total = 0;

  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buf.length;
    if (total > MAX_JSON_BODY_BYTES) {
      throw new JsonBodyError(
        "request body exceeds 1 MB",
        options.oversizedStatus ?? 400,
      );
    }
    chunks.push(buf);
  }

  if (chunks.length === 0) {
    return undefined;
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch (_err: unknown) {
    throw new JsonBodyError("invalid JSON body");
  }
}
