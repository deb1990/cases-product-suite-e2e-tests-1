import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/tests/**/(*.)spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRunner: 'jest-circus/runner',
  testEnvironment: './src/environments/e2e-test-environment.js',
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
