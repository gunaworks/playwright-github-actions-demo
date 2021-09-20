import { BasePage } from './basePage';
import { keyName, translation } from '../utils/faker/fakerUtils';
import { expect, Page } from '@playwright/test';
import { API } from '../utils/constants';

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
};

export class KeysPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  addKey = async () => {
    await this.waitForElement(locators.addKeyButton);
    await this.click(locators.addKeyButton);
    await this.waitForElement(locators.addKeyOverlay);
  };

  enterKeyDetails = async () => {
    await this.type(locators.keyNameField, keyName);
    await this.click(locators.platforms);
    await this.waitForElement(locators.availableListOfPlatforms);
    await this.click(locators.firstAvailablePlatform);
  };

  enterPluralKeyDetails = async () => {
    await this.type(locators.keyNameField, keyName);
    await this.click(locators.platforms);
    await this.waitForElement(locators.availableListOfPlatforms);
    await this.click(locators.firstAvailablePlatform);
  };

  saveKey = async () => {
    await this.click(locators.saveKey);
    await this.waitForElement(locators.keySection);
  };

  verifyKeyInProjectsPage = async () => {
    await this.navigateTo(`${API.PROJECT}`);
  };

  addTranslation = async () => {
    await this.waitForElement(locators.key);
    await this.waitForElement(locators.translationsSection);
    await this.waitForElement(locators.translations);
    const elements = await this.page.$$(locators.translations);
    for await (const element of elements) {
      await element.click();
      // element.$('.spellcheck-match')
      await this.waitForElement(locators.translationTextBox);
      await this.type(locators.translationTextBox, translation);
      await this.click(locators.saveTranslation);
      await this.isEnabled(locators.translations);
    }
  };

  async verifyCompletionOfKeyTranslation() {
    await this.navigateTo(`${API.PROJECT}`);
    await this.reloadPage();
    await this.waitForElement(locators.translationCompletion);
    expect(await this.getText(locators.translationCompletion)).toContain('100');
  }
}
