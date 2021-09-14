import { BasePage } from "./base-page";
import { expect, Page } from "@playwright/test";
import { randomEmail, randomPassword } from "./signup-page";

const locators = {
  emailAddress: "div:nth-of-type(1) > .jKLUHq.sc-gXfVKN",
  password: "div:nth-of-type(2) > .jKLUHq.sc-gXfVKN",
  loginButton: ".gCUvUk.sc-hiKfDv",
  // userLandingPage:  '.sc-dlMDgC' //'.jfZxKp.sc-bdnxRM',
  userLandingPage: ".jfZxKp.sc-bdnxRM", //'.sc-dlMDgC' ,
};

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  login = async () => {
    await this.navigateTo("/login");
    await this.type(locators.emailAddress, process.env.EMAIL);
    await this.type(locators.password, process.env.PASSWORD);
    await this.click(locators.loginButton);
  };
}
