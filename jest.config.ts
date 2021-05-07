import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/tests/**/(*.)spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globalTeardown: '<rootDir>/gulp-tasks/jest-helper/global/teardown.js',
  testRunner: 'jest-circus/runner',
  testEnvironment: './gulp-tasks/jest-helper/environments/e2e-test-environment',
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'Cases Product Suite E2E Test Report',
      includeFailureMsg: true,
      outputPath: './test-report/test-report.html'
    }]
  ]
};

export default config;
