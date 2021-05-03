import { Page, Response } from 'playwright';
import BrowserService from './../../utils/browser.service';
import Configs from './../../utils/configs';

/**
 * Manage Cases Page
 */
export class ManageCases {
  pageTitle = 'Manage Cases | CiviCase';

  private readonly url = '/civicrm/case/a/?case_type_category=1#/case/list?cf=%7B%22case_type_category%22:%221%22%7D';

  /**
   * @param {BrowserService} browser browser object
   */
  constructor (public browser: BrowserService) {
    this.browser = browser;
  }

  /**
   * @param {Page} page browser object
   * @returns {Promise<Response|null>} promise
   */
  async navigate (page: Page): Promise<Response|null> {
    return await page.goto(Configs.getSiteConfig().url + this.url);
  }
}
