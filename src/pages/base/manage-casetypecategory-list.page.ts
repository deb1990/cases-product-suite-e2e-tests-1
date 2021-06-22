import { Page, Response } from 'playwright';
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
    emptyCaseSelect: '.civicase__case-list .empty-label'
  };

  /**
   * @param {Page} page page object
   * @returns {Promise<Response|null>} promise
   */
  async navigate (page: Page): Promise<Response|null> {
    return await page.goto(Configs.getSiteConfig().url + this.getPageUrl());
  }

  /**
   * @param page page object
   * @returns promise
   */
  async waitForPageLoad (page: Page): Promise<any> {
    await page.waitForSelector('.civicase__case-placeholder-row', { state: 'hidden' });
  }

  /**
   * @param page page object
   * @param numberOfCases number of cases to select
   * @param actionName name of the bulk action to run
   * @returns promise
   */
  async enableBulkActionFor (page: Page, numberOfCases: 'all' | 'visible' | 'none', actionName: string): Promise<any> {
    const ImportedClass = await import(`./case-bulk-action/actions/${actionName}-case-bulk-action.page`);
    const constructorName = Object.keys(ImportedClass)[0];
    const caseBulkAction = new ImportedClass[constructorName]();
    await caseBulkAction.doAction(page, numberOfCases);
    await this.waitForPageLoad(page);
  }

  /**
   * @returns case type category value
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
   * @returns page title
   */
  getPageUrl (): string {
    return `/civicrm/case/a/?case_type_category=${this.getCaseTypeCategoryValue()}#/case/list?cf=%7B%22case_type_category%22:%22${this.getCaseTypeCategoryValue()}%22%7D`;
  }
}
