import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "@/app/not-found";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  PREVIEW_ROUTE_ROBOTS,
  rootMetadata,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

describe("portfolio metadata", () => {
  it("uses the production URL and honest portfolio-preview sharing copy", () => {
    expect(rootMetadata.metadataBase.toString()).toBe(`${SITE_URL}/`);
    expect(rootMetadata.description).toBe(SITE_DESCRIPTION);
    expect(rootMetadata.openGraph.title).toContain("Portfolio Preview");
    expect(rootMetadata.twitter.card).toBe("summary_large_image");
  });

  it("keeps preview entity routes out of discovery", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;

    expect(rules?.disallow).toEqual(
      expect.arrayContaining(["/profile", "/posts/", "/users/"]),
    );
    expect(PREVIEW_ROUTE_ROBOTS).toEqual({ index: false, follow: false });
    expect(sitemap()).toEqual([
      expect.objectContaining({ url: SITE_URL }),
    ]);
  });
});

describe("global not-found page", () => {
  it("offers keyboard-accessible routes back to public portfolio pages", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { name: /page could not be found/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /go to timeline/i }).getAttribute("href"),
    ).toBe("/");
    expect(
      screen.getByRole("link", { name: /search profiles/i }).getAttribute("href"),
    ).toBe("/search");
  });
});
