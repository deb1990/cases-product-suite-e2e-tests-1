import BrowserService from '../../services/utils/browser.service';
import { ManageCasetypecategoryList } from '../base/manage-casetypecategory-list.page';

/**
 * Manage Prospects Page
 */
export class ManageProspects extends ManageCasetypecategoryList {
  caseTypeCategory = 'Prospecting';

  /**
   * @param {BrowserService} browser browser object
   */
  constructor (public browser: BrowserService) {
    super(browser);
  }

  /**
   * @returns {string} page title
   */
  getPageTitle (): string {
    return 'Manage Prospectings | CiviCase';
  }
}
