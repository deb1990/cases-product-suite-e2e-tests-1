import { Page, Response } from 'playwright';
import BrowserService from '../../services/utils/browser.service';
import Configs from '../../services/utils/configs.service';
import BasePage from './base.page';
import OptionValueService from '../../services/entities/option-value.service';

/**
 * Manage Entity Page
 */
export abstract class ManageCasetypecategoryList extends BasePage {
  caseTypeCategory = 'cases';
  OptionValue = new OptionValueService();
  selectors = {
    otherCriteriaButton: '.civicase__case-filter-panel__button'
  };

  /**
   * @param {BrowserService} browser browser object
   */
  constructor (public browser: BrowserService) {
    super(browser);
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
  async waitForPageLoad (page: Page): Promise<any> {
    return await page.waitForSelector(this.selectors.otherCriteriaButton);
  }

  /**
   * @returns {string} page title
   */
  abstract getPageTitle (): string;

  /**
   * @returns {string} case type category value
   */
  private getCaseTypeCategoryValue (): string {
    const caseTypeCategoryValue = this.OptionValue.get({
      sequential: 1,
      option_group_id: 'case_type_categories',
      name: this.caseTypeCategory
    }, true)[0].value;

    return caseTypeCategoryValue;
  }

  /**
   * @returns {string} page title
   */
  getPageUrl (): string {
    return `/civicrm/case/a/?case_type_category=${this.getCaseTypeCategoryValue()}#/case/list?cf=%7B%22case_type_category%22:%22${this.getCaseTypeCategoryValue()}%22%7D`;
  }
}
