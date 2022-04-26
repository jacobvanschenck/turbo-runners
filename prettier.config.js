module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    overrides: [
        {
            files: '*.sol',
            options: {
                printWidth: 80,
                tabWidth: 4,
                useTabs: true,
                singleQuote: false,
                bracketSpacing: true,
                explicitTypes: 'always',
            },
        },
    ],
}
