// Jest has issues with Environment Files written in TS
// https://github.com/facebook/jest/issues/5164
const NodeEnvironment = require('jest-environment-node');

class E2ETestEnvironment extends NodeEnvironment {
  constructor (config, context) {
    super(config, context);

    this.global.hasTestFailures = false;
  }

  async handleTestEvent (event, state) {
    if (event.name === 'test_fn_failure') {
      var testName = this.getTestName(event.test, []).reverse();
      testName.shift();

      this.global.failureScreenshotFileName = testName.join('_').replace(/ /g,'_');
      this.global.hasTestFailures = true;
    }
  }

  getTestName (test, name) {
    name.push([test.name]);

    if (test.parent) {
      this.getTestName(test.parent, name);
    }

    return name;
  }
}

module.exports = E2ETestEnvironment;
