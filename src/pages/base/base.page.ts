import { Page, Response } from 'playwright';
import BrowserService from '../../services/utils/browser.service';
import Configs from '../../services/utils/configs';

/**
 * Manage Entity Page
 */
export default abstract class BasePage {
  siteName: string = Configs.getSiteConfig().site_name;

  /**
   * @param {BrowserService} browser browser object
   */
  constructor (public browser: BrowserService) {
    this.browser = browser;
  }

  /**
   * @param {Page} page page object
   * @returns {Promise<Response|null>} promise
   */
  async navigate (page: Page): Promise<Response|null> {
    return await page.goto(Configs.getSiteConfig().url + this.getPageUrl());
  }

  /**
   * @param {Page} page page object
   * @returns {Promise<any>} promise
   */
  abstract waitForPageLoad (page: Page): Promise<any>;

  /**
   * @returns {string} page title
   */
  abstract getPageTitle (): string;

  /**
   * @returns {string} page title
   */
  abstract getPageUrl (): string;
}
