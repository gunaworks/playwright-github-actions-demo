import {expect, Page} from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string){
        await this.page.goto(url);
    }

    public async click(selector: string) {
        return await this.page.click(selector);
    }

    async type(selector: string, keys: string) {
        await this.page.type(selector, keys);
    }

    async waitForUrl(url) {
        return expect(await this.page.waitForURL(url));
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector);
    }

    async urlContainsText(link: string){
        expect(this.page.url().includes(link)).toBeTruthy();
    }

    async selectOptionInDropdown(selector: string, option: string){
        await this.page.selectOption(selector, option);
    }
}