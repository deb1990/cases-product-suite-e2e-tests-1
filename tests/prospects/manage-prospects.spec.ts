import { Page } from 'playwright';
import BrowserService from '../../src/services/utils/browser.service';
import { ManageProspects } from '../../src/pages/prospect/manage-prospects.page';

describe('Manage Prospects', function () {
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
    await page.close();
  });

  describe('on navigate', function () {
    beforeEach(async () => {
      await browser.loadCookiesFor('admin');
      await manageProspects.navigate(page);
      await manageProspects.waitForPageLoad(page);
    });

    it('should show manage prospects page title', async () => {
      expect(await page.title()).toBe(manageProspects.getPageTitle());
    });
  });
});
