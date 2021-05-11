import { ManageCasetypecategoryList } from '../base/manage-casetypecategory-list.page';

/**
 * Manage Cases Page
 */
export class ManageCases extends ManageCasetypecategoryList {
  /**
   * @returns page title
   */
  getPageTitle (): string {
    return `Manage Cases | ${this.siteName}`;
  }
}
