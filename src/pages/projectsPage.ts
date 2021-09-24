import { BasePage } from './basePage';
import { projectName } from '../utils/faker/fakerUtils';
import { expect, Page } from '@playwright/test';
import { PROJECT_API } from '../utils/constants';
import { logger } from '../utils/logger';

const locators = {
  newProjectButton: 'text=adding a project',
  addProjectButton: "[data-name='add-project']",
  addProjectOverlay: 'div#addproject .modal-content',
  projectName: 'input#project-name',
  createProject: 'a#project-add',
  projectsLandingPage: 'div#noresults',
  emptyProjectPage: '.sc-fKgJPI',
  nonEmptyProjectPage: 'div.thewrap',
  projectTitle: 'a.project-title-wrapper',
  projectTile: "//div[@data-rbd-droppable-id='droppable']/div[*]",
  project: "[data-name='project-name']",
  projectHeader: 'div.project-header-multi',
};

export default class ProjectsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  createFirstProject = async () => {
    await this.validateEmptyProjectPage();
    await this.reloadPage();
    await this.clickNewProject();
    await this.waitForProjectOverlay();
    await this.enterDetailsAndCreateProject();
  };

  createNthProject = async () => {
    await this.validateNonEmptyProjectPage();
    await this.reloadPage();
    await this.clickAddProject();
    await this.waitForProjectOverlay();
    await this.enterDetailsAndCreateProject();
  };
  private validateEmptyProjectPage = async () => {
    try {
      await this.waitForElement(locators.emptyProjectPage);
      logger.info('Navigated to empty projects page');
    } catch (e) {
      logger.error('Error while landing to projects page', e);
      throw e;
    }
  };

  private validateNonEmptyProjectPage = async () => {
    try {
      await this.waitForElement(locators.nonEmptyProjectPage);
      logger.info('Navigated to empty projects page');
    } catch (e) {
      logger.error('Error while landing to projects page', e);
      throw e;
    }
  };

  private clickNewProject = async () => {
    try {
      await this.click(locators.newProjectButton);
      logger.info('Clicked on new project button');
    } catch (e) {
      logger.error('Failed to click the new project button', e);
      throw e;
    }
  };

  private clickAddProject = async () => {
    try {
      await this.click(locators.addProjectButton);
      logger.info('Clicked on add project button');
    } catch (e) {
      logger.error('Failed to click the add project button', e);
      throw e;
    }
  };

  private waitForProjectOverlay = async () => {
    await this.waitForElement(locators.addProjectOverlay);
  };

  private enterDetailsAndCreateProject = async () => {
    try {
      await this.type(locators.projectName, projectName);
      await this.waitForElement(locators.createProject);
      await this.click(locators.createProject);
      logger.info('Project created after entering the details');
    } catch (e) {
      logger.error('Error while entering the project details', e);
      throw e;
    }
  };

  selectProject = async () => {
    try {
      await this.validateNonEmptyProjectPage();
      await this.reloadPage();
      await this.waitForElement(locators.project);
      await this.click(locators.project);
      await this.waitForElement(locators.projectHeader);
      logger.info('Selected the project from the projects page');
    } catch (e) {
      logger.error(
        'Error while selecting the project from the projects page',
        e
      );
      throw e;
    }
  };

  verifyProjectLandingPage: () => Promise<void> = async () => {
    await this.waitForElement(locators.projectsLandingPage);
    await expect(
      await this.page.locator(locators.projectsLandingPage)
    ).not.toBeNull();
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
    await this.navigateTo(PROJECT_API);
    await this.waitForElement(locators.projectTile);
    expect(await this.page.locator(locators.projectTile).count()).toBe(count);
  };
}
