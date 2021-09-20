import { BasePage } from './basePage';
import { projectName } from '../utils/faker/fakerUtils';
import { expect, Page } from '@playwright/test';
import { API } from '../utils/constants';

const locators = {
  newProjectButton: 'text=adding a project', //'.efuNYJ.sc-bdnxRM',
  addProjectButton: "[data-name='add-project']",
  addProjectOverlay: 'div#addproject .modal-content',
  projectName: 'input#project-name',
  createProject: 'a#project-add',
  projectsLandingPage: 'div.sc-jJMGnK',
  addKeysSection: '.fSCyFf.sc-carFqZ > div:nth-of-type(3)',
  addKeyButton: '.sc-bdnxRM.add-key-trigger',
  keyEditorOverlay: 'div#addkey  .modal-content',
  userLandingPage: '.sc-dlMDgC', //'.jfZxKp.sc-bdnxRM',
  projectTitle: 'a.project-title-wrapper',
  projectTile: "//div[@data-rbd-droppable-id='droppable']/div[*]",
  project: "[data-name='project-name']",
};

export class ProjectsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  createFirstProject = async () => {
    await this.validateProjectPage();
    await this.navigateTo(`${API.PROJECT}`);
    await this.clickNewProject();
    await this.waitForProjectOverlay();
    await this.enterProjectDetails();
  };

  createNthProject = async () => {
    await this.navigateTo(`${API.PROJECT}`);
    await this.clickAddProject();
    await this.waitForProjectOverlay();
    await this.enterProjectDetails();
  };
  private validateProjectPage = async () => {
    await this.waitForElement(locators.userLandingPage);
  };

  private clickNewProject = async () => {
    await this.click(locators.newProjectButton);
  };

  private clickAddProject = async () => {
    await this.click(locators.addProjectButton);
  };

  private waitForProjectOverlay = async () => {
    await this.waitForElement(locators.addProjectOverlay);
  };

  private enterProjectDetails = async () => {
    await this.type(locators.projectName, projectName);
    await this.waitForElement(locators.createProject);
    await this.click(locators.createProject);
  };

  selectProject = async () => {
    await this.reloadPage();
    await this.waitForElement(locators.project);
    await this.click(locators.project);
  };

  verifyProjectLandingPage: () => Promise<void> = async () => {
    await this.waitForElement(locators.projectsLandingPage);
    await expect(
      await this.page.locator(locators.projectsLandingPage)
    ).toBeVisible();
  };

  verifyProjectTitle = async () => {
    await this.waitForElement(locators.projectTitle);
    await expect(await this.page.locator(locators.projectTitle)).toBeVisible();
    const textContent = await this.page
      .locator(locators.projectTitle)
      .innerText();
    expect(textContent).toContain(projectName);
  };

  verifyNumberOfProjectsInProjectsPage = async (count: any) => {
    await this.navigateTo(`${API.PROJECT}`);
    await this.waitForElement(locators.projectTile);
    expect(await this.page.locator(locators.projectTile).count()).toBe(count);
  };
}
