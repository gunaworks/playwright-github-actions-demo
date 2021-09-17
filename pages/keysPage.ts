import { BasePage } from "./basePage";
import { keyName } from "../utils/faker/fakerUtils";
import { expect, Page } from "@playwright/test";

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
}
