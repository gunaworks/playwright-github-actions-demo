import LoginPage from '../pages/loginPage';
import KeysPage from '../pages/keysPage';
import ProjectsPage from '../pages/projectsPage';

import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{
  loginPage: LoginPage;
  keysPage: KeysPage;
  projectsPage: ProjectsPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  keysPage: async ({ page }, use) => {
    await use(new KeysPage(page));
  },
  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },
});
export default test;