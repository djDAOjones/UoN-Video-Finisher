import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { typeChecked } from './eslint.base.js'
import { boundaries } from './eslint.boundaries.js'

/**
 * The root's ESLint config, the parent's (UVT-1, UVT-2, UVT-3): the root's own
 * scripts and configs and `shared/`. Each tool lints its own folder with its own config;
 * the root gate names its paths, so it never lints a tool's.
 */
export default tseslint.config(
  { ignores: ['finisher/**', 'name-graphics/**', 'tools/**', 'node_modules/**', '_site/**'] }, // tools/ is pm-skills', linted upstream
  js.configs.recommended,
  boundaries,
  {
    // shared/ is linted as strictly as each tool: type-checked against
    // shared/tsconfig.json, the base's rules (eslint.base.js, UVT-3).
    files: ['shared/**/*.ts'],
    extends: [typeChecked(import.meta.dirname)],
  },
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      // Node's own globals, one at a time, as the tools declare them.
      globals: { console: 'readonly', process: 'readonly', URL: 'readonly' },
    },
  },
)
