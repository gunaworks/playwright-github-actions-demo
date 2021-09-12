import type { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { expect } from "@playwright/test";

export const randomPassword = () => `!0${randomString()}`;
export const randomEmail = () => `test-user-${randomString()}@lokalise.com`;
export const randomString = () => Math.random().toString(36).substring(2, 15);
// export const randomEmail = () => `franco@fra.org`;
// export const randomPassword = () => `!Abcd1234`;

const faker = require("faker");
const locators = {
  signUp: ".hhxZMV.sc-efHYUO",
  signUpForm1: ".bohYrR.sc-iklJeh",
  signUpForm2: ".cLjRKm.sc-giAqHp",
  fullName: "form .jcqGXt:nth-of-type(1) .sc-gXfVKN",
  workEmail: "form .jcqGXt:nth-of-type(2) .sc-gXfVKN",
  passwordInForm: "div:nth-of-type(3) > .jKLUHq.sc-gXfVKN",
  signUpButton: ".gCUvUk.sc-hiKfDv",
  role: "div:nth-of-type(2) > .lRfdj.sc-cBoqAE",
  companyName: "form .jcqGXt:nth-of-type(3) .sc-gXfVKN",
  companySize: "div:nth-of-type(4) > .lRfdj.sc-cBoqAE",
  phoneNumber: "form .jcqGXt:nth-of-type(5) .sc-gXfVKN",
  aboutLokalise: "div:nth-of-type(6) > .lRfdj.sc-cBoqAE",
  completeSignUpButton: ".sc-hiKfDv",
};

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  signup = async () => {
    await this.clickSignUp();
    await this.signUpInitialForm();
    await this.completeSignUp();
  };

  private clickSignUp = async () => {
    await this.navigateTo("/signup");
    // await this.waitForElement(locators.signUp);
    // await this.click(locators.signUp);
    await this.waitForElement(locators.signUpForm1);
    await this.waitForUrl("/signup");
    expect(this.page.url()).toContain("/signup");
  };

  private signUpInitialForm = async () => {
    let name = faker.name.firstName();

    await this.type(locators.fullName, name);
    await this.type(locators.workEmail, randomEmail());
    await this.type(locators.passwordInForm, randomPassword());
    await this.click(locators.signUpButton);
    await this.waitForElement(locators.signUpForm2);
    await this.waitForUrl("/welcome");
    expect(this.page.url()).toContain("/welcome");
  };

  private completeSignUp = async () => {
    //TODO randomize the option from the drop down
    let companyName = faker.company.companyName();
    let phoneNumber = faker.phone.phoneNumber();

    await this.selectOptionInDropdown(locators.role, "2");
    await this.type(locators.companyName, companyName);
    await this.selectOptionInDropdown(locators.companySize, "2");
    await this.type(locators.phoneNumber, phoneNumber);
    await this.selectOptionInDropdown(locators.aboutLokalise, "2");
    await this.click(locators.completeSignUpButton);
    await this.waitForUrl("/projects");
    expect(this.page.url()).toContain("/projects");
  };
}
