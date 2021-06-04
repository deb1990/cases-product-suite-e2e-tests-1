import NodeEnvironment from 'jest-environment-node';
import Dayjs from 'dayjs';
import type { Circus, Config, Global } from '@jest/types';
import BrowserService from '../../../src/services/utils/browser.service';
import TestLinkService from '../../../src/services/utils/test-link.service';
import JestGlobal from '../../../src/interfaces/jest-global.interface';

/**
 * Custom Jest Test environment.
 */
export default class E2ETestEnvironment extends NodeEnvironment {
  testLinkID: string;
  global: Global.Global & JestGlobal;

  /**
   * Constructor.
   *
   * @param config config
   */
  constructor (config: Config.ProjectConfig) {
    super(config);
    this.global.hasTestFailures = false;
  }

  /**
   * Handle test events.
   *
   * @param event event
   */
  async handleTestEvent (event: Circus.Event): Promise<any> {
    if (event.name === 'run_describe_start' && (event.describeBlock.parent?.name === 'ROOT_DESCRIBE_BLOCK')) {
      await this.beforeAllTestsOfEachSpecFile();
    } else if (event.name === 'run_describe_finish' && (event.describeBlock.parent?.name === 'ROOT_DESCRIBE_BLOCK')) {
      await this.afterAllTestsOfEachSpecFile();
    } else if (event.name === 'test_start') {
      await this.beforeEachTest(event.test);
    } else if (event.name === 'test_done') {
      await this.afterEachTest(event.test);
    }
  }

  /**
   * Get Test link ID.
   *
   * @param name name of the test
   * @returns test link id
   */
  getTestLinkID (name: string): string {
    return name.substr(0, name.indexOf('::'));
  }

  /**
   * Get the full name of the test.
   *
   * @param test test object
   * @param name name of the test
   * @returns list of test names
   */
  getTestName (test: Circus.TestEntry | Circus.DescribeBlock, name: Circus.TestName[]): Circus.TestName[] {
    name.push(test.name);

    if (test.parent !== undefined) {
      this.getTestName(test.parent, name);
    }

    return name;
  }

  /**
   * Common setup steps for all tests, runs before all the tests.
   */
  async beforeAllTests (): Promise<void> {
    await TestLinkService.init();
    await TestLinkService.createNewBuild(Dayjs());
  }

  /**
   * Common setup steps for all tests of a spec file.
   */
  async beforeAllTestsOfEachSpecFile (): Promise<void> {
    this.global.browser = new BrowserService();
    await this.global.browser.setup();
  }

  /**
   * Common teardown steps for all tests of a spec file.
   */
  async afterAllTestsOfEachSpecFile (): Promise<void> {
    await this.global.browser.close();
  }

  /**
   * Steps before running each test.
   *
   * @param test test object
   */
  async beforeEachTest (test: Circus.TestEntry): Promise<void> {
    this.testLinkID = this.getTestLinkID(test.name);
    this.global.page = await this.global.browser.newPage();
  }

  /**
   * Steps after running each test.
   *
   * @param test test object
   */
  async afterEachTest (test: Circus.TestEntry): Promise<void> {
    let hasTestFailures = false;

    if (test.errors.length > 0) {
      hasTestFailures = true;
      const testName = this.getTestName(test, []).reverse();
      testName.shift();

      const failureScreenshotFileName = testName.join('_').replace(/ /g, '_');

      await this.global.browser.takeScreenshotWhenFailedAndClose(
        this.global.page,
        hasTestFailures,
        failureScreenshotFileName
      );
    }

    await TestLinkService.reportTestCase(this.testLinkID, !hasTestFailures);
  }
}

module.exports = E2ETestEnvironment;
