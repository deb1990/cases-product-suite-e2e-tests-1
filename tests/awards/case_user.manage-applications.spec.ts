import { Page } from 'playwright';
import BrowserService from '../../src/services/utils/browser.service';
import { ManageApplications } from '../../src/pages/awards/manage-applications.page';

describe('Manage Applications: As Case_User User', function () {
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
    await page.close();
  });

  describe('on navigate', function () {
    beforeEach(async () => {
      await browser.loadCookiesFor('case_user');
      await manageApplications.navigate(page);
    });

    it('should not have access to manage applications page', async () => {
      expect(await page.title()).not.toBe(manageApplications.getPageTitle());
    });
  });
});
