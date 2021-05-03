import BrowserService from '../../services/utils/browser.service';
import { ManageEntity } from '../base/manage-entity.page';

/**
 * Manage Applications Page
 */
export class ManageApplications extends ManageEntity {
  caseTypeCategory = 'awards';

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
    return 'Manage Applications | CiviCase';
  }
}
