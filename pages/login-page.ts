import {BasePage} from "./base-page";
import {expect, Page} from "@playwright/test";
import {randomEmail, randomPassword} from "./signup-page";

const locators = {
    emailAddress: 'div:nth-of-type(1) > .jKLUHq.sc-gXfVKN',
    password: 'div:nth-of-type(2) > .jKLUHq.sc-gXfVKN',
    loginButton: '.gCUvUk.sc-hiKfDv',
    userLandingPage:  '.sc-dlMDgC' //'.jfZxKp.sc-bdnxRM',
};

export class LoginPage extends BasePage{
    constructor(page: Page) {
        super(page);
    }

    login = async () => {
        await this.navigateTo('/login');
        await this.type(locators.emailAddress, randomEmail());
        await this.type(locators.password, randomPassword());
        await this.click(locators.loginButton);
        await this.waitForElement(locators.userLandingPage);
        await this.waitForUrl('/projects');
        expect(this.page.url()).toContain('/projects');
    };

}