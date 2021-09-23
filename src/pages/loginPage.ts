import { BasePage } from './basePage';
import { Page } from '@playwright/test';
import { logger } from '../utils/logger';
import { LOGIN_API } from '../utils/constants';

const locators = {
  emailAddress: 'div:nth-of-type(1) > .jKLUHq.sc-gXfVKN',
  password: 'div:nth-of-type(2) > .jKLUHq.sc-gXfVKN',
  loginButton: '.gCUvUk.sc-hiKfDv',
  userLandingPage: '.sc-dlMDgC',
};

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  login = async () => {
    try {
      await this.navigateTo(LOGIN_API);
      await this.type(locators.emailAddress, process.env.EMAIL);
      await this.type(locators.password, process.env.PASSWORD);
      await this.click(locators.loginButton);
      logger.info('User logged in');
    } catch (e) {
      logger.error(
        'Error while logging into the application with the credentials',
        e
      );
      throw e;
    }
  };
}
