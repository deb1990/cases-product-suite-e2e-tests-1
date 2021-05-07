import * as jest from 'jest-cli';
import ConfigService from '../src/services/utils/configs.service';
import BrowserService from '../src/services/utils/browser.service';
import UserRole from '../src/services/role/user-role.service';
import changeDrupalModuleState from '../src/services/utils/change-drupal-module-state.service';
import cleanUpReports from '../src/services/utils/clean-up-reports.service';

export default jestTask;

/**
 * @returns {Promise<void>} promise
 */
async function jestTask (): Promise<void> {
  ConfigService.touchSiteConfigFile();

  cleanUpReports();
  changeDrupalModuleState('session_limit', false);

  UserRole.createUsersWithRoles();

  const browser = new BrowserService();

  await browser.writeCookies();

  await jest.run(['--runInBand']);
}
