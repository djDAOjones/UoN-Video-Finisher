import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { boundaries } from './eslint.boundaries.js'

/**
 * The root's ESLint config, the parent's (UVT-1): the root's own scripts and
 * configs and `shared/`. Each tool lints its own folder with its own config;
 * the root gate names its paths, so it never lints a tool's.
 */
export default tseslint.config(
  { ignores: ['finisher/**', 'name-graphics/**', 'tools/**', 'node_modules/**', '_site/**'] }, // tools/ is pm-skills', linted upstream
  js.configs.recommended,
  { files: ['**/*.ts'], extends: [...tseslint.configs.recommended] },
  boundaries,
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      // Node's own globals, one at a time, as the tools declare them.
      globals: { console: 'readonly', process: 'readonly', URL: 'readonly' },
    },
  },
)
