import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/**", async (route) => {
    await route.abort("blockedbyclient");
  });
});

test("Timeline loads in isolated preview mode", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Sociality timeline" })).toBeAttached();
  await expect(page.getByText("Portfolio preview", { exact: true })).toBeVisible();
  await expect(page.getByText("Sample content only. Protected actions are disabled.")).toBeVisible();
});

test("Search finds a preview user and opens their profile", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Search preview profiles" }).click();
  await expect(page).toHaveURL(/\/search$/);
  const searchbox = page.getByRole("searchbox");
  await searchbox.pressSequentially("Maya", { delay: 25 });
  await page.getByRole("link", { name: /Maya Chen/i }).click();

  await expect(page).toHaveURL(/\/users\/mayachen$/);
  await expect(page.getByRole("heading", { name: "Maya Chen" })).toBeVisible();
  await expect(page.getByText("Sample profile content — not authenticated account data.")).toBeVisible();
});

test("Login and Register navigation works", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Register" }).click();
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();

  await page.getByRole("link", { name: "Log in" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Welcome Back!" })).toBeVisible();
});

test("Post detail opens from Timeline", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /View 20 comments/i }).click();

  await expect(page).toHaveURL(/\/posts\/preview-kids$/);
  await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();
  await expect(page.getByText("Preview data", { exact: true })).toBeVisible();
});

test("Friends Profile gallery opens its matching Post Detail", async ({ page }) => {
  await page.goto("/users/johndoe");
  await page
    .getByRole("link", {
      name: "Open preview post: Friends smiling together for a close-up selfie",
    })
    .click();

  await expect(page).toHaveURL(/\/posts\/preview-kids$/);
  await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();
});

test("Protected preview actions explain limitations without API mutations", async ({ page }) => {
  const apiRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/api/")) {
      apiRequests.push(request.url());
    }
  });

  await page.goto("/");
  await expect(
    page.getByRole("button", { name: /Like; login required/i }).first(),
  ).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByText("Sample content only. Protected actions are disabled.")).toBeVisible();

  await page.getByRole("link", { name: "Open the preview post composer" }).click();
  await expect(page).toHaveURL(/\/posts\/new$/);
  await expect(page.getByRole("button", { name: "Share", exact: true })).toBeDisabled();
  await expect(page.getByText("Posting is disabled until a secure authenticated session is available.", { exact: false })).toBeVisible();
  expect(apiRequests).toEqual([]);
});
