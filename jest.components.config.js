module.exports = {
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "bower_components", "shared"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testMatch:[
    "<rootDir>/app/src/**/*.test.js?(x)"
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: 'jsdom',
};