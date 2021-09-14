import { test } from "@playwright/test";
import { ProjectsPage } from "../pages/projects-page";
import { LoginPage } from "../pages/login-page";
import { deleteProjects } from "../utils/project-utils";

test.describe(`Projects test`, () => {
  test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.login();
  });

  test(`Add first project for the user`, async ({ page }) => {
    let projectPage = new ProjectsPage(page);
    await test.step(`Create empty project`, async () => {
      await projectPage.createProject();
    });
    await test.step(`Verify landing page of the project`, async () => {
      await projectPage.verifyProjectLandingPage();
    });
    await test.step(
      `Verify project name in the project landing page`,
      async () => {
        await projectPage.verifyProjectTitle();
      }
    );
    await test.step(
      `Verify if there is only one project in the Projects page`,
      async () => {
        await projectPage.navigateTo("/project");
        await projectPage.verifyNumberOfProjectTile(1);
      }
    );
  });

  test.afterEach(async () => {
    await deleteProjects();
  });
});
