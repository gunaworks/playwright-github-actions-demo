import { BasePage } from "./base-page";
import { expect, Page } from "@playwright/test";

let projectName = "";
const faker = require("faker");
const locators = {
  newProjectButton: "text=adding a project", //'.efuNYJ.sc-bdnxRM',
  // newProjectButton: ".efuNYJ.sc-bdnxRM", //'.efuNYJ.sc-bdnxRM',
  addProjectOverlay: "div#addproject .modal-content",
  projectName: "input#project-name",
  createProject: "a#project-add",
  projectsLandingPage: "div.sc-jJMGnK",
  addKeysSection: ".fSCyFf.sc-carFqZ > div:nth-of-type(3)",
  addKeyButton: ".sc-bdnxRM.add-key-trigger",
  keyEditorOverlay: "div#addkey  .modal-content",
  userLandingPage: ".sc-dlMDgC", //'.jfZxKp.sc-bdnxRM',
  projectTitle: "a.project-title-wrapper",
  projectTile: "//div[@data-rbd-droppable-id='droppable']/div[*]",
};

export class ProjectsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  createProject = async () => {
    await this.validateProjectPage();
    await this.createNewProject();
    await this.enterProjectDetails();
  };

  private validateProjectPage = async () => {
    await this.waitForElement(locators.userLandingPage);
    await this.waitForUrl("/projects");
  };

  private createNewProject = async () => {
    await this.click(locators.newProjectButton);
    await this.waitForElement(locators.addProjectOverlay);
  };

  private enterProjectDetails = async () => {
    projectName = "Project " + faker.name.firstName();
    await this.type(locators.projectName, projectName);
    await this.waitForElement(locators.createProject);
    await this.click(locators.createProject);
  };

  verifyProjectLandingPage = async () => {
    await this.waitForElement(locators.projectsLandingPage);
    await expect(
      await this.page.locator(locators.projectsLandingPage)
    ).toBeVisible();
  };

  verifyProjectTitle = async () => {
    await this.waitForElement(locators.projectTitle);
    await expect(await this.page.locator(locators.projectTitle)).toBeVisible();
    let textContent = await this.page
      .locator(locators.projectTitle)
      .innerText();
    expect(textContent).toContain(projectName);
  };

  verifyNumberOfProjectTile = async (count: any) => {
    await this.waitForElement(locators.projectTile);
    expect(await this.page.locator(locators.projectTile).count()).toBe(count);
  };
}
