import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Catch awaitable calls that weren't awaited (common Playwright mistake)
      '@typescript-eslint/no-floating-promises': 'error',

      // Enforce explicit return types on page object methods
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
      }],

      // Disallow test.only leaking into commits (CI enforces this too)
      'no-restricted-properties': [
        'error',
        { object: 'test', property: 'only', message: 'Do not commit test.only()' },
      ],
    },
  },
];
