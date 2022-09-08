module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: false,
  Semicolons: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.ts',
      options: {
        printWidth: 380,
      },
    },
  ],
};
