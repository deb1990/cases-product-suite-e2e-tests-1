import type { Circus } from '@jest/types';

/**
 * Test Helper Singleton
 */
export default {
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
};
