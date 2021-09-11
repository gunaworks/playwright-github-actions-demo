import type {Page} from 'playwright';
import {BasePage} from './base-page';
import {expect} from "@playwright/test";

const faker = require('faker')
const locators = {
    emailAddress: 'div:nth-of-type(1) > .jKLUHq.sc-gXfVKN',
    password: 'div:nth-of-type(1) > .jKLUHq.sc-gXfVKN',
    signUp: '.hhxZMV.sc-efHYUO',
    signUpForm1: '.bohYrR.sc-iklJeh',
    signUpForm2: '.cLjRKm.sc-giAqHp',
    fullName: 'form .jcqGXt:nth-of-type(1) .sc-gXfVKN',
    workEmail: 'form .jcqGXt:nth-of-type(2) .sc-gXfVKN',
    passwordInForm: 'div:nth-of-type(3) > .jKLUHq.sc-gXfVKN',
    signUpButton: '.gCUvUk.sc-hiKfDv',
    role: 'div:nth-of-type(2) > .lRfdj.sc-cBoqAE',
    companyName: 'form .jcqGXt:nth-of-type(3) .sc-gXfVKN',
    companySize: 'div:nth-of-type(4) > .lRfdj.sc-cBoqAE',
    phoneNumber: 'form .jcqGXt:nth-of-type(5) .sc-gXfVKN',
    aboutLokalise: 'div:nth-of-type(6) > .lRfdj.sc-cBoqAE',
    completeSignUpButton: '.sc-hiKfDv'
};

export class SignupPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async signup() {
        console.log("Clicking signup");
        await this.clickSignUp();
        await this.signUpInitialForm();
        await this.completeSignUp();
    }

    private async clickSignUp() {
        console.log("Clicking signup");
        await this.click(locators.signUp);
        await this.waitForElement(locators.signUpForm1);
        await this.waitForUrl('/signup');
        expect(this.page.url()).toContain('/signup')
    }

    private async signUpInitialForm() {
        await this.type(locators.fullName, faker.name.firstName());
        await this.type(locators.workEmail, faker.internet.email(
            faker.name.firstName(),
            faker.name.lastName(),
            faker.lorem.word() + '.com'));
        await this.type(locators.passwordInForm, faker.internet.password());
        await this.click(locators.signUpButton)
        await this.waitForElement(locators.signUpForm2);
        await this.waitForUrl('/welcome');
        expect(this.page.url()).toContain('/welcome')
    }

    private async completeSignUp() { //TODO randomize the option from the drop down
        await this.selectOptionInDropdown(locators.role, '2');
        await this.type(locators.companyName, faker.company.companyName());
        await this.selectOptionInDropdown(locators.companySize, '2');
        await this.type(locators.phoneNumber, faker.phone.phoneNumber());
        await this.selectOptionInDropdown(locators.aboutLokalise, '2');
        await this.click(locators.completeSignUpButton);
        await this.waitForUrl('/projects');
        expect(this.page.url()).toContain('/projects')
    }
}