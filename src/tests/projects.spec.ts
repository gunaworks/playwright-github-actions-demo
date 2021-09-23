import test from '../fixtures/baseFixture';
import {
  createKey,
  createProject,
  deleteProjects,
} from '../utils/projectUtils';
import { KeyType, ONE, TWO } from '../utils/constants';

test.describe('Projects test - Add first project for the user', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Login to the application', async () => {
      await loginPage.login();
    });
  });
  test('Add first project for the user', async ({ projectsPage }) => {
    await test.step('Create first empty project for the user', async () => {
      await projectsPage.createFirstProject();
    });
    await test.step('Verify the landing page of the project', async () => {
      await projectsPage.verifyProjectLandingPage();
    });
    await test.step(
      'Verify the title of the project after creation',
      async () => {
        await projectsPage.verifyProjectTitle();
      }
    );
    await test.step(
      'Verify the number of projects in the projects page',
      async () => {
        await projectsPage.verifyNumberOfProjectsInProjectsPage(ONE);
      }
    );
  });
});

test.describe('Projects test - Add nth project for the user', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Login to the application', async () => {
      await loginPage.login();
    });
    await test.step('Create first project for the user', async () => {
      await createProject();
    });
  });
  test('Add nth project for the user', async ({ projectsPage }) => {
    await test.step('Create nth project for the user', async () => {
      await projectsPage.createNthProject();
    });
    await test.step(
      'Verify the title of the project after creation',
      async () => {
        await projectsPage.verifyProjectTitle();
      }
    );
    await test.step(
      'Verify the number of projects in the projects page',
      async () => {
        await projectsPage.verifyNumberOfProjectsInProjectsPage(TWO);
      }
    );
  });
});

test.describe(
  'Projects test - Add plain key in the project for the user',
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await test.step('Login to the application', async () => {
        await loginPage.login();
      });
      await test.step('Create first project for the user', async () => {
        await createProject();
      });
    });
    test('Add plain key to the project', async ({ keysPage, projectsPage }) => {
      await test.step('Select the project', async () => {
        await projectsPage.selectProject();
      });
      await test.step('Create a plain key for the project', async () => {
        await keysPage.addPlainKey();
      });
      await test.step(
        "Verify the created key in the project's page",
        async () => {
          await keysPage.verifyKeyInProjectsPage();
        }
      );
    });
  }
);

test.describe(
  'Keys test - Add translation for the plain key in the project for the user',
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await test.step('Login to the application', async () => {
        await loginPage.login();
      });
      await test.step('Create first project for the user', async () => {
        await createProject();
      });
      await test.step('Create a plain key for the project', async () => {
        await createKey(KeyType.PLAIN_KEY);
      });
    });
    test('Add translation to the plain key', async ({
      keysPage,
      projectsPage,
    }) => {
      await test.step('Select the project', async () => {
        await projectsPage.selectProject();
      });
      await test.step('Add translation for the created key', async () => {
        await keysPage.addTranslation();
      });
      await test.step(
        'Verify the completion of translation for the key',
        async () => {
          await keysPage.verifyCompletionOfKeyTranslation();
        }
      );
    });
  }
);

test.describe(
  'Keys test - Add translation for the plural key in the project for the user',
  () => {
    test.beforeEach(async ({ loginPage }) => {
      await test.step('Login to the application', async () => {
        await loginPage.login();
      });
      await test.step('Create first project for the user', async () => {
        await createProject();
      });
      await test.step('Create a plural key for the project', async () => {
        await createKey(KeyType.PLURAL_KEY);
      });
    });
    test('Add translation to the plural key', async ({
      keysPage,
      projectsPage,
    }) => {
      await test.step('Select the project', async () => {
        await projectsPage.selectProject();
      });
      await test.step('Add translation for the created key', async () => {
        await keysPage.addTranslation();
      });
      await test.step(
        'Verify the completion of translation for the key',
        async () => {
          await keysPage.verifyCompletionOfKeyTranslation();
        }
      );
    });
  }
);

test.afterEach(async () => {
  await test.step('Delete the projects for the user', async () => {
    await deleteProjects();
  });
});
