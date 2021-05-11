import BrowserService from '../../services/utils/browser.service';
import { ManageCasetypecategoryList } from '../base/manage-casetypecategory-list.page';

/**
 * Manage Applications Page
 */
export class ManageApplications extends ManageCasetypecategoryList {
  caseTypeCategory = 'awards';

  /**
   * @param {string} browser browser object
   */
  constructor (public browser: BrowserService) {
    super(browser);
  }

  /**
   * @returns page title
   */
  getPageTitle (): string {
    return `Manage Applications | ${this.siteName}`;
  }
}
