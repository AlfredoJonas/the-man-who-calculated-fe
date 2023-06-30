import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom', // Update the test environment to "jsdom"
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  preset: 'ts-jest',
};

export default config;