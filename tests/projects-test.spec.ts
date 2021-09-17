import { Page, test } from "@playwright/test";
import { ProjectsPage } from "../pages/projectsPage";
import { LoginPage } from "../pages/loginPage";
import { KeysPage } from "../pages/keysPage";
import { createProject, deleteProjects } from "../utils/projectUtils";

let page: Page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  let loginPage = new LoginPage(page);
  await loginPage.login();
});

test.describe(`Projects test - Create first empty project for the user`, () => {
  test("Test", async () => {
    let projectPage = new ProjectsPage(page);
    await projectPage.createProject();
    await projectPage.verifyProjectLandingPage();
    await projectPage.verifyProjectTitle();
    await projectPage.verifyNumberOfProjectTileInProjectsPage(1);
  });
  test.afterEach(async () => {
    await deleteProjects();
  });
});

test.describe(
  `Projects test - Add plain key and translation in the project for the user`,
  () => {
    test.beforeEach(async () => {
      await createProject();
    });

    test(`Add plain key and translation for the key`, async () => {
      let keyPage = new KeysPage(page);
      let projectPage = new ProjectsPage(page);
      await projectPage.selectProject();
      await keyPage.clickAddKey();
      await keyPage.enterInitialKeyDetails();
      await keyPage.saveKey();
    });
    test.afterEach(async () => {
      await deleteProjects();
    });
  }
);

test.describe(
  `Projects test - Add plural key and translation in the project for the user`,
  () => {
    test.beforeEach(async () => {
      await createProject();
    });

    test(`Add plural key and translation for the key`, async () => {
      let keyPage = new KeysPage(page);
      let projectPage = new ProjectsPage(page);
      await projectPage.selectProject();
      await keyPage.clickAddKey();
      await keyPage.enterInitialKeyDetails();
      // await keyPage.enterPluralKeyDetails()
      await keyPage.saveKey();
    });

    test.afterEach(async () => {
      await deleteProjects();
    });
  }
);
