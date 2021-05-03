import BrowserService from '../../utils/browser.service';
import { ManageEntity } from '../base/manage-entity.page';

/**
 * Manage Prospects Page
 */
export class ManageProspects extends ManageEntity {
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
