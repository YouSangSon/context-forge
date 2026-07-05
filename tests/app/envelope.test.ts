import type { ServerResponse } from "node:http";
import { describe, expect, it, vi } from "vitest";
import { sendError, sendOk } from "../../src/app/middleware/envelope.js";

function makeResponse(): ServerResponse {
  return {
    writeHead: vi.fn(),
    end: vi.fn(),
  } as unknown as ServerResponse;
}

describe("JSON HTTP response envelope", () => {
  it("writes the stable success envelope shape and field order", () => {
    const res = makeResponse();

    sendOk(res, 200, { ok: true });

    expect(res.writeHead).toHaveBeenCalledWith(200, {
      "content-type": "application/json",
    });
    expect(res.end).toHaveBeenCalledWith('{"success":true,"data":{"ok":true}}');
  });

  it("writes the stable failure envelope shape and field order", () => {
    const res = makeResponse();

    sendError(res, 400, "bad request");

    expect(res.writeHead).toHaveBeenCalledWith(400, {
      "content-type": "application/json",
    });
    expect(res.end).toHaveBeenCalledWith(
      '{"success":false,"error":{"message":"bad request"}}',
    );
  });
});
