// VH-235 #2: S-78k's raw readings, group against group (ruling 1's re-walk). Every flattened field of each record,
// times, paths and run ids excepted; prints the page status text each group read and the fields that differ per pair.
// Usage: node raw78.mjs <walk dir> <groupA>:<groupB> [...]
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
const [WALK, ...pairs] = process.argv.slice(2)
const recs = (g) => { const r = join(WALK, g, 'runs'), d = readdirSync(r).find((x) => !x.endsWith('.jsonl')); return Object.fromEntries(readdirSync(join(r, d)).filter((f) => /^S-78k__.*\.json$/.test(f)).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(join(r, d, f), 'utf8'))])) }
const SKIP = /(^|\.)(at|ms|t|started|ended|elapsed|duration|durationMs|took|time|when|run|runId|path|file|dir|shot|screenshot|png|artifact|artifacts)(\.|$)|At$|Ms$/i
const flat = (o, p = '', out = {}) => { for (const [k, v] of Object.entries(o ?? {})) { const q = p + k; if (SKIP.test(q)) continue; if (v && typeof v === 'object') flat(v, q + '.', out); else out[q] = JSON.stringify(v) } return out }
const status = (c) => c.reached?.seen?.status ?? null
for (const pr of pairs) {
  const [ga, gb] = pr.split(':'), A = recs(ga), B = recs(gb); let same = 0
  console.log(`${ga} → ${gb}: ${Object.keys(A).length} and ${Object.keys(B).length} records`)
  for (const k of Object.keys(A).sort()) {
    const a = flat(A[k]), b = flat(B[k] ?? {}), moved = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((f) => a[f] !== b[f])
    if (!moved.length) { same++; continue }
    console.log(`  ${k}: ${moved.length} fields; status ${JSON.stringify(status(A[k]))} → ${JSON.stringify(status(B[k] ?? {}))}; ${moved.slice(0, 6).join(', ')}${moved.length > 6 ? ', …' : ''}`)
  }
  console.log(`  ${same} of ${Object.keys(A).length} identical`)
}
