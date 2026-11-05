// Sum of the before's probes: per ID and language, the distinct readings and the cell count.
import { readFileSync } from 'node:fs'
const files = process.argv.slice(2)
const rows = files.flatMap((f) => readFileSync(f, 'utf8').trim().split('\n').map((l) => JSON.parse(l)))
const by = new Map()
const rec = (lines) => (lines || []).find((l) => /cut-short|lecture|truncated|silent|clicks/.test(l)) ?? null
for (const r of rows) {
  const [id, lang] = r.cell.split('__')
  const k = `${id} ${lang}`
  const o = by.get(k) ?? { n: 0, err: 0, v: new Map() }
  o.n++
  if (r.error) o.err++
  const sig = JSON.stringify({
    res: r.res, trim: r.trim, aw: r.audioWarnings?.titles?.length ? r.audioWarnings.titles : undefined,
    wt: r.result?.warningTitles?.length ? r.result.warningTitles : undefined,
    rec: r.result ? rec(r.result.lines)?.replace(/^.*?: /, '').slice(0, 70) : undefined,
    st: (r.status || '').slice(0, 60), open: r.props?.open, dur: r.props?.rows?.[0]?.[1],
    ovf: r.overflow && r.overflow.scrollWidth > r.overflow.clientWidth ? 'OVF' : undefined,
  })
  o.v.set(sig, (o.v.get(sig) ?? 0) + 1)
  by.set(k, o)
}
console.log('records', rows.length)
for (const [k, o] of by) {
  console.log(`${k}: ${o.n} cells${o.err ? `, ${o.err} probe errors` : ''}, ${o.v.size} reading(s)`)
  for (const [s, n] of o.v) console.log(`   ${n}× ${s}`)
}
