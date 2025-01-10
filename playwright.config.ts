import { defineConfig, devices } from '@playwright/test';
const PORT = 3007;
process.env.PORT = PORT.toString();
const enhanced = process.env.PLAYWRIGHT_ENHANCED === 'true'
export default defineConfig({
  testDir: 'src/tests/postbuild/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 10 : 0,
  workers: 100,
  timeout: 120 * 1000,
  webServer: {
    command: `node src/tests/postbuild/server.js`,
    port: PORT,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
  reporter: 'list',
  use: {
    trace: enhanced ? 'on' : 'off',
    video: enhanced ? 'on' : 'off',
    screenshot: enhanced ? 'on' : 'off',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});