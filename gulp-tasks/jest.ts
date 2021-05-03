import * as jest from 'jest-cli';
import ConfigService from '../src/services/utils/configs';
import BrowserService from '../src/services/utils/browser.service';

export default jestTask;

/**
 * @returns {Promise<void>} promise
 */
async function jestTask (): Promise<void> {
  ConfigService.touchSiteConfigFile();
  const browser = new BrowserService();

  await browser.writeCookies();
  await jest.run();
}
