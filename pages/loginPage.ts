import { BasePage } from "./basePage";
import { Page } from "@playwright/test";

const locators = {
  emailAddress: "div:nth-of-type(1) > .jKLUHq.sc-gXfVKN",
  password: "div:nth-of-type(2) > .jKLUHq.sc-gXfVKN",
  loginButton: ".gCUvUk.sc-hiKfDv",
  userLandingPage: ".sc-dlMDgC", //'.jfZxKp.sc-bdnxRM',
  // userLandingPage: ".jfZxKp.sc-bdnxRM", //'.sc-dlMDgC' ,
};

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  login = async () => {
    await this.navigateTo("/login");
    // await this.type(locators.emailAddress, process.env.EMAIL);
    await this.type(locators.emailAddress, 'franco@fra.org');
    // await this.type(locators.password, process.env.PASSWORD);
    await this.type(locators.password, 'Abcd1234');
    await this.click(locators.loginButton);
  };
}
