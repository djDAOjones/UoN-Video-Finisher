import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import { boundaries } from './eslint.boundaries.js'

/**
 * The base ESLint config every folder extends (UVT-3): the root's `shared/`
 * and each tool. Strict on correctness, silent on taste, per the house
 * conventions -> Tooling; formatting is Prettier's job and never fails the gate.
 *
 * A tool's `eslint.config.js` is `toolConfig()` with its own ignores; the
 * root's applies `typeChecked()` to `shared/`. One copy of the rules.
 *
 * The app pack's layers (UVT-7) are offered as `layers`, each a folder opts
 * into in its own item (the Finisher's VH-250, Name Graphics' VNG-14) and the
 * root switches on for every folder at the phase's end (UVT-9):
 * `toolConfig({ ..., layers: [layers.escapes(), layers.jsxA11y(), ...] })`.
 * ESLint's recommended rules and the type-checked set are on already.
 */

/** The rules on top of typescript-eslint's recommended type-checked set. */
export const typeCheckedRules = {
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  // Taste rules stay off: a noisy rule that gets inline-disabled erodes
  // trust in the whole gate. The escapes layer turns this one on.
  '@typescript-eslint/no-non-null-assertion': 'off',
}

/**
 * The app pack's nine escape rules (signed 2026-11-11, P-escapes): explicit
 * any, unsafe operations on any, non-null assertions, ts-ignore and
 * ts-nocheck, and unchecked casts; `as const` and `satisfies` stay open.
 * On 2026-11-26 they raised 532 errors in the Finisher, none in Name Graphics.
 */
export const escapeRules = {
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unsafe-argument': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/ban-ts-comment': [
    'error',
    { 'ts-ignore': true, 'ts-nocheck': true, 'ts-expect-error': 'allow-with-description' },
  ],
  '@typescript-eslint/no-unsafe-type-assertion': 'error',
}

/**
 * The accessibility pack's copied harness files in `tests/a11y/`, as its
 * v5.0.3 installer writes them (its starter `project.mjs` is the project's own,
 * so not among them).
 */
export const A11Y_HARNESS_FILES = [
  'adaptation.spec.ts',
  'contrast.mjs',
  'graphics.mjs',
  'helpers.ts',
  'journeys.spec.ts',
  'keyboard.spec.ts',
  'known-bad/known-bad.spec.ts',
  'names.mjs',
  'playwright.config.ts',
  'sample.spec.ts',
  'states.spec.ts',
]

/**
 * The rules the accessibility pack's copied harness (`tests/a11y/`, never
 * edited) breaks under ours: it is the pack's code, judged upstream, so its
 * copied files get no type-checked linting and these off, while the folder's
 * own files there (`project.mjs`, its declarations) and its own tests keep
 * every rule. Each fired on the pack's v5.0.3 copy, untyped.
 */
export const a11yHarnessRules = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  'no-empty-pattern': 'off',
  'no-control-regex': 'off',
  'no-useless-escape': 'off',
}

/** The jsxA11y layer's one error on a `.jsx`. */
export const JSX_REFUSED =
  "A .jsx file: the stack's source is TypeScript, so write it as .tsx (UVT-7)."

/**
 * Each of `files` narrowed to `pattern`: a flat-config `files` entry that is
 * a list matches when all its patterns do, so the pattern joins each group.
 */
const within = (files, pattern) =>
  files.map((f) => (Array.isArray(f) ? [...f, pattern] : [f, pattern]))

/** The blocks of the layers `toolConfig()` applies already, so taking them there changes nothing. */
const ON_ALREADY = new WeakSet()
const onAlready = (blocks) => {
  for (const block of blocks) ON_ALREADY.add(block)
  return blocks
}

/**
 * The layers a folder composes, each a list of flat-config blocks; `files`
 * defaults to the pack's. `toolConfig()` already applies the first two to
 * every folder, in their place, and skips them when taken again; they are
 * named so a config can be composed from them.
 */
export const layers = {
  /** ESLint's own recommended rules (the pack's P-eslint-js). */
  recommended: () => onAlready([js.configs.recommended]),
  /**
   * typescript-eslint's recommended type-checked set and the rules above it,
   * scoped with its parser options to the files given (the pack's `src/`),
   * so a tooling `.mjs` is never handed to the project service.
   */
  typeChecked: (tsconfigRootDir, files = ['src/**/*.{ts,tsx}']) =>
    onAlready(
      tseslint.config({
        files,
        extends: [tseslint.configs.recommendedTypeChecked],
        languageOptions: { parserOptions: { projectService: true, tsconfigRootDir } },
        rules: typeCheckedRules,
      }),
    ),
  /** The escape rules over a folder's source (the app pack scopes them to `src/`). */
  escapes: (files = ['src/**/*.{ts,tsx}']) => ({ files, rules: escapeRules }),
  /**
   * The accessibility pack's fragment: eslint-plugin-jsx-a11y's strict set
   * over JSX and TSX. The stack's source is TypeScript (the app pack types it
   * alone) and the base lints no `.jsx`, so within the files given this layer
   * refuses a `.jsx`, one error naming the fix, beside these rules' findings;
   * `no-undef` and both `no-unused-vars` are off there, the file being refused
   * whole. A `.tsx` is read with no JSX pragma, as the `react-jsx` runtime.
   */
  jsxA11y: (files = ['**/*.{jsx,tsx}']) => [
    {
      files: within(files, '**/*.jsx'),
      extends: [tseslint.configs.disableTypeChecked],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: { ecmaFeatures: { jsx: true } },
      },
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-restricted-syntax': ['error', { selector: 'Program', message: JSX_REFUSED }],
      },
    },
    {
      // A TSX file the folder's config does not already parse (outside the
      // type-checked `src/` of a composed config) gets TypeScript's parser
      // and untyped set, so its types are not judged by JavaScript's rules.
      files: within(files, '**/*.tsx'),
      extends: [tseslint.configs.recommended],
      languageOptions: { parser: tseslint.parser, parserOptions: { jsxPragma: null } },
    },
    { ...jsxA11y.flatConfigs.strict, files: within(files, '**/*.{jsx,tsx}') },
  ],
  /** React's hook rules over TSX, as the pack's React starter takes them. */
  reactHooks: (files = ['src/**/*.tsx']) => ({
    files,
    extends: [reactHooks.configs.flat['recommended-latest']],
  }),
  /**
   * The copied accessibility harness, judged by the pack, not by these rules:
   * the pack's eleven copied files by name, never a file the project writes
   * beside them (`project.mjs`, its own journeys or declarations).
   */
  a11yHarness: (dir = 'tests/a11y') => {
    const copied = A11Y_HARNESS_FILES.map((f) => `${dir}/${f}`)
    return tseslint.config(
      {
        // typescript-eslint's parser and untyped set for the copied
        // TypeScript, so a config without them (the root's) reads it; the
        // copied .mjs keep ESLint's own rules, no-undef among them.
        files: copied.filter((f) => /\.ts$/.test(f)),
        extends: [tseslint.configs.recommended],
      },
      {
        files: copied,
        extends: [tseslint.configs.disableTypeChecked],
        rules: a11yHarnessRules,
      },
    )
  },
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

/**
 * A tool's whole config: everything but its own `ignores` and the layers it
 * takes up is the base. The layers come last, so each overrides the base.
 */
export function toolConfig({ tsconfigRootDir, ignores, layers: taken = [] }) {
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
    ...[taken].flat(Infinity).filter((block) => !ON_ALREADY.has(block)),
  )
}
