import BrowserService from '../../services/utils/browser.service';
import { ManageEntity } from '../base/manage-entity.page';

/**
 * Manage Cases Page
 */
export class ManageCases extends ManageEntity {
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
    return 'Manage Cases | CiviCase';
  }
}
