// VH-233 #2's reader of vh233-probe.mjs's records (read only): per cell and link, the walker's focusArea reading (2.4.13's area at 3:1
// against the fragments' 2 px perimeter, 2.4.7's :focus-visible, 1.4.11's best ratio), the fragments, the widest overlap between
// consecutive lines, the ring in the viewport and the fragments' hit tests (2.4.11, 2.4.12); the Tab arrival per cell; and, given two
// groups, each cell's before → after. Writes Markdown to stdout.
//   node vh233-probe-read.mjs <group dir> [<group dir>]   (candidate "as built" only: the trials are the design probes')
import { readFileSync } from 'node:fs'
import { join, basename } from 'node:path'
const dirs = process.argv.slice(2)
const read = (d) => readFileSync(join(d, 'vh233-probe.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l))
const rows = (d) => {
  const by = new Map()
  for (const r of read(d)) {
    const c = by.get(r.key) ?? { key: r.key, reached: null, keys: null, links: {}, errors: [] }
    if (r.what === 'reached') c.reached = r.outcome
    else if (r.what === 'keys') c.keys = r
    else if (r.what === 'error') c.errors.push(r.error)
    else if (r.what === 'link' && r.candidate === 'as built') c.links[r.link] = r
    by.set(r.key, c)
  }
  return by
}
const one = (l) => {
  if (!l) return 'none'
  const f = l.focusArea, g = l.focused
  const over = Math.max(-Infinity, ...(g.pairs ?? []).map((p) => p.xOverlap))
  return `${f.outcome} ${f.areaAt3to1}/${f.perimeter2px} (${f.areaAt3to1 - f.perimeter2px >= 0 ? '+' : ''}${f.areaAt3to1 - f.perimeter2px}) frags ${f.readings?.fragments ?? '?'}` +
    ` overlap ${Number.isFinite(over) ? over : '-'} fv ${f.focusVisible} ratio ${f.bestRatio} offset ${g.outline.offset} width ${g.outline.width} inVP ${g.ringInViewport} hits ${g.fragmentCentresHitLink.every(Boolean)}`
}
const sets = dirs.map(rows)
const keys = [...new Set(sets.flatMap((s) => [...s.keys()]))]
const out = []
const label = dirs.map((d) => basename(d)).join(' → ')
out.push(`# vh233-probe readings, ${label}`, '')
for (const [i, s] of sets.entries()) {
  const tally = { cells: s.size, reached: 0, contact: 0, service: 0, keysOk: 0, errors: 0, minMargin: Infinity, minRatio: Infinity }
  for (const c of s.values()) {
    if (c.reached === 'pass') tally.reached++
    if (c.keys?.ok) tally.keysOk++
    tally.errors += c.errors.length
    for (const n of ['contact', 'service']) {
      const f = c.links[n]?.focusArea
      if (f?.outcome === 'pass') tally[n]++
      if (f) { tally.minMargin = Math.min(tally.minMargin, f.areaAt3to1 - f.perimeter2px); tally.minRatio = Math.min(tally.minRatio, f.bestRatio) }
    }
  }
  out.push(`- **${basename(dirs[i])}:** ${tally.cells} cells, ${tally.reached} reached; contact link passes ${tally.contact}, service link ${tally.service}; Tab arrival ok ${tally.keysOk}; errors ${tally.errors}; smallest margin ${tally.minMargin} px²; lowest best ratio ${tally.minRatio}.`)
}
out.push('', '| Cell | Link | ' + dirs.map((d) => basename(d)).join(' | ') + ' |', '| --- | --- | ' + dirs.map(() => '---').join(' | ') + ' |')
for (const k of keys) for (const n of ['contact', 'service']) out.push(`| ${k.replace('S-81__', '')} | ${n} | ` + sets.map((s) => one(s.get(k)?.links[n])).join(' | ') + ' |')
out.push('', '| Cell | Tab arrival ' + dirs.map((d) => basename(d)).join(' | ') + ' |', '| --- | ' + dirs.map(() => '---').join(' | ') + ' |')
for (const k of keys) out.push(`| ${k.replace('S-81__', '')} | ` + sets.map((s) => { const t = s.get(k)?.keys; return t ? `${t.ok ? 'ok' : 'NOT ok'}: ` + t.steps.map((x) => `${x.key}→${x.want} ${x.geom.focused && x.geom.focusVisible ? 'focused' : 'not focused (' + x.active + ')'}${x.geom.ringInViewport ? '' : ' ring out of view'}${x.geom.fragmentCentresHitLink.every(Boolean) ? '' : ' hit miss'}`).join('; ') : 'none' }).join(' | ') + ' |')
console.log(out.join('\n'))
