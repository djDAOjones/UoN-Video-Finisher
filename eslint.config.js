import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { A11Y_HARNESS_FILES, layers, typeChecked } from './eslint.base.js'
import { boundaries } from './eslint.boundaries.js'

/**
 * The root's ESLint config, the parent's (UVT-1, UVT-2, UVT-3): the root's own
 * scripts and configs, `shared/` and the accessibility pack's `tests/a11y/`
 * (UVT-8). Each tool lints its own folder with its own config; the root gate
 * names its paths, so it never lints a tool's.
 */
export default tseslint.config(
  // tools/ is pm-skills' and the a11y pack's, linted upstream
  { ignores: ['finisher/**', 'name-graphics/**', 'tools/**', 'node_modules/**', '_site/**'] },
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
  // The a11y pack's copied harness in tests/a11y/, never edited (UVT-7, UVT-8),
  // as each tool takes it (VH-249, VNG-14).
  layers.a11yHarness(),
  {
    // its eight TypeScript files read by ESLint's project service in their own
    // project, tests/a11y/tsconfig.json; the layer keeps type-checked rules off
    files: A11Y_HARNESS_FILES.filter((f) => f.endsWith('.ts')).map((f) => `tests/a11y/${f}`),
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
  },
)
