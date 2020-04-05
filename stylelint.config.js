module.exports = {
    extends: [
        "stylelint-config-recommended",
        "stylelint-config-sass-guidelines",
    ],
    rules: {
        indentation: 4,
        "function-parentheses-space-inside": "never-single-line",
        "max-line-length": 80,
        "max-nesting-depth": null,
        "selector-class-pattern": null,
        "selector-max-id": 1,
        "string-quotes": "double",
    },
    ignoreFiles: ["dist/**/*.css"],
};
