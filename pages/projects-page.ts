import {BasePage} from "./base-page";
import {expect, Page} from "@playwright/test";
import {randomString} from "./signup-page";

const locators = {
    newProjectButton : 'text=adding a project', //'.efuNYJ.sc-bdnxRM',
    addProjectOverlay : 'div#addproject .modal-content',
    projectName : 'input#project-name',
    createProject : 'a#project-add',
    projectsLandingPage : 'div.sc-jJMGnK',
    addKeysSection : '.fSCyFf.sc-carFqZ > div:nth-of-type(3)',
    addKeyButton : '.sc-bdnxRM.add-key-trigger',
    keyEditorOverlay: 'div#addkey  .modal-content',
};

export class ProjectsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    createProject = async () => {
        await this.createNewProject();
        await this.enterProjectDetails();
    };

    private createNewProject = async () => {
        await this.click(locators.newProjectButton);
        await this.waitForElement(locators.addProjectOverlay);
    };

    private enterProjectDetails = async () => {
        let projectName = 'Project '+randomString();
        await this.type(locators.projectName, projectName);
        await this.click(locators.createProject);
    };

    expectProjectLandingPage = async () => {
        await this.waitForElement(locators.projectsLandingPage);
    };
}