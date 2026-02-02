
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: `./config/${process.env.ENV || 'qa'}.env`,
});

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
    workers: 1,
  // fullyParallel: true,
  retries: 2, // Retry failed tests twice for stability
  reporter: [['html', { open: 'never' }]],
  
  use: {
    baseURL: process.env.BASE_URL,
    headless:true,
    screenshot:'only-on-failure', // Capture screenshots on failure
    video: 'retain-on-failure', // Capture video on failure
    trace: 'on-first-retry', // Capture trace on first retry
    storageState: undefined
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

