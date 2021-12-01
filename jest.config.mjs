export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./scripts/jest.setup.ts'],
  moduleNameMapper: {
    '#src/(.*)': '<rootDir>/src/$1',
    '#framework/(.*)': '<rootDir>/src/framework/$1',
    '#routers/(.*)': '<rootDir>/src/routers/$1',
    '#model/(.*)': '<rootDir>/src/model/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true,
    },
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|js)'],
}
