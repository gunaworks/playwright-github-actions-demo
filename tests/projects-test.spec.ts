import {test} from '@playwright/test';
import {ProjectsPage} from "../pages/projects-page";
import {SignupPage} from "../pages/signup-page";

test.describe(`Projects test`, () => {
    test.beforeEach(async ({page}) => {
        let signUpPage = new SignupPage(page);
        await signUpPage.signup();
    });

    test(`Add first project for the user`, async ({page}) => {
        let projectPage = new ProjectsPage(page);
        await projectPage.createProject();
        await projectPage.expectProjectLandingPage();
    })
});