import { test } from "@playwright/test";
import { ProjectsPage } from "../pages/projects-page";
import { LoginPage } from "../pages/login-page";

test.describe(`Projects test`, () => {
  test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.login();
  });

  test(`Add first project for the user`, async ({ page }) => {
    let projectPage = new ProjectsPage(page);
    await projectPage.createProject();
    await projectPage.verifyProjectLandingPage();
  });
});
