module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/client/test/', 'html$'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'html'],
    transformIgnorePatterns: ['node_modules/.+\\.js$'],
    modulePaths: ['node_modules'],
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    testURL: 'https://localhost/',
    watchPathIgnorePatterns: ['/node_modules/'],
    globals: {
        'ts-jest': {
            tsConfig: 'src/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html$',
            astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
        },
    },
};
