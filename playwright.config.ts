import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: {
    command: "npm run dev -- --hostname localhost --port 3000",
    env: {
      NEXT_PUBLIC_API_BASE_URL: "http://127.0.0.1:9",
    },
    reuseExistingServer: true,
    timeout: 120_000,
    url: "http://localhost:3000",
  },
});
