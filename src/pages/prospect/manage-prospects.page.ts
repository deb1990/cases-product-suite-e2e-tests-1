import { ManageCasetypecategoryList } from '../base/manage-casetypecategory-list.page';

/**
 * Manage Prospects Page
 */
export class ManageProspects extends ManageCasetypecategoryList {
  caseTypeCategory = 'Prospecting';

  /**
   * @returns page title
   */
  getPageTitle (): string {
    return `Manage Prospectings | ${this.siteName}`;
  }
}
