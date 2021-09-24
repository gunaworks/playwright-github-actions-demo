import { BasePage } from './basePage';
import { keyName, translation } from '../utils/faker/fakerUtils';
import { expect, Page } from '@playwright/test';
import { HUNDRED_PERCENTAGE, ONE, PROJECT_API } from '../utils/constants';
import { logger } from '../utils/logger';

const locators = {
  addKeyButton: '.sc-bdnxRM.add-key-trigger',
  addKeyOverlay: 'div#addkey  .modal-content',
  keyNameField: 'input#keyName',
  platforms: "//input[@id='s2id_autogen8']",
  availableListOfPlatforms: "[id='select2-drop']",
  firstAvailablePlatform:
    "ul.select2-results > li[role='presentation']:first-of-type",
  saveKey: "[id='btn_addkey']",
  keySection: '.row.row-key',
  translations: '.highlight',
  key: '.current',
  translationsSection: '.clearfix',
  translationTextBox: "div[role='presentation'] > pre[role='presentation']",
  saveTranslation: '.save > img',
  translationCompletion: '.eFuLkI.sc-fbIWvP',
  keyCount: '.illmTA:nth-of-type(4) .sc-fbIWvP',
};

export default class KeysPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  addPlainKey = async () => {
    try {
      await this.waitForElement(locators.addKeyButton);
      await this.click(locators.addKeyButton);
      await this.waitForElement(locators.addKeyOverlay);
      await this.type(locators.keyNameField, keyName);
      await this.click(locators.platforms);
      await this.waitForElement(locators.availableListOfPlatforms);
      await this.click(locators.firstAvailablePlatform);
      await this.click(locators.saveKey);
      await this.waitForElement(locators.keySection);
      logger.info('Created key successfully');
    } catch (e) {
      logger.error('Error while creating the key', e);
      throw e;
    }
  };

  verifyKeyInProjectsPage = async () => {
    try {
      await this.navigateTo(`${PROJECT_API}`);
      expect(this.page.locator(locators.keyCount)).not.toBeNull();
      expect(await this.getText(locators.keyCount)).toBe(ONE.toString());
      logger.info('Key creation verified in the projects page');
    } catch (e) {
      logger.error(
        'Error while verifying the created key in the projects page',
        e
      );
      throw e;
    }
  };

  addTranslation = async () => {
    try {
      await this.waitForElement(locators.key);
      await this.waitForElement(locators.translationsSection);
      await this.waitForElement(locators.translations);
      const elements = await this.page.$$(locators.translations);
      for await (const element of elements) {
        await element.waitForElementState('visible');
        await element.click();
        await this.waitForElement(locators.translationTextBox);
        await this.type(locators.translationTextBox, translation);
        await this.waitForElement(locators.saveTranslation);
        await this.click(locators.saveTranslation);
        await this.waitForElement(locators.translations);
      }
      logger.info('Added translation for the created key');
    } catch (e) {
      logger.error('Error while adding the translation for the created key', e);
      throw e;
    }
  };

  verifyCompletionOfKeyTranslation = async () => {
    try {
      await this.navigateTo(PROJECT_API);
      await this.reloadPage();
      await this.waitForElement(locators.translationCompletion);
      expect(await this.getText(locators.translationCompletion)).toContain(
        HUNDRED_PERCENTAGE
      );
      logger.info(
        'Verified the completion of key translation in the projects page'
      );
    } catch (e) {
      logger.error(
        'Error while verifying the key completion in the projects page',
        e
      );
      throw e;
    }
  };
}
