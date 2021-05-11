import BrowserService from '../../services/utils/browser.service';
import { ManageCasetypecategoryList } from '../base/manage-casetypecategory-list.page';

/**
 * Manage Prospects Page
 */
export class ManageProspects extends ManageCasetypecategoryList {
  caseTypeCategory = 'Prospecting';

  /**
   * @param browser browser object
   */
  constructor (public browser: BrowserService) {
    super(browser);
  }

  /**
   * @returns page title
   */
  getPageTitle (): string {
    return `Manage Prospectings | ${this.siteName}`;
  }
}
