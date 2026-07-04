export type TextChunk = {
  chunkIndex: number;
  content: string;
  startOffset: number;
  endOffset: number;
};

export type ChunkTextInput = {
  text: string;
  targetTokens: number;
  overlapTokens: number;
};

type TokenSpan = {
  startOffset: number;
  endOffset: number;
};

function assertChunkTextInput(input: unknown): asserts input is ChunkTextInput {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new Error("chunkText input must be an object");
  }

  const candidate = input as Record<string, unknown>;

  if (typeof candidate.text !== "string") {
    throw new Error("text must be a string");
  }

  if (
    typeof candidate.targetTokens !== "number" ||
    !Number.isSafeInteger(candidate.targetTokens)
  ) {
    throw new Error("targetTokens must be a positive safe integer");
  }

  if (candidate.targetTokens < 1) {
    throw new Error("targetTokens must be greater than 0");
  }

  if (
    typeof candidate.overlapTokens !== "number" ||
    !Number.isSafeInteger(candidate.overlapTokens) ||
    candidate.overlapTokens < 0
  ) {
    throw new Error("overlapTokens must be a non-negative safe integer");
  }

  if (candidate.overlapTokens >= candidate.targetTokens) {
    throw new Error("overlapTokens must be smaller than targetTokens");
  }
}

export function chunkText(input: ChunkTextInput): TextChunk[] {
  assertChunkTextInput(input);

  const { overlapTokens, targetTokens, text } = input;
  const step = targetTokens - overlapTokens;
  const tokenSpans: TokenSpan[] = [];
  const chunks: TextChunk[] = [];
  let chunkIndex = 0;
  let emittedChunk = false;
  let sawTokenAfterLastEmit = false;

  for (const match of text.matchAll(/\S+/g)) {
    if (match.index === undefined) {
      throw new Error("Unable to resolve chunk token offsets");
    }

    if (emittedChunk) {
      sawTokenAfterLastEmit = true;
    }
    tokenSpans.push({
      startOffset: match.index,
      endOffset: match.index + match[0].length,
    });

    if (tokenSpans.length === targetTokens) {
      pushChunk(chunks, text, tokenSpans, chunkIndex);
      chunkIndex += 1;
      emittedChunk = true;
      sawTokenAfterLastEmit = false;
      tokenSpans.splice(0, step);
    }
  }

  if (tokenSpans.length > 0 && (!emittedChunk || sawTokenAfterLastEmit)) {
    pushChunk(chunks, text, tokenSpans, chunkIndex);
  }

  return chunks;
}

function pushChunk(
  chunks: TextChunk[],
  text: string,
  tokenSpans: readonly TokenSpan[],
  chunkIndex: number,
): void {
  const startSpan = tokenSpans[0];
  const endSpan = tokenSpans[tokenSpans.length - 1];
  if (startSpan === undefined || endSpan === undefined) {
    throw new Error("Unable to resolve chunk token offsets");
  }

  chunks.push({
    chunkIndex,
    content: text.slice(startSpan.startOffset, endSpan.endOffset),
    startOffset: startSpan.startOffset,
    endOffset: endSpan.endOffset,
  });
}
