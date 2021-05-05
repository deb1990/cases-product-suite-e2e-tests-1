import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/tests/**/(*.)spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'Cases Product Suite E2E Test Report',
      includeFailureMsg: true
    }]
  ]
};

export default config;
