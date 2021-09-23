import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from 'playwright';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: process.env.BASE_URL,
    headless: (process.env.HEADLESS == "true"),
    ignoreHTTPSErrors: true,
    viewport: { width: 1500, height: 730 },
    screenshot: 'only-on-failure',
  },
  timeout: 60000,
  workers: 1,
  reporter: [['dot'], ['allure-playwright']],
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
      },
    },
  ],
};
export default config;
