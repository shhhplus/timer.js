// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  coverageReporters: ['clover', 'json', 'lcov', 'text', 'cobertura'],

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],
};
