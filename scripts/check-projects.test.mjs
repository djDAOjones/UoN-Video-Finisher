// Tests for the TypeScript projects' layers and their check (UVT-7), run by `node --test` in the root gate.
// Each fixture is a folder in the system's temporary directory, its node_modules a link to the root's, its
// tsconfig files extending the root's layers by absolute path; nothing is written in the repository.
import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import {
  caseless,
  checkProjects,
  configPath,
  folderFiles,
  gitLocalVariables,
  parseArgs,
  sameBasename,
} from './check-projects.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TSC = join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc')
const TSESLINT = JSON.stringify(join(ROOT, 'node_modules/typescript-eslint/dist/index.js'))
const made = []
/** Whether the fixtures' disk ignores case, as macOS's usually does: probed where the fixtures are made. */
const CASELESS = caseless(realpathSync.native(tmpdir()))
/** Whether the root's TypeScript compares file names with case, which decides the trap's second form. */
const TS_CASED = createRequire(join(ROOT, 'package.json'))('typescript').sys
  .useCaseSensitiveFileNames
/** Git for a fixture: its own repository only, never one the caller's environment names. */
function git(cwd, ...args) {
  const env = { ...process.env }
  // Every Git variable, its trace destinations among them: a fixture's Git writes only in its own folder.
  for (const name of Object.keys(env)) if (name.startsWith('GIT_')) delete env[name]
  execFileSync('git', args, { cwd, env, stdio: 'ignore' })
}
after(() => made.forEach((d) => rmSync(d, { recursive: true, force: true })))

/** A fixture folder from `{ relativePath: contents }`; an object is a tsconfig whose `layers` become an absolute `extends`. */
function fixture(files) {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'uvt7-projects-')))
  made.push(dir)
  symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'))
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, rel)), { recursive: true })
    writeFileSync(join(dir, rel), typeof body === 'string' ? body : JSON.stringify(project(body)))
  }
  return dir
}
const project = ({ layers, ...rest }) => ({
  extends: layers.map((l) => join(ROOT, `tsconfig.${l}.json`)),
  ...rest,
})
/** An ESLint config typing TS and TSX through the project service, or with the given parser options instead. */
const eslintConfig = (
  parserOptions = 'projectService: true, tsconfigRootDir: import.meta.dirname',
) => `import tseslint from ${TSESLINT}
export default tseslint.config({ ignores: ['ignored/**'] }, { files: ['**/*.{ts,tsx}'], extends: [tseslint.configs.recommendedTypeChecked],
  languageOptions: { parserOptions: { ${parserOptions} } } })
`
/** An ESLint config that lints TS with ESLint's own JavaScript parser while claiming the project service. */
const jsParserConfig = `export default [{ files: ['**/*.ts'], languageOptions: { parserOptions: { projectService: true } } }]
`
/** An ESLint config whose processor hands ESLint no code block for a TS file, while claiming the project service. */
const processorConfig = `import tseslint from ${TSESLINT}
const none = { preprocess: () => [], postprocess: () => [] }
export default tseslint.config({ files: ['**/*.ts'], processor: none, extends: [tseslint.configs.recommendedTypeChecked],
  languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } } })
`

/** The compiler's diagnostic codes for `projectFile` in `dir`; none is a pass; a failure with no code is thrown. */
function tsc(dir, projectFile) {
  try {
    execFileSync(process.execPath, [TSC, '-p', projectFile], { cwd: dir, encoding: 'utf8' })
    return []
  } catch (e) {
    const codes = [...String(e.stdout).matchAll(/error (TS\d+)/g)].map((m) => m[1])
    if (!codes.length) throw e
    return codes
  }
}

test('a core reaching for the DOM fails; the same file passes as app code', () => {
  const dir = fixture({
    'src/core/title.ts': 'export const title = document.title\n',
    'tsconfig.core.json': { layers: ['core'], include: ['src/core'] },
    'tsconfig.app.json': { layers: ['app'], include: ['src/core'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.core.json'), ['TS2584'])
  assert.deepEqual(tsc(dir, 'tsconfig.app.json'), [])
})

test('a core reaching for Node fails: no ambient types', () => {
  const dir = fixture({
    'src/core/env.ts': 'export const home = process.env.HOME\n',
    'tsconfig.core.json': { layers: ['core'], include: ['src/core'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.core.json'), ['TS2591'])
})

test('a worker has its own scope and no DOM', () => {
  const dir = fixture({
    'src/workers/ok.ts':
      'self.onmessage = (e: MessageEvent<number>) => { postMessage(e.data + 1) }\nexport {}\n',
    'src/workers/bad.ts': 'export const t = window.name\n',
    'tsconfig.ok.json': { layers: ['worker'], include: ['src/workers/ok.ts'] },
    'tsconfig.bad.json': { layers: ['worker'], include: ['src/workers/bad.ts'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.ok.json'), [])
  assert.deepEqual(tsc(dir, 'tsconfig.bad.json'), ['TS2304'])
})

test('a test reads worker code and the DOM together', () => {
  const dir = fixture({
    'src/workers/store.ts':
      'export async function size(h: FileSystemSyncAccessHandle) { return h.getSize() }\n',
    'test/store.test.ts':
      "import { size } from '../src/workers/store'\nexport const both = [size, document.title] as const\n",
    'tsconfig.test.json': { layers: ['test'], include: ['src', 'test'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.test.json'), [])
})

test('the app reads React JSX and Carbon React under the base strictness', () => {
  const dir = fixture({
    'src/app-root.tsx':
      'import { Button } from \'@carbon/react\'\nexport const AppRoot = () => <Button kind="primary">Go</Button>\n',
    'tsconfig.app.json': { layers: ['app'], include: ['src'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.app.json'), [])
})

test('erasableSyntaxOnly is opted into by an extends array, and only there', () => {
  const dir = fixture({
    'src/kind.ts': 'export enum Kind { A }\n',
    'tsconfig.app.json': { layers: ['app'], include: ['src'] },
    'tsconfig.erasable.json': { layers: ['app', 'erasable'], include: ['src'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.app.json'), [])
  assert.deepEqual(tsc(dir, 'tsconfig.erasable.json'), ['TS1294'])
})

test("the harness's layer relaxes the five checks for its folder; the tests' layer keeps them", () => {
  const code =
    'export function names(list, unusedParameter?: string) {\n  const unusedLocal = 1\n  const out = []\n  for (const n of list) out.push(n)\n  return out\n}\nexport function first(o: { a?: number }) { return o.a.toFixed() }\nexport const blank: { a?: number } = { a: undefined }\n'
  const dir = fixture({
    'tests/a11y/helpers.ts': code,
    'tsconfig.a11y.json': { layers: ['a11y'], include: ['tests/a11y'] },
    'tsconfig.test.json': { layers: ['test'], include: ['tests/a11y'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.a11y.json'), [])
  const strict = tsc(dir, 'tsconfig.test.json')
  for (const code of ['TS7006', 'TS18048', 'TS2375'])
    assert.ok(strict.includes(code), `${code} under the tests' layer: ${strict.join(', ')}`)
  assert.equal(
    strict.filter((c) => c === 'TS6133').length,
    2,
    'the unused local and the unused parameter',
  )
})

test('the trap: TypeScript keeps main.ts and drops the main.tsx beside it, silently', () => {
  const dir = fixture({
    'src/main.ts': 'export const ok = 1\n',
    'src/main.tsx': 'export const broken: number = "not a number"\n',
    'tsconfig.app.json': { layers: ['app'], include: ['src/main.ts', 'src/main.tsx'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.app.json'), [])
  assert.deepEqual(sameBasename(join(dir, 'src/main.tsx')), [join(dir, 'src/main.ts')])
})

test('a basename is compared case ignored, declarations aside; a linked sibling counts, a folder does not', () => {
  const dir = fixture({
    'src/Main.ts': '',
    'src/main.tsx': '',
    'src/app-root.tsx': '',
    'src/app-root.d.ts': '',
    'src/real/view.ts': '',
    'src/view.tsx': '',
    'src/box.ts': '',
    'src/box.tsx/keep': '',
  })
  symlinkSync('real/view.ts', join(dir, 'src/view.ts'))
  assert.deepEqual(sameBasename(join(dir, 'src/main.tsx')), [join(dir, 'src/Main.ts')])
  assert.deepEqual(sameBasename(join(dir, 'src/app-root.tsx')), [])
  assert.deepEqual(sameBasename(join(dir, 'src/view.tsx')), [join(dir, 'src/view.ts')])
  assert.deepEqual(sameBasename(join(dir, 'src/box.ts')), [])
})

test('on a disk that ignores case, TypeScript drops main.tsx beside Main.ts too; where case counts, it reads both', () => {
  const dir = fixture({
    'src/Main.ts': 'export const ok = 1\n',
    'src/main.tsx': 'export const broken: number = "not a number"\n',
    'tsconfig.json': { layers: ['app'], include: ['src/Main.ts', 'src/main.tsx'] },
  })
  assert.deepEqual(tsc(dir, 'tsconfig.json'), TS_CASED ? ['TS2322'] : [])
})

test('the check fails a twin entry, an orphan source and an orphan declaration', async () => {
  const dir = fixture({
    'src/main.ts': 'export const ok = 1\n',
    'src/main.tsx': 'export const ok = 2\n',
    'src/lost/orphan.ts': 'export const orphan = 1\n',
    'types/orphan.d.ts': 'declare const lost: number\n',
    'tsconfig.app.json': { layers: ['app'], include: ['src/main.ts', 'src/main.tsx'] },
  })
  const problems = await checkProjects({
    projects: ['tsconfig.app.json'],
    entries: ['src/main.tsx'],
    cwd: dir,
  })
  assert.ok(
    problems.some((p) => /^src\/main\.tsx: main\.ts beside it shares its basename/.test(p)),
    problems.join('\n'),
  )
  assert.ok(problems.some((p) => /^src\/main\.tsx: read by none/.test(p)))
  assert.ok(problems.some((p) => /^src\/lost\/orphan\.ts: read by none/.test(p)))
  assert.ok(problems.some((p) => /^types\/orphan\.d\.ts: read by none/.test(p)))
})

test('a project that skips checking reads nothing; a project or a folder that yields no file is a problem', async () => {
  const dir = fixture({
    'src/app.ts': 'export const app = 1\n',
    'tsconfig.nocheck.json': {
      layers: ['app'],
      compilerOptions: { noCheck: true },
      include: ['src'],
    },
    'tsconfig.empty.json': { layers: ['app'], files: [], include: [] },
  })
  const problems = await checkProjects({
    projects: ['tsconfig.nocheck.json', 'tsconfig.empty.json'],
    cwd: dir,
  })
  assert.ok(
    problems.includes(
      'tsconfig.nocheck.json: skips checking (noCheck), so it is given no file here',
    ),
    problems.join('\n'),
  )
  assert.ok(problems.includes("tsconfig.empty.json: reads no TypeScript file of the folder's own"))
  assert.ok(
    problems.includes('src/app.ts: read by none of tsconfig.nocheck.json, tsconfig.empty.json'),
  )
  const stats = fixture({
    'src/app.ts': 'export const app = 1\n',
    'tsconfig.json': { layers: ['app'], include: ['src'] },
    'tsconfig.stats.json': {
      layers: ['app'],
      compilerOptions: { extendedDiagnostics: true },
      files: [],
      include: [],
    },
  })
  const counted = await checkProjects({
    projects: ['tsconfig.json', 'tsconfig.stats.json'],
    cwd: stats,
  })
  assert.ok(
    counted.includes("tsconfig.stats.json: reads no TypeScript file of the folder's own"),
    'extended diagnostics are no file list',
  )
  const bare = fixture({ 'tsconfig.json': { layers: ['app'], files: ['../no.ts'] } })
  const none = await checkProjects({ projects: ['tsconfig.json'], cwd: bare })
  assert.ok(
    none.some((p) => /no TypeScript file found in the folder$/.test(p)),
    none.join('\n'),
  )
})

test('a folder named as a project means its tsconfig.json, as for tsc -p', async () => {
  const dir = fixture({
    'tool/src/app.ts': 'export const app = 1\n',
    'tool/tsconfig.json': { layers: ['app'], include: ['src'] },
  })
  assert.equal(configPath('tool', dir), join(dir, 'tool/tsconfig.json'))
  assert.deepEqual(await checkProjects({ projects: ['.'], cwd: join(dir, 'tool') }), [])
})

test('a project named in another case is the same project where the disk ignores case', async () => {
  const dir = fixture({
    'tool/src/app.ts': 'export const app = 1\n',
    'tool/tsconfig.json': { layers: ['app'], include: ['src'] },
  })
  const problems = await checkProjects({
    projects: ['../TOOL/tsconfig.json'],
    cwd: join(dir, 'tool'),
  })
  const missing = (path) =>
    `${path}: the compiler could not read it: TS5058: the specified path does not exist: '${path}'`
  if (CASELESS) assert.deepEqual(problems, [])
  else assert.ok(problems.includes(missing('../TOOL/tsconfig.json')), problems.join('\n'))
  // On every disk: a missing path, and a folder with no tsconfig.json, as tsc -p reports them.
  const absent = await checkProjects({
    projects: ['../NOPE/tsconfig.json', 'src'],
    cwd: join(dir, 'tool'),
  })
  assert.ok(absent.includes(missing('../NOPE/tsconfig.json')), absent.join('\n'))
  assert.ok(absent.some((p) => /^src: the compiler could not read it: TS5057: /.test(p)))
})

test('an entry outside the folder, a folder, a declaration or a path through a file is refused, each reported', async () => {
  const dir = fixture({
    'tool/src/app.ts': 'export const app = 1\n',
    'tool/src/env.d.ts': 'declare const env: string\n',
    'other/src/main.ts': 'export const main = 1\n',
    'tool/tsconfig.json': { layers: ['app'], include: ['src'] },
  })
  const problems = await checkProjects({
    projects: ['tsconfig.json'],
    entries: ['../other/src/main.ts', 'src', 'src/env.d.ts', 'src/app.ts/bad.ts'],
    cwd: join(dir, 'tool'),
  })
  assert.deepEqual(problems, [
    '../other/src/main.ts: an entry is a TypeScript file in this folder, not a declaration',
    'src: an entry is a TypeScript file in this folder, not a declaration',
    'src/env.d.ts: an entry is a TypeScript file in this folder, not a declaration',
    'src/app.ts/bad.ts: an entry is a TypeScript file in this folder, not a declaration',
  ])
})

test('an entry is its true path on disk: another case passes where the disk ignores case, and fails where it does not', async () => {
  const dir = fixture({
    'src/main.ts': 'export const main = 1\n',
    'tsconfig.json': { layers: ['app'], include: ['src/main.ts'] },
    'eslint.config.js': eslintConfig(),
  })
  for (const entry of ['src/Main.ts', 'SRC/main.ts']) {
    const problems = await checkProjects({
      projects: ['tsconfig.json'],
      entries: [entry],
      cwd: dir,
    })
    assert.deepEqual(
      problems,
      CASELESS ? [] : [`${entry}: an entry is a TypeScript file in this folder, not a declaration`],
      entry,
    )
  }
})

test("the check passes an entry of its own read by the compiler and linted through ESLint's project service", async () => {
  const dir = fixture({
    'src/app-root.tsx': 'export const AppRoot = () => <main>Hello</main>\n',
    'src/core/sum.ts': 'export const sum = (a: number, b: number) => a + b\n',
    'tsconfig.json': { layers: ['app'], include: ['src'], exclude: ['src/core'] },
    'tsconfig.core.json': { layers: ['core'], include: ['src/core'] },
    'eslint.config.js': eslintConfig(),
  })
  assert.deepEqual(
    await checkProjects({ projects: ['tsconfig.json'], entries: ['src/app-root.tsx'], cwd: dir }),
    ['src/core/sum.ts: read by none of tsconfig.json'],
    'the second project is what reads the core',
  )
  assert.deepEqual(
    await checkProjects({
      projects: ['tsconfig.json', 'tsconfig.core.json'],
      entries: ['src/app-root.tsx'],
      cwd: dir,
    }),
    [],
  )
})

test('ESLint without a TypeScript program holding the entry fails it; a coverage problem does not hide that', async () => {
  const cases = {
    'projectService off': eslintConfig('projectService: false'),
    'project instead of projectService': eslintConfig(
      "project: './tsconfig.json', tsconfigRootDir: import.meta.dirname",
    ),
    "ESLint's own parser": jsParserConfig,
    "ESLint's own parser, its findings disabled in the file": jsParserConfig,
    'a processor that yields no code': processorConfig,
    'a processor that hands over other text': processorConfig.replace(
      'preprocess: () => []',
      "preprocess: () => ['export {}']",
    ),
    'a parser with no program, claiming the service': `import tseslint from ${TSESLINT}
const parser = { parseForESLint: (code, o) => tseslint.parser.parseForESLint(code, { ...o, projectService: false, project: undefined }) }
export default [{ files: ['**/*.ts'], languageOptions: { parser, parserOptions: { projectService: true } } }]
`,
    'a processor that hands over a block importing the entry': processorConfig
      .replace(
        'preprocess: () => []',
        "preprocess: () => [{ text: \"import '../app-root'\\nexport {}\\n\", filename: 'block.ts' }]",
      )
      .replace('postprocess: () => []', 'postprocess: (m) => m.flat()'),
  }
  for (const [name, config] of Object.entries(cases)) {
    const dir = fixture({
      'src/app-root.ts': `${name.includes('disabled') ? '/* eslint-disable */\n' : ''}export const appRoot = 1\n`,
      'src/lost.ts': 'export const lost = 1\n',
      'tsconfig.json': { layers: ['app'], include: ['src/app-root.ts'] },
      'eslint.config.js': config,
    })
    const problems = await checkProjects({
      projects: ['tsconfig.json'],
      entries: ['src/app-root.ts'],
      cwd: dir,
    })
    assert.ok(
      problems.some((p) => /^src\/lost\.ts: read by none/.test(p)),
      `${name}: ${problems.join('; ')}`,
    )
    assert.ok(
      problems.some((p) =>
        /^src\/app-root\.ts: ESLint (does not lint it through the TypeScript project service|did not lint it in a TypeScript program)/.test(
          p,
        ),
      ),
      `${name}: ${problems.join('; ')}`,
    )
  }
  const ignored = fixture({
    'ignored/app-root.tsx': 'export const AppRoot = () => <main>Hello</main>\n',
    'tsconfig.json': { layers: ['app'], include: ['ignored'] },
    'eslint.config.js': eslintConfig(),
  })
  const why = await checkProjects({
    projects: ['tsconfig.json'],
    entries: ['ignored/app-root.tsx'],
    cwd: ignored,
  })
  assert.ok(
    why.some((p) => /did not lint it in a TypeScript program: File ignored/.test(p)),
    why.join('\n'),
  )
})

test('with the project service off ESLint still lints, and its parsing failure is reported beside', async () => {
  const dir = fixture({
    'src/app-root.ts': 'export const = 1\n',
    'tsconfig.json': { layers: ['app'], include: ['src'] },
    'eslint.config.js': `export default [{ files: ['**/*.ts'], languageOptions: { parser: (await import(${TSESLINT})).default.parser } }]\n`,
  })
  const problems = await checkProjects({
    projects: ['tsconfig.json'],
    entries: ['src/app-root.ts'],
    cwd: dir,
  })
  assert.ok(
    problems.includes(
      'src/app-root.ts: ESLint does not lint it through the TypeScript project service',
    ),
    problems.join('\n'),
  )
  assert.ok(
    problems.some((p) => /^src\/app-root\.ts: ESLint did not lint it .*: Parsing error/.test(p)),
  )
})

test('an entry the compiler omits is still probed: both failures are reported', async () => {
  const dir = fixture({
    'src/main.ts': 'export const main = 1\n',
    'ignored/app-root.tsx': 'export const AppRoot = () => <main>Hello</main>\n',
    'tsconfig.json': { layers: ['app'], include: ['src'] },
    'eslint.config.js': eslintConfig(),
  })
  const problems = await checkProjects({
    projects: ['tsconfig.json'],
    entries: ['ignored/app-root.tsx'],
    cwd: dir,
  })
  assert.ok(
    problems.includes('ignored/app-root.tsx: an entry no project reads'),
    problems.join('\n'),
  )
  assert.ok(
    problems.some((p) => /^ignored\/app-root\.tsx: ESLint did not lint it .*File ignored/.test(p)),
  )
})

test('a throwing ESLint config is reported beside the problems already found', async () => {
  const dir = fixture({
    'src/app-root.ts': 'export const appRoot = 1\n',
    'tsconfig.json': { layers: ['app'], include: ['src/app-root.ts'] },
    'eslint.config.js': 'throw new Error("broken config")\n',
  })
  const problems = await checkProjects({
    projects: ['tsconfig.json'],
    entries: ['src/app-root.ts', 'src/none.ts'],
    cwd: dir,
  })
  assert.equal(problems.length, 2, problems.join('\n'))
  assert.match(problems[0], /^src\/none\.ts: an entry is/)
  assert.match(problems[1], /^src\/app-root\.ts: ESLint could not lint it: .*broken config/)
})

test('a broken Git checkout is an error, never a silent walk, and the other findings stand beside it', async () => {
  const dir = fixture({
    'src/app.ts': 'export const app = 1\n',
    '.git': `gitdir: ${join(tmpdir(), 'uvt7-no-such-git')}\n`,
    'tsconfig.json': { layers: ['app'], include: ['src'] },
  })
  assert.throws(() => folderFiles(dir), /not a git repository/)
  const problems = await checkProjects({ projects: ['tsconfig.json', 'missing.json'], cwd: dir })
  assert.ok(
    problems.some((p) => /^missing\.json: /.test(p)),
    problems.join('\n'),
  )
  assert.ok(
    problems.some((p) => /Git could not list the folder's files: .*not a git repository/.test(p)),
  )
})

test('a syntax error is reported with its place and hides no file the program holds; a missing input and an options conflict are reported', async () => {
  const dir = fixture({
    'src/main.ts': 'export const main = 1\n',
    'test/broken.test.ts': 'export const broken = (\n',
    'tsconfig.json': { layers: ['app'], include: ['src', 'test'] },
    'tsconfig.gone.json': { layers: ['app'], files: ['src/main.ts', 'src/gone.ts'] },
    'tsconfig.clash.json': {
      layers: ['app'],
      compilerOptions: { outFile: 'out.js', module: 'esnext' },
      include: ['src'],
    },
  })
  const problems = await checkProjects({ projects: ['tsconfig.json'], cwd: dir })
  assert.ok(
    problems.length && problems.every((p) => /^tsconfig\.json: TS\d+ .*broken\.test\.ts:/.test(p)),
    problems.join('\n'),
  )
  assert.match(
    problems[0],
    /^tsconfig\.json: TS1109 .*test\/broken\.test\.ts:\d+:\d+: Expression expected/,
  )
  const more = await checkProjects({
    projects: ['tsconfig.json', 'tsconfig.gone.json', 'tsconfig.clash.json'],
    cwd: dir,
  })
  assert.ok(
    more.some((p) => /^tsconfig\.gone\.json: TS6053/.test(p)),
    more.join('\n'),
  )
  assert.ok(
    more.some((p) => /^tsconfig\.clash\.json: TS5053 /.test(p)),
    more.join('\n'),
  )
  assert.ok(!more.some((p) => /read by none/.test(p)))
})

test("a project reading only a dependency's declaration counts for nothing; a project path is taken as tsc -p takes it", async () => {
  const dir = fixture({
    '.gitignore': 'node_modules\nvendor/\n',
    'src/main.ts': 'export const main = 1\n',
    'vendor/lib.d.ts': 'declare const lib: number\n',
    'tsconfig.json': { layers: ['app'], include: ['src'] },
    'tsconfig.vendor.json': { layers: ['app'], files: ['vendor/lib.d.ts'] },
  })
  git(dir, 'init', '-q')
  assert.deepEqual(
    await checkProjects({ projects: ['tsconfig.json', 'tsconfig.vendor.json'], cwd: dir }),
    ["tsconfig.vendor.json: reads no TypeScript file of the folder's own"],
  )
  assert.equal(resolve(configPath('.\\tsconfig.json', dir)), join(dir, 'tsconfig.json'))
  assert.throws(() => configPath('tsconfig.json/', dir), /TS5058/)
})

test('a project whose only input is not TypeScript counts for nothing', async () => {
  const dir = fixture({
    'src/main.ts': 'export const main = 1\n',
    'data.json': '{}\n',
    'tsconfig.json': { layers: ['app'], include: ['src'] },
    'tsconfig.json-only.json': {
      layers: ['app'],
      compilerOptions: { resolveJsonModule: true },
      files: ['data.json'],
    },
  })
  assert.ok(
    (
      await checkProjects({ projects: ['tsconfig.json', 'tsconfig.json-only.json'], cwd: dir })
    ).includes("tsconfig.json-only.json: reads no TypeScript file of the folder's own"),
  )
})

test('an entry path the system cannot open as written is refused: through a file, a literal backslash, .. out of a linked folder', async () => {
  const dir = fixture({
    'tool/src/main.ts': 'export const main = 1\n',
    'tool/real/deep/keep': '',
    'tool/tsconfig.json': { layers: ['app'], include: ['src'] },
    'tool/eslint.config.js': eslintConfig(),
  })
  const tool = join(dir, 'tool')
  symlinkSync('real/deep', join(tool, 'hop'))
  const entries = ['src/main.ts/.', 'hop/../src/main.ts']
  if (process.platform !== 'win32') entries.push('src\\main.ts')
  const problems = await checkProjects({ projects: ['tsconfig.json'], entries, cwd: tool })
  assert.deepEqual(
    problems,
    entries.map((e) => `${e}: an entry is a TypeScript file in this folder, not a declaration`),
  )
})

test('git for the fixtures writes nothing where the environment points', () => {
  const sentinel = realpathSync(mkdtempSync(join(tmpdir(), 'uvt7-sentinel-')))
  made.push(sentinel)
  const repo = fixture({ 'a.ts': 'export const a = 1\n' })
  const saved = Object.fromEntries(gitLocalVariables().map((k) => [k, process.env[k]]))
  process.env.GIT_INDEX_FILE = join(sentinel, 'index')
  process.env.GIT_OBJECT_DIRECTORY = join(sentinel, 'objects')
  try {
    git(repo, 'init', '-q')
    git(repo, 'add', 'a.ts')
    assert.deepEqual(readdirSync(sentinel), [])
    assert.deepEqual(
      folderFiles(repo).map((f) => f.slice(repo.length + 1)),
      ['a.ts'],
    )
  } finally {
    for (const [k, v] of Object.entries(saved))
      if (v === undefined) delete process.env[k]
      else process.env[k] = v
  }
})

test('an entry TypeScript classes as a declaration is refused, whatever its middle extension', async () => {
  const dir = fixture({
    'src/entry.d.css.ts': 'declare const css: string\nexport default css\n',
    'tsconfig.json': { layers: ['app'], include: ['src'] },
  })
  assert.deepEqual(
    await checkProjects({ projects: ['tsconfig.json'], entries: ['src/entry.d.css.ts'], cwd: dir }),
    ['src/entry.d.css.ts: an entry is a TypeScript file in this folder, not a declaration'],
  )
})

test("an entry's path is walked as written: a missing folder before .. is refused; the folder named in another case is the folder where the disk ignores case", async () => {
  const dir = fixture({
    'tool/src/main.ts': 'export const main = 1\n',
    'tool/tsconfig.json': { layers: ['app'], include: ['src'] },
    'tool/eslint.config.js': eslintConfig(),
  })
  const tool = join(dir, 'tool')
  assert.deepEqual(
    await checkProjects({
      projects: ['tsconfig.json'],
      entries: ['src/nope/../main.ts'],
      cwd: tool,
    }),
    ['src/nope/../main.ts: an entry is a TypeScript file in this folder, not a declaration'],
  )
  const recased = await checkProjects({
    projects: ['tsconfig.json'],
    entries: ['../TOOL/src/main.ts'],
    cwd: tool,
  })
  assert.deepEqual(
    recased,
    CASELESS
      ? []
      : ['../TOOL/src/main.ts: an entry is a TypeScript file in this folder, not a declaration'],
  )
})

test("Git's own variables never point the check at another repository, inside a checkout or out", () => {
  const other = fixture({ 'elsewhere.ts': '' })
  git(other, 'init', '-q')
  const plain = fixture({ 'src/app.ts': '' })
  const repo = fixture({ 'src/app.ts': '' })
  git(repo, 'init', '-q')
  const saved = { GIT_DIR: process.env.GIT_DIR, GIT_WORK_TREE: process.env.GIT_WORK_TREE }
  process.env.GIT_DIR = join(other, '.git')
  process.env.GIT_WORK_TREE = other
  try {
    for (const dir of [plain, repo])
      assert.deepEqual(
        folderFiles(dir).map((f) => f.slice(dir.length + 1)),
        ['src/app.ts'],
        dir,
      )
  } finally {
    for (const [k, v] of Object.entries(saved))
      if (v === undefined) delete process.env[k]
      else process.env[k] = v
  }
})

test('a linked entry keeps its own path: a link the compiler does not read fails, a link out of the folder is refused', async () => {
  const dir = fixture({
    'tool/src/main.ts': 'export const main = 1\n',
    'tool/dist/keep': '',
    'outside/app-root.ts': 'export const out = 1\n',
    'tool/tsconfig.json': { layers: ['app'], include: ['src'] },
    'tool/eslint.config.js': eslintConfig(),
  })
  symlinkSync('../src/main.ts', join(dir, 'tool/dist/entry.ts'))
  symlinkSync('../../outside/app-root.ts', join(dir, 'tool/src/app-root.ts'))
  const problems = await checkProjects({
    projects: ['tsconfig.json'],
    entries: ['dist/entry.ts', 'src/app-root.ts'],
    cwd: join(dir, 'tool'),
  })
  assert.ok(problems.includes('dist/entry.ts: an entry no project reads'), problems.join('\n'))
  assert.ok(
    problems.includes(
      'src/app-root.ts: an entry is a TypeScript file in this folder, not a declaration',
    ),
    problems.join('\n'),
  )
})

test('with no entry named, ESLint is not run', async () => {
  const dir = fixture({
    'src/app.ts': 'export const app = 1\n',
    'tsconfig.json': { layers: ['app'], include: ['src'] },
    'eslint.config.js': 'throw new Error("ESLint was loaded")\n',
  })
  assert.deepEqual(await checkProjects({ projects: ['tsconfig.json'], cwd: dir }), [])
})

test('in a Git checkout: tracked and untracked files count, ignored ones do not, a link is its own path', async () => {
  const dir = fixture({
    '.gitignore': 'node_modules\nbuild/\n',
    'tool/src/tracked.ts': 'export const t = 1\n',
    'tool/src/untracked.ts': 'export const u = 1\n',
    'tool/build/ignored.ts': 'export const i = 1\n',
    'tool/tsconfig.json': { layers: ['app'], include: ['src/tracked.ts', 'src/untracked.ts'] },
  })
  git(dir, 'init', '-q')
  git(dir, 'add', '.gitignore', 'tool/src/tracked.ts', 'tool/tsconfig.json')
  symlinkSync('tracked.ts', join(dir, 'tool/src/alias.ts'))
  const tool = join(dir, 'tool')
  assert.deepEqual(
    folderFiles(tool)
      .map((f) => f.slice(tool.length + 1))
      .sort(),
    ['src/alias.ts', 'src/tracked.ts', 'src/untracked.ts'],
  )
  assert.deepEqual(await checkProjects({ projects: ['tsconfig.json'], cwd: tool }), [
    'src/alias.ts: read by none of tsconfig.json',
  ])
})

test('the arguments: --project and --entry, each at least once', () => {
  assert.deepEqual(
    parseArgs(['--project', 'a.json', '--entry', 'src/x.tsx', '--project', 'b.json']),
    {
      projects: ['a.json', 'b.json'],
      entries: ['src/x.tsx'],
    },
  )
  assert.equal(parseArgs(['--entry', 'src/x.tsx']), null)
  assert.equal(parseArgs(['--project', 'a.json']), null, "a tool's gate names its entry")
  assert.equal(parseArgs(['--project']), null)
  assert.equal(parseArgs(['--project', 'a.json', '--other', 'x']), null)
})
