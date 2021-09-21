import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from 'playwright';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://stage.lokalise.com/',
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1500, height: 730 },
    screenshot: 'only-on-failure',
  },
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
