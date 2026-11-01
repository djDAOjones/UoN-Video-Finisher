// VH-218: the two proof groups, cell by cell: the probe's fields, and the walker's own record outcomes.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
const D = process.argv[2]
const load = (g) => { const r = join(D, g, 'runs'); const f = readdirSync(r).find((x) => /probe/.test(x)); return Object.fromEntries(readFileSync(join(r, f), 'utf8').trim().split('\n').map(JSON.parse).map((j) => [j.cell + '/' + j.mode, j])) }
const A = load(process.argv[3]), B = load(process.argv[4])
const diff = (a, b, p, out) => { if (a && b && typeof a === 'object' && typeof b === 'object') { for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diff(a[k], b[k], p + '.' + k, out) } else if (a !== b) out.push(p + ': ' + JSON.stringify(a) + ' -> ' + JSON.stringify(b)) }
for (const k of Object.keys(A)) { const out = []; diff({ ...A[k], at: 0, walk: 0, plan: 0 }, { ...B[k], at: 0, walk: 0, plan: 0 }, '', out); console.log(k, out.length ? '\n  ' + out.join('\n  ') : 'identical') }
