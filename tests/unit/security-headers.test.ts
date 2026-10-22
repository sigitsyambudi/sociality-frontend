import { describe, expect, it } from "vitest";
import nextConfig, { securityHeaders } from "../../next.config";

const configuredHeaders = Object.fromEntries(
  securityHeaders.map(({ key, value }) => [key, value]),
);

describe("Next.js security headers", () => {
  it("removes the framework identification header", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("sets the verified baseline headers", () => {
    expect(configuredHeaders).toEqual({
      "Permissions-Policy":
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff",
    });
  });

  it("applies the baseline to every route without an unverified CSP", async () => {
    const routeHeaders = await nextConfig.headers?.();

    expect(routeHeaders).toEqual([
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]);
    expect(configuredHeaders).not.toHaveProperty("Content-Security-Policy");
  });
});
