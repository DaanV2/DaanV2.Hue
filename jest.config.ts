import type { Config } from "@jest/types";

export const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts", "**/*.spec.ts"],
    moduleDirectories: ["node_modules"],
    forceExit: true,
    testTimeout: 30 * 60 * 1000,

    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "reports/jest-junit",
                suiteName: "Integration Tests",
                suiteNameTemplate: "{title}",
                classNameTemplate: "{classname}",
                titleTemplate: "{title}",
                ancestorSeparator: " > ",
            },
        ],
    ],

    // A map from regular expressions to paths to transformers
    transform: {
        "^.+\\.(ts|tsx)?$": [
            "ts-jest",
            {
                diagnostics: {
                    warnOnly: true,
                },
            },
        ],
    },

    verbose: true,
};

export default config;
