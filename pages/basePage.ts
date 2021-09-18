import { expect, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  navigateTo = async (url: string) => {
    await this.page.goto(url);
  };

  protected click = async (selector: string) => this.page.click(selector);

  type = async (selector: string, keys: any) => {
    await this.page.type(selector, keys);
  };

  waitForUrl = async (url: string | RegExp | ((url: URL) => boolean)) =>
    expect(await this.page.waitForURL(url));

  waitForElement = async (selector: string) => {
    await this.page.waitForSelector(selector);
  };

  reloadPage = async () => {
    await this.page.reload();
  };

  urlContainsText = async (link: string) => {
    expect(this.page.url().includes(link)).toBeTruthy();
  };

  selectOptionInDropdown = async (selector: string, option: string) => {
    await this.page.selectOption(selector, option);
  };
}
