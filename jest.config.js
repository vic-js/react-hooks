module.exports = {
  browser: true,
  verbose: true,
  rootDir: __dirname,
  setupFilesAfterEnv: ['<rootDir>/tools/test-setup.js'],
  // moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleDirectories: ["node_modules", "/src"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '/__test__/.*\\.spec\\.tsx?$',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/__test__/**', '!src/index.ts'],
  coverageReporters: ['lcov', 'html']
}
