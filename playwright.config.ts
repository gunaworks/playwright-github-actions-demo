import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from 'playwright';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://stage.lokalise.com/',
    headless: false,
    ignoreHTTPSErrors: true,
    viewport: { width: 1500, height: 730 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
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
    {
      name: 'Edge',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Edge'],
      },
    },
  ],
};
export default config;
