import { BasePage } from "./basePage";
import { keyName } from "../utils/faker/fakerUtils";
import { Page } from "@playwright/test";

const locators = {
  addKeyButton: ".sc-bdnxRM.add-key-trigger",
  addKeyOverlay: "div#addkey  .modal-content",
  keyNameField: "input#keyName",
  platforms: "//input[@id='s2id_autogen8']",
  availableListOfPlatforms: "[id='select2-drop']",
  firstAvailablePlatform:
    "ul.select2-results > li[role='presentation']:first-of-type",
  saveKey: "[id='btn_addkey']",
  keySection: ".row.row-key",
  translations: "//*[@class='highlight']",
  key: ".current",
  translationsSection: ".clearfix",
  translationTextBox: "div[role='presentation'] > pre[role='presentation']",
  saveTranslation: ".save > img",
};

export class KeysPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  clickAddKey = async () => {
    await this.waitForElement(locators.addKeyButton);
    await this.click(locators.addKeyButton);
    await this.waitForElement(locators.addKeyOverlay);
  };

  enterInitialKeyDetails = async () => {
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
    await this.navigateTo("/projects");
  };

  async addTranslationForKeys() {
    await this.waitForElement(locators.key);
    await this.waitForElement(locators.translationsSection);
    await this.waitForElement(locators.translations);
    let elements = await this.page.$$(locators.translations);
    for await (const element of elements) {
      await element.click();
      await this.waitForElement(locators.translationTextBox);
      await this.type(locators.translationTextBox, keyName);
      await this.click(locators.saveTranslation);
    }
  }
}
