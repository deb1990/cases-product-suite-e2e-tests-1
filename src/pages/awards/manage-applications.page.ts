import { ManageCasetypecategoryList } from '../base/manage-casetypecategory-list.page';

/**
 * Manage Applications Page
 */
export class ManageApplications extends ManageCasetypecategoryList {
  caseTypeCategory = 'awards';

  /**
   * @returns page title
   */
  getPageTitle (): string {
    return `Manage Applications | ${this.siteName}`;
  }
}
