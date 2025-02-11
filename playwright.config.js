import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ["html", { outputFolder: "custom-report", open: "on-failure" }],
    ["json", { outputFile: "report.json" }],
    ["allure-playwright"],
  ],
  timeout: 60000, // Global timeout for each test
  expect: {
    timeout: 10000, // Timeout for expect assertions
  },
  use: {
    trace: "on-first-retry",
    headless: true,
    actionTimeout: 10000, // Timeout for each action (e.g., click, fill)
    navigationTimeout: 30000, // Timeout for navigation actions
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
