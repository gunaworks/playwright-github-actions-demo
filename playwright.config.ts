import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from 'playwright';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://stage.lokalise.com',
    browserName: 'firefox',
    headless: true,
  },
  reporter: [["allure-playwright"]],
  projects: [
    {
      name: 'Chrome browser',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
  ],
};
export default config;
