import {expect, Page} from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string){
        await this.page.goto(url);
    }

    public async click(selector: string) {
        return this.page.click(selector);
    }

    type = async (selector: string, keys: string) => {
        await this.page.type(selector, keys);
    };

    async waitForUrl(url) {
        return expect(await this.page.waitForURL(url));
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector);
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async urlContainsText(link: string){
        expect(this.page.url().includes(link)).toBeTruthy();
    }

    async selectOptionInDropdown(selector: string, option: string){
        await this.page.selectOption(selector, option);
    }
}