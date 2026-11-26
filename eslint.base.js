import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { boundaries } from './eslint.boundaries.js'

/**
 * The base ESLint config every folder extends (UVT-3): the root's `shared/`
 * and each tool. Strict on correctness, silent on taste, per the house
 * conventions -> Tooling; formatting is Prettier's job and never fails the gate.
 *
 * A tool's `eslint.config.js` is `toolConfig()` with its own ignores; the
 * root's applies `typeChecked()` to `shared/`. One copy of the rules.
 */

/** The rules on top of typescript-eslint's recommended type-checked set. */
export const typeCheckedRules = {
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  // Taste rules stay off: a noisy rule that gets inline-disabled erodes
  // trust in the whole gate.
  '@typescript-eslint/no-non-null-assertion': 'off',
}

/**
 * Node's own globals for tooling scripts, declared one at a time rather than
 * pulled from a `globals` package — that would be a dependency for a lookup table.
 */
export const nodeGlobals = {
  console: 'readonly',
  process: 'readonly',
  URL: 'readonly',
  fetch: 'readonly',
  setTimeout: 'readonly',
  AbortSignal: 'readonly',
  WebSocket: 'readonly',
}

/** Type-checked linting, each file against its nearest tsconfig.json. */
export function typeChecked(tsconfigRootDir) {
  return [
    ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: { projectService: true, tsconfigRootDir },
      },
      rules: typeCheckedRules,
    },
  ]
}

/** A tool's whole config: everything but its own `ignores` is the base. */
export function toolConfig({ tsconfigRootDir, ignores }) {
  return tseslint.config(
    { ignores },
    js.configs.recommended,
    boundaries,
    ...typeChecked(tsconfigRootDir),
    {
      // Node tooling scripts: not part of the app bundle, not type-checked
      // against the app's tsconfig, and they legitimately use Node globals.
      files: ['**/*.mjs', 'scripts/**/*.js'],
      extends: [tseslint.configs.disableTypeChecked],
      languageOptions: { globals: nodeGlobals },
    },
    {
      files: ['**/*.js'],
      extends: [tseslint.configs.disableTypeChecked],
    },
  )
}
