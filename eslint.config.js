import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { boundaries } from './eslint.boundaries.js'

/**
 * The root's ESLint config, the parent's (UVT-1, UVT-2): the root's own
 * scripts and configs and `shared/`. Each tool lints its own folder with its own config;
 * the root gate names its paths, so it never lints a tool's.
 */
export default tseslint.config(
  { ignores: ['finisher/**', 'name-graphics/**', 'tools/**', 'node_modules/**', '_site/**'] }, // tools/ is pm-skills', linted upstream
  js.configs.recommended,
  boundaries,
  {
    // shared/ is linted as strictly as the Finisher lints the code it came
    // from: type-checked against shared/tsconfig.json, the same rules (UVT-2).
    files: ['shared/**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      // Node's own globals, one at a time, as the tools declare them.
      globals: { console: 'readonly', process: 'readonly', URL: 'readonly' },
    },
  },
)
