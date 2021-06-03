import { Page } from 'playwright';
import BrowserService from '../../../src/services/utils/browser.service';
import { ManageCases } from '../../../src/pages/cases/manage-case.page';
import CaseTypeService from '../../../src/services/entities/case-type.service';

describe('Case Page Title', function () {
  let page: Page;
  let manageCases: ManageCases;
  const browser = new BrowserService();
  const CaseType = new CaseTypeService();

  beforeAll(async () => {
    await browser.setup();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    manageCases = new ManageCases(browser);

    setupCaseTypeIds();
  });

  afterEach(async () => {
    await browser.takeScreenshotWhenFailedAndClose(page);
    CaseType.cleanUp();
  });

  describe('as admin user', function () {
    beforeEach(async () => {
      await browser.loginUsingCookiesAs('admin');
      await manageCases.navigate(page);
      await manageCases.waitForPageLoad(page);
    });

    it('should show manage cases page title', async () => {
      expect(await page.title()).toBe(manageCases.getPageTitle());
    });
  });

  /**
   * @returns case type ids
   */
  function setupCaseTypeIds (): object[] {
    const definition = {
      activityTypes: [
        { name: 'Open Case', max_instances: '1' },
        { name: 'Follow up' },
        { name: 'File Upload' }
      ],
      activitySets: [],
      caseRoles: [
        { name: 'Homeless Services Coordinator is', creator: '1', manager: '0' },
        { name: 'Health Services Coordinator', manager: '0' },
        { name: 'Benefits Specialist is', manager: '1' }
      ],
      timelineActivityTypes: []
    };

    return CaseType.create([
      {
        sequential: '1',
        name: 'e2e_case_type',
        case_type_category: 2,
        title: 'E2E CaseType',
        definition: definition
      },
      {
        sequential: '1',
        name: 'e2e_case_type2',
        case_type_category: 2,
        title: 'E2E CaseType2',
        definition: definition
      }
    ]);
  }
});
