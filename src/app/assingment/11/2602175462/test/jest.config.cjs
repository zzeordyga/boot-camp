const { transform } = require("next/dist/build/swc/generated-native");
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transformIgnorePatterns: [
    "/node_modules/(?!firebase)/"
  ],
  
  transform: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);