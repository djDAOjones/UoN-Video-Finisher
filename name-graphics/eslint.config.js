import { A11Y_HARNESS_FILES, layers, toolConfig } from '../eslint.base.js' // the repository's base config (UVT-3), the import boundaries in it (UVT-1, D9)
import tseslint from 'typescript-eslint'

/**
 * Name Graphics' ESLint config: the base every folder extends, with this
 * tool's own ignores and the root's layers it takes up. Strict on
 * correctness, silent on taste — per project/digests/house-conventions.md ->
 * Tooling. Formatting is Prettier's job and never fails the gate.
 */
export default toolConfig({
  tsconfigRootDir: import.meta.dirname,
  ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'tools/**'], // tools/ is pm-next v3's and the a11y pack's, linted upstream
  layers: [
    // the app pack's forms kind folded in here, its eslint.config.mjs and eslint.base.mjs not
    // copied (VNG-14): the type-checked set is on already; its escapes over src/, the
    // accessibility pack's jsx-a11y fragment (eslint.a11y.mjs's) and React's hook rules
    layers.escapes(),
    layers.jsxA11y(),
    layers.reactHooks(),
    {
      // the app pack's boundaries config, CommonJS, which no TypeScript program reads
      files: ['.dependency-cruiser.cjs'],
      extends: [tseslint.configs.disableTypeChecked],
      languageOptions: { sourceType: 'commonjs' },
    },
    layers.a11yHarness(), // the a11y pack's copied harness in tests/a11y/, never edited (UVT-7, VNG-14)
    {
      // its eight TypeScript files read by ESLint's project service in their own
      // project, tests/a11y/tsconfig.json; the layer keeps type-checked rules off
      files: A11Y_HARNESS_FILES.filter((f) => f.endsWith('.ts')).map((f) => `tests/a11y/${f}`),
      languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    },
  ],
})
