module.exports = {
  root: true,
  ignorePatterns: ['node_modules', 'dist', 'build', 'public', '.next'],
  extends: [
    'airbnb',
    'turbo',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'unused-imports', 'prettier', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  rules: {
    'simple-import-sort/exports': 'error',
    semi: ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['multiline-const', 'multiline-expression', 'block', 'function', 'if', 'block-like', 'return'],
      },
    ],
  },
  settings: {},
}
