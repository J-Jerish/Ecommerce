import { defineConfig } from '@playwright/test';
import * as os from 'os';
import * as path from 'path';

export default defineConfig({
  testDir: './tests',

  // Store trace/screenshot/video artifacts outside OneDrive to prevent sync conflicts
  outputDir: path.join(os.homedir(), 'playwright-results'),

  // Run spec files in numerical order, one at a time
  workers: 1,

  // Retry flaky tests twice on CI, never locally
  retries: process.env.CI ? 2 : 0,

  // Prevent test.only() from accidentally shipping in CI
  forbidOnly: !!process.env.CI,

  timeout: 90000,
  expect: { timeout: 10000 },

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://demowebshop.tricentis.com',
    browserName: 'chromium',
    headless: !!process.env.CI,   // headed locally, headless in CI
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});
