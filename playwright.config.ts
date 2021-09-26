import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from 'playwright';
import { DOMAIN, PROTOCOL } from './src/utils/constants';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: getBaseURLForEnvironment(process.env.ENVIRONMENT),
    headless: process.env.HEADLESS == 'true',
    ignoreHTTPSErrors: true,
    viewport: { width: 1500, height: 730 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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

function getBaseURLForEnvironment(environment: unknown) {
  switch (environment) {
    case 'STAGE':
      return PROTOCOL + `://stage` + DOMAIN;
    default:
      throw new Error('Environment not available or not configured');
  }
}
export default config;
