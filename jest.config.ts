import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};

export default config;