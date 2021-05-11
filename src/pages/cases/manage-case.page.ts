import BrowserService from '../../services/utils/browser.service';
import { ManageCasetypecategoryList } from '../base/manage-casetypecategory-list.page';

/**
 * Manage Cases Page
 */
export class ManageCases extends ManageCasetypecategoryList {
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
    return `Manage Cases | ${this.siteName}`;
  }
}
