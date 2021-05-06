import { Page } from 'playwright';
import BrowserService from '../../../src/services/utils/browser.service';
import { ManageProspects } from '../../../src/pages/prospect/manage-prospects.page';

describe('Prospect Page Title', function () {
  let page: Page;
  let manageProspects: ManageProspects;
  const browser = new BrowserService();

  beforeAll(async () => {
    await browser.setup();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    manageProspects = new ManageProspects(browser);
  });

  afterEach(async () => {
    await browser.takeScreenshotWhenFailedAndClose(page);
  });

  describe('as admin user', function () {
    beforeEach(async () => {
      await browser.loginUsingCookiesAs('admin');
      await manageProspects.navigate(page);
      await manageProspects.waitForPageLoad(page);
    });

    it('should show manage prospects page title', async () => {
      expect(await page.title()).toBe(manageProspects.getPageTitle());
    });
  });
});
