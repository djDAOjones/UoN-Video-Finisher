// The JSDoc ratchet's guard (UVT-8). The pack's ratchet (tools/jsdoc-ratchet.mjs, canon's, copied unedited) counts
// the compiler's error lines. But tsc reports no semantic diagnostic anywhere while an option, global or syntactic one
// stands, so one that ESLint never sees, such as a malformed `/// <reference>` directive, hides every other: the count
// falls and the ratchet passes. A configuration diagnostic, even one tsc prints beside the semantic ones (a missing
// comma in the tsconfig), is counted as source debt and could enter the baseline (UVT-7.8). This guard runs first,
// with the root's TypeScript over the same tsconfig.jsdoc.json and the ratchet's forced options, and fails on any of
// them, so the ratchet only ever compares the compiler's full count. A malformed JSDoc type is not among them: tsc
// reports it beside the rest, and the ratchet counts it.
//
// usage: node scripts/jsdoc-guard.mjs [--project <tsconfig>]   (default tsconfig.jsdoc.json, from the working folder)
// `npm run jsdoc` runs it before the ratchet; pass the ratchet's modes through it, `npm run jsdoc -- --lower`, never
// to tools/jsdoc-ratchet.mjs alone.
// Exit 0 none, 1 some (each printed), 2 cannot run.
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

/** The options the ratchet forces on the compiler, so the guard reads what the ratchet measures. */
const FORCED = { noEmit: true, allowJs: true, checkJs: true, noCheck: false, incremental: false, composite: false }

/**
 * The diagnostics that stop tsc reporting the rest, or that the ratchet would count as source debt: the
 * configuration's, the options', the global ones and each file's syntactic ones, each as tsc prints it uncoloured.
 *
 * @param {string} project the tsconfig file's path
 * @returns {string[]} one line per diagnostic; none when the ratchet's count is whole
 */
export function blockingDiagnostics(project) {
  /** @type {import('typescript').Diagnostic[]} */
  const found = []
  const host = { ...ts.sys, onUnRecoverableConfigFileDiagnostic: (/** @type {import('typescript').Diagnostic} */ d) => found.push(d) }
  const config = ts.getParsedCommandLineOfConfigFile(resolve(project), FORCED, host)
  if (config) {
    found.push(...ts.getConfigFileParsingDiagnostics(config))
    const program = ts.createProgram({ rootNames: config.fileNames, options: config.options, projectReferences: config.projectReferences })
    found.push(...program.getOptionsDiagnostics(), ...program.getGlobalDiagnostics(), ...program.getSyntacticDiagnostics())
  }
  const format = { getCanonicalFileName: (/** @type {string} */ f) => f, getCurrentDirectory: () => process.cwd(), getNewLine: () => '\n' }
  return found.map((d) => ts.formatDiagnostic(d, format).trim())
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  const project = args.length === 0 ? 'tsconfig.jsdoc.json' : args[0] === '--project' && args.length === 2 ? args[1] : null
  if (!project) {
    console.error('usage: node scripts/jsdoc-guard.mjs [--project <tsconfig>]')
    process.exit(2)
  }
  /** @type {string[]} */
  let lines
  try {
    lines = blockingDiagnostics(project)
  } catch (error) {
    console.error(`jsdoc-guard: cannot run: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(2)
  }
  if (lines.length) {
    console.error(`jsdoc-guard: ${lines.length} diagnostic(s) that hide the rest of the count or are not source debt; fix them before the ratchet:`)
    for (const line of lines) console.error(line)
    process.exit(1)
  }
  console.log(`jsdoc-guard: no configuration, option, global or syntactic diagnostic in ${project}; the ratchet counts in full`)
}
