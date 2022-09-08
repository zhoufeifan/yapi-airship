module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  env: {
    node: true,
    browser: true,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-empty': 'off',
    'no-unused-vars': 'off',
    'no-constant-condition': 'off',
  },
};
