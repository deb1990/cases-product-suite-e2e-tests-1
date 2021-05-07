import * as jest from 'jest-cli';
import ConfigService from '../src/services/utils/configs';
import BrowserService from '../src/services/utils/browser.service';
import UserRole from '../src/services/role/user-role.service';
import { execSync } from 'child_process';

export default jestTask;

/**
 * @returns {Promise<void>} promise
 */
async function jestTask (): Promise<void> {
  execSync('rm -rf test-report', { encoding: 'utf8' });
  ConfigService.touchSiteConfigFile();

  UserRole.createUsersWithRoles();

  const browser = new BrowserService();

  await browser.writeCookies();
  await jest.run(['--runInBand']);
}
