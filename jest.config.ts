export default {
    roots: ["<rootDir>/src"],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/main/server.ts",
        "!<rootDir>/src/main/config/**",
        "!<rootDir>/src/main/adapters/**",
        "!<rootDir>/src/**/protocols/**",
        "!<rootDir>/src/**/models/**",
        "!<rootDir>/src/**/*-protocols.ts",
        "!<rootDir>/src/**/*-protocol.ts",
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    preset: "@shelf/jest-mongodb",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
};
