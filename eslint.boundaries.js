/**
 * The import boundaries of UoN Video Tools, as an ESLint rule (UVT-1).
 *
 * D9, in the parent's rules: `shared/` imports from no tool; no tool imports
 * from another. Each relative or absolute import is resolved against the
 * importing file and judged by the top folder of where it lands: a file in
 * `shared/` may not reach `finisher/` or `name-graphics/`, and a file in one
 * tool may not reach the other. Packages, the importing tool's own folder,
 * `shared/` and the root's files (a tool's config extending the root's) are
 * allowed. CSS `@import` is not linted.
 *
 * Imported by the root's `eslint.config.js` and by each tool's, so one rule
 * holds in every folder.
 */
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'

export const ROOT = import.meta.dirname
export const TOOLS = ['finisher', 'name-graphics']
export const SHARED = 'shared'

/** The area an absolute path falls in: a tool's folder, `shared`, `root`, or `outside` the repository. */
export function areaOf(absolutePath) {
  const rel = relative(ROOT, absolutePath)
  if (rel === '') return 'root'
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return 'outside'
  const top = rel.split(sep)[0]
  if (TOOLS.includes(top)) return top
  return top === SHARED ? SHARED : 'root'
}

/** Why an import from `fromFile` of `specifier` crosses a boundary, or null when it may. */
export function crossing(fromFile, specifier) {
  if (typeof specifier !== 'string') return null
  if (!specifier.startsWith('.') && !specifier.startsWith('/')) return null // a package or an alias
  const clean = specifier.replace(/[?#].*$/, '')
  const from = areaOf(fromFile)
  const to = areaOf(resolve(dirname(fromFile), clean))
  if (from === SHARED && TOOLS.includes(to)) return { from, to }
  if (TOOLS.includes(from) && TOOLS.includes(to) && to !== from) return { from, to }
  return null
}

const rule = {
  meta: {
    type: 'problem',
    docs: { description: 'shared/ imports from no tool; no tool imports from another (D9)' },
    schema: [],
    messages: {
      crossing:
        "'{{specifier}}' reaches {{to}}/ from {{from}}/: shared/ imports from no tool, and no tool imports from another (D9, the parent's rules). Move the code to shared/ by a parent item.",
    },
  },
  create(context) {
    const file = context.filename
    const check = (node, source) => {
      const value =
        source &&
        (source.type === 'Literal'
          ? source.value
          : source.type === 'TSLiteralType'
            ? source.literal?.value
            : undefined)
      const found = crossing(file, value)
      if (found)
        context.report({ node, messageId: 'crossing', data: { specifier: value, ...found } })
    }
    return {
      ImportDeclaration: (node) => check(node, node.source),
      ExportAllDeclaration: (node) => check(node, node.source),
      ExportNamedDeclaration: (node) => check(node, node.source),
      ImportExpression: (node) => check(node, node.source),
      TSImportType: (node) => check(node, node.source ?? node.argument),
      TSExternalModuleReference: (node) => check(node, node.expression),
    }
  },
}

export const plugin = { meta: { name: 'uvt' }, rules: { boundaries: rule } }

/** The config block every folder's ESLint config includes. */
export const boundaries = {
  plugins: { uvt: plugin },
  rules: { 'uvt/boundaries': 'error' },
}
