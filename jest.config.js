const packageJson = require("./package");

module.exports = {
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.stories.*",
        "!src/**/index.ts",
        "!src/enums/*",
    ],
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    displayName: packageJson.name,
    moduleNameMapper: {
        "\\.(gif|jpeg|jpg|otf|png|svg|ttf|woff|woff2)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.s?css$": "<rootDir>/__mocks__/styleMock.js",
    },
    transform: {
        "\\.tsx?$": "ts-jest",
    },
};
