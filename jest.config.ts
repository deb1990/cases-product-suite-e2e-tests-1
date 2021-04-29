import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/tests/**/(*.)spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};

export default config;
