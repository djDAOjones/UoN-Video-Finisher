// VH-235 #2: the late route's reader, outside the walker. Reads <walk>/<before>/late.jsonl and <walk>/<after>/late.jsonl
// and prints, cell by cell, every field that moved (the cell's start time excepted), each move named expected or not.
// Expected: in the 18 late cells (after Close, Escape, a close and reopen), the result no longer written after the settle:
// afterSettle.text, and afterSettle's scrollHeight and clientHeight where the open dialog no longer grows by the line.
// Also: the qualification (the stand-in's texts and warns equal to the real clipboard's under F5, same opening, each
// language and outcome, full text), and the after's checks (nothing written late; next opening empty; one warn per failure).
// Usage: node late-sum.mjs <walk dir> <before> <after>
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
const [WALK, GA, GB] = process.argv.slice(2)
const file = (g) => join(WALK, g, 'late.jsonl')
const rd = (g) => Object.fromEntries(readFileSync(file(g), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)).map((r) => [r.name, r]))
const sha = (g) => createHash('sha1').update(readFileSync(file(g))).digest('hex')
const A = rd(GA), B = rd(GB)
const flat = (o, pre = '', out = {}) => { for (const [k, v] of Object.entries(o ?? {})) { if (v && typeof v === 'object' && !Array.isArray(v)) flat(v, `${pre}${k}.`, out); else out[`${pre}${k}`] = JSON.stringify(v) } return out }
const late = (r) => r.kind === 'late' && ['close', 'escape', 'reopen'].includes(r.step)
const EXPECTED = new Set(['afterSettle.text', 'afterSettle.scrollHeight', 'afterSettle.clientHeight'])
const L = []
const p = (s) => L.push(s)
p(`late route: ${GA} → ${GB}`)
p(`${GA}/late.jsonl sha1 ${sha(GA)}, ${Object.keys(A).length} cells, ${Object.values(A).filter((r) => r.ok).length} reached`)
p(`${GB}/late.jsonl sha1 ${sha(GB)}, ${Object.keys(B).length} cells, ${Object.values(B).filter((r) => r.ok).length} reached`)
p('')
p('Qualification (same opening, w1280 light): the stand-in against the real clipboard under F5, full text and warns')
for (const [g, R] of [[GA, A], [GB, B]]) for (const lang of ['en-GB', 'zh-Hans', 'ms-MY']) for (const o of ['resolved', 'rejected']) {
  const real = R[`real-${lang}-w1280-same-${o}`], qual = R[`qual-${lang}-w1280-same-${o}`]
  const eq = real?.ok && qual?.ok && real.afterSettle.text === qual.afterSettle.text && real.afterSettle.text !== '' && real.warns.length === qual.warns.length
  p(`  ${g} ${lang} ${o}: ${eq ? 'EQUAL' : 'DIFFER'} (text ${JSON.stringify(qual?.afterSettle?.text ?? null)}; warns real ${real?.warns?.length} stand-in ${qual?.warns?.length})`)
}
p('')
p(`Checks on ${GB}'s 18 late cells: after-settle text equal to before-settle text (nothing written); next opening empty (Close, Escape); warns 1 on failure, 0 on success`)
let checks = 0, bad = 0
for (const r of Object.values(B).filter(late)) {
  checks++
  const nothing = r.ok && r.afterSettle.text === r.beforeSettle.text
  const next = r.nextOpening ? r.nextOpening.text === '' : true
  const warn = r.ok && r.warns.length === (r.outcome === 'rejected' ? 1 : 0)
  if (!(nothing && next && warn)) { bad++; p(`  FAILS ${r.name}: nothing written ${nothing}, next opening empty ${next}, warns ${r.warns?.length}`) }
}
p(`  ${checks - bad} of ${checks} hold`)
p('')
p('Cell by cell, every field that moved (started excepted)')
let unmoved = 0, expectedOnly = 0, findings = 0
for (const [k, a] of Object.entries(A)) {
  const b = B[k]
  if (!b) { p(`  ${k}: not in ${GB}`); findings++; continue }
  const fa = flat(a), fb = flat(b), moved = []
  for (const f of new Set([...Object.keys(fa), ...Object.keys(fb)])) if (f !== 'started' && fa[f] !== fb[f]) moved.push(f)
  if (!moved.length) { unmoved++; continue }
  const odd = moved.filter((f) => !(late(a) && EXPECTED.has(f)))
  if (odd.length) findings++; else expectedOnly++
  p(`  ${k}: ${moved.map((f) => `${f} ${fa[f] ?? '-'} → ${fb[f] ?? '-'}${odd.includes(f) ? ' [NOT EXPECTED]' : ''}`).join('; ')}`)
}
for (const k of Object.keys(B)) if (!A[k]) { p(`  ${k}: not in ${GA}`); findings++ }
p('')
p(`Summary: ${Object.keys(A).length} cells; ${unmoved} unmoved; ${expectedOnly} moved by the expected fields only; ${findings} with a move not expected`)
console.log(L.join('\n'))
