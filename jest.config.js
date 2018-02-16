
module.exports = {
  verbose: true,
  rootDir: 'client',
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/test/setupTest.js',
    '<rootDir>/test/__mocks__/mockLocalStorage.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/components/NavigationBar',
    '<rootDir>/components/Footer',
    '<rootDir>/index.js',
    '<rootDir>/reducers/index.js',
    '<rootDir>/assets',
    '<rootDir>/coverage',
    '<rootDir>/scss',
    '<rootDir>/utils',
    '<rootDir>/validations',
    '<rootDir>/components/NotFound',
    '<rootDir>/components/common',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
