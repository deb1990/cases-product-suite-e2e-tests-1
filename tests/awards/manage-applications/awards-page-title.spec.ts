import { Page } from 'playwright';
import BrowserService from '../../../src/services/utils/browser.service';
import { ManageApplications } from '../../../src/pages/awards/manage-applications.page';

describe('Award Page Title', function () {
  let page: Page;
  let manageApplications: ManageApplications;
  const browser = new BrowserService();

  beforeAll(async () => {
    await browser.setup();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    manageApplications = new ManageApplications(browser);
  });

  afterEach(async () => {
    await browser.takeScreenshotWhenFailedAndClose(page);
  });

  describe('as admin user', function () {
    beforeEach(async () => {
      await browser.loginUsingCookiesAs('admin');
      await manageApplications.navigate(page);
      await manageApplications.waitForPageLoad(page);
    });

    it('should show manage applications page title', async () => {
      expect(await page.title()).toBe(manageApplications.getPageTitle());
    });
  });

  describe('as case user', function () {
    beforeEach(async () => {
      await browser.loginUsingCookiesAs('case_user');
      await manageApplications.navigate(page);
    });

    it('should not have access to manage applications page', async () => {
      expect(await page.title()).not.toBe(manageApplications.getPageTitle());
    });
  });
});
