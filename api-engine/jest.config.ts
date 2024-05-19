import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  collectCoverageFrom: [
    '**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/e2e/**/*.[jt]s?(x)',
    '**/__tests__/integration/**/*.[jt]s?(x)',
    '**/__tests__/unit/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  globalSetup: '<rootDir>/__tests__/jest/globalSetup.ts',
  globalTeardown: '<rootDir>/__tests__/jest/globalTeardown.ts',
  moduleDirectories: ['node_modules', 'src'],
};

export default config;
