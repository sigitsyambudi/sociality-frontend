import path from "node:path";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const firstPreviewImage = path.join(
  process.cwd(),
  "public/images/timeline/preview-kids.webp",
);
const replacementPreviewImage = path.join(
  process.cwd(),
  "public/images/timeline/preview-landscape.webp",
);

function watchProtectedRequests(page: Page) {
  const requests: string[] = [];

  page.on("request", (request) => {
    const url = new URL(request.url());
    const isApiRequest = url.pathname.startsWith("/api/");
    const isMutation = !["GET", "HEAD", "OPTIONS"].includes(request.method());
    const hasAuthorization = Boolean(request.headers().authorization);

    if (isApiRequest && (isMutation || hasAuthorization)) {
      requests.push(`${request.method()} ${url.pathname}`);
    }
  });

  return requests;
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
}

async function expectGalleryClearsNavigation(page: Page) {
  const galleryItems = page.getByRole("list", { name: "Preview posts" }).locator("li");
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });

  await expect(galleryItems).toHaveCount(9);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  const lastItemBox = await galleryItems.last().boundingBox();
  const navigationBox = await navigation.boundingBox();

  expect(lastItemBox).not.toBeNull();
  expect(navigationBox).not.toBeNull();
  expect(lastItemBox!.y + lastItemBox!.height).toBeLessThanOrEqual(navigationBox!.y);
}

test.beforeEach(async ({ page }) => {
  await page.route("**/api/**", async (route) => {
    await route.abort("blockedbyclient");
  });
});

test("mobile Timeline fits the viewport and exposes primary navigation", async ({ page }) => {
  await page.goto("/");

  expect(page.viewportSize()).toEqual({ width: 393, height: 852 });
  await expect(page.getByRole("heading", { name: "Sociality timeline" })).toBeAttached();
  await expect(page.getByText("Portfolio preview", { exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("mobile Search finds a preview friend without horizontal overflow", async ({ page }) => {
  await page.goto("/search");

  const searchbox = page.getByRole("searchbox");
  await expect(searchbox).toBeVisible();
  await searchbox.fill("Maya");
  await page.getByRole("link", { name: /Maya Chen/i }).click();

  await expect(page).toHaveURL(/\/users\/mayachen$/);
  await expect(page.getByRole("heading", { name: "Maya Chen" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("mobile profile galleries clear the floating navigation", async ({ page }) => {
  for (const profile of [
    { heading: "John Doe", path: "/profile" },
    { heading: "Maya Chen", path: "/users/mayachen" },
  ]) {
    await page.goto(profile.path);
    await expect(page.getByRole("heading", { name: profile.heading })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await expectGalleryClearsNavigation(page);
  }
});

test("mobile Post Detail covers paginated, empty, and protected comment states", async ({ page }) => {
  const protectedRequests = watchProtectedRequests(page);

  await page.goto("/posts/preview-kids");
  await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Preview comments" }).locator("li")).toHaveCount(3);
  await page.getByRole("button", { name: "Load more preview comments" }).click();
  await expect(page.getByRole("list", { name: "Preview comments" }).locator("li")).toHaveCount(5);

  const comment = page.getByRole("textbox", { name: "Add a preview comment" });
  await comment.fill("   ");
  await comment.blur();
  await expect(page.locator("#preview-comment-error")).toHaveText(
    "Write a comment before posting.",
  );
  await expect(page.getByRole("button", { name: "Post", exact: true })).toBeDisabled();

  await page.getByRole("button", { name: /likes; login required/i }).click();
  await expect(page.getByRole("status")).toContainText("Liking a post is protected.");
  await expectNoHorizontalOverflow(page);
  expect(protectedRequests).toEqual([]);

  await page.goto("/posts/preview-concert");
  await expect(page.getByText("No comments yet", { exact: true })).toBeVisible();
  await expect(page.getByText("Start the conversation after logging in.")).toBeVisible();
});

test("mobile Create Post replaces and removes a local image without mutation", async ({ page }) => {
  const protectedRequests = watchProtectedRequests(page);

  await page.goto("/posts/new");
  await expect(page.getByRole("heading", { name: "Add Post" })).toBeVisible();
  const fileInput = page.locator('input[type="file"]');

  await fileInput.setInputFiles(firstPreviewImage);
  await expect(page.getByRole("img", { name: "Preview of preview-kids.webp" })).toBeVisible();

  await fileInput.setInputFiles(replacementPreviewImage);
  await expect(
    page.getByRole("img", { name: "Preview of preview-landscape.webp" }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Preview of preview-kids.webp" })).toHaveCount(0);

  await page.getByRole("button", { name: "Delete Image" }).click();
  await expect(page.getByRole("button", { name: "Click to upload" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Share", exact: true })).toBeDisabled();
  await expect(page.getByText("Posting is disabled until a secure authenticated session is available.", { exact: false })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  expect(protectedRequests).toEqual([]);
});

test("mobile not-found pages provide working recovery navigation", async ({ page }) => {
  await page.goto("/missing-portfolio-route");
  await expect(page.getByRole("heading", { name: "This page could not be found" })).toBeVisible();
  await page.getByRole("link", { name: "Search profiles" }).click();
  await expect(page).toHaveURL(/\/search$/);

  await page.goto("/users/not-a-preview-user");
  await expect(page.getByRole("heading", { name: "Profile not found" })).toBeVisible();
  await page.getByRole("link", { name: "Search preview profiles" }).click();
  await expect(page).toHaveURL(/\/search$/);

  await page.goto("/posts/not-a-preview-post");
  await expect(page.getByRole("heading", { name: "This post is not in the preview" })).toBeVisible();
  await page.getByRole("link", { name: "Return to Timeline" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expectNoHorizontalOverflow(page);
});
