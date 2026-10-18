import { describe, expect, it, vi } from "vitest";
import {
  documentedImageMaxBytes,
  loginRequestSchema,
  postImageMetadataSchema,
  registerRequestSchema,
} from "@/api/contracts";
import { ApiClient } from "@/api/client";

describe("documented API request contracts", () => {
  it("keeps login and registration payloads strict", () => {
    expect(
      loginRequestSchema.safeParse({
        email: "person@example.com",
        password: "secret123",
        token: "not-a-request-field",
      }).success,
    ).toBe(false);

    expect(
      registerRequestSchema.safeParse({
        confirmPassword: "secret123",
        email: "person@example.com",
        name: "Person",
        password: "secret123",
        username: "person",
      }).success,
    ).toBe(false);
  });

  it("validates documented post image metadata", () => {
    expect(
      postImageMetadataSchema.safeParse({
        size: documentedImageMaxBytes,
        type: "image/webp",
      }).success,
    ).toBe(true);
    expect(
      postImageMetadataSchema.safeParse({
        size: documentedImageMaxBytes + 1,
        type: "image/gif",
      }).success,
    ).toBe(false);
  });
});

describe("API client", () => {
  it("serializes JSON and injects Bearer authentication", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        headers: { "content-type": "application/json" },
        status: 200,
      }),
    );
    const client = new ApiClient({
      baseUrl: "https://api.example.test",
      fetcher,
      getAccessToken: () => "access-token",
    });

    await client.post("/api/example", { value: "hello" }, { authenticated: true });

    const [url, init] = fetcher.mock.calls[0];
    const headers = new Headers(init?.headers);
    expect(String(url)).toBe("https://api.example.test/api/example");
    expect(init?.method).toBe("POST");
    expect(init?.body).toBe(JSON.stringify({ value: "hello" }));
    expect(headers.get("Authorization")).toBe("Bearer access-token");
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("preserves browser FormData headers", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 204 }));
    const client = new ApiClient({ baseUrl: "https://api.example.test", fetcher });
    const body = new FormData();
    body.append("caption", "Preview");

    await client.post("/api/posts", body);

    const init = fetcher.mock.calls[0][1];
    expect(init?.body).toBe(body);
    expect(new Headers(init?.headers).has("Content-Type")).toBe(false);
  });

  it("normalizes API errors and runs the unauthorized callback", async () => {
    const onUnauthorized = vi.fn();
    const client = new ApiClient({
      baseUrl: "https://api.example.test",
      fetcher: vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify({ code: "SESSION_EXPIRED", message: "Please login again." }), {
          headers: { "content-type": "application/json" },
          status: 401,
          statusText: "Unauthorized",
        }),
      ),
      onUnauthorized,
    });

    await expect(client.get("/api/me")).rejects.toMatchObject({
      code: "SESSION_EXPIRED",
      message: "Please login again.",
      status: 401,
    });
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });

  it("normalizes network failures without exposing implementation details", async () => {
    const client = new ApiClient({
      baseUrl: "https://api.example.test",
      fetcher: vi.fn<typeof fetch>().mockRejectedValue(new TypeError("offline")),
    });

    await expect(client.get("/api/feed")).rejects.toMatchObject({
      code: "NETWORK_ERROR",
      message: "The API could not be reached.",
      status: 0,
    });
  });
});
