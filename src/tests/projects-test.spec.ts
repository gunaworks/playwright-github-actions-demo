import test, {expect} from '../fixtures/baseFixture'
import {
  createKey,
  createProject,
  deleteProjects,
} from '../utils/projectUtils';
import { KeyType } from '../utils/constants';

test.describe('Projects test - Create first empty project for the user', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login();
  });
  test('Test', async ({ projectsPage }) => {
    await projectsPage.createFirstProject();
    await projectsPage.verifyProjectLandingPage();
    await projectsPage.verifyProjectTitle();
    await projectsPage.verifyNumberOfProjectsInProjectsPage(1);
  });
});

test.describe('Projects test - Add nth project for the user', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login();
    await createProject();
  });
  test('Add nth project', async ({ projectsPage }) => {
    await projectsPage.createNthProject();
    await projectsPage.verifyProjectTitle();
    await projectsPage.verifyNumberOfProjectsInProjectsPage(2);
  });
});

test.describe(
  'Projects test - Add plain key in the project for the user',
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.login();
      await createProject();
    });
    test('Add plain key to the project', async ({ keysPage, projectsPage }) => {
      await projectsPage.selectProject();
      await keysPage.addKey();
      await keysPage.enterKeyDetails();
      await keysPage.saveKey();
      await keysPage.verifyKeyInProjectsPage();
    });
  }
);

test.describe(
  'Keys test - Add translation for the plain key in the project for the user',
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.login();
      await createProject();
      await createKey(KeyType.PLAIN_KEY);
    });
    test('Add translation to the plain key', async ({ keysPage, projectsPage }) => {
      await projectsPage.selectProject();
      await keysPage.addTranslation();
      await keysPage.verifyCompletionOfKeyTranslation();
    });
  }
);

test.describe(
  'Keys test - Add translation for the plural key in the project for the user',
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.login();
      await createProject();
      await createKey(KeyType.PLURAL_KEY);
    });
    test('Add translation to the plural key', async ({ keysPage, projectsPage }) => {
      await projectsPage.selectProject();
      await keysPage.addTranslation();
      await keysPage.verifyCompletionOfKeyTranslation();
    });
  }
);

test.afterEach(async () => {
  await deleteProjects();
});
