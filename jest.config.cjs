/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(firebase)/)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // ✅ use custom setup file
};