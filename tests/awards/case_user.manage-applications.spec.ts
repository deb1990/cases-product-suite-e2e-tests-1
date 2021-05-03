import { Page } from 'playwright';
import BrowserService from '../../src/services/utils/browser.service';
import { ManageApplications } from '../../src/pages/awards/manage-applications.page';
import DatabaseService from '../../src/services/data/database.service';

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
    await DatabaseService.startTransaction();
    page = await browser.newPage();

    manageApplications = new ManageApplications(browser);
  });

  afterEach(async () => {
    await page.close();
    await DatabaseService.rollbackTransaction();
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
