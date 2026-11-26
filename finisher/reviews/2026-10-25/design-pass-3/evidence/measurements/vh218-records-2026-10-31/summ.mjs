// VH-218: a line per cell or row from a group's probes.  node summ.mjs <dir> <group> [filter]
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
const [dir, g, re] = process.argv.slice(2), r = join(dir, g, 'runs'), rx = re ? new RegExp(re) : null
for (const f of readdirSync(r).filter((x) => /probe/.test(x))) for (const j of readFileSync(join(r, f), 'utf8').trim().split('\n').map(JSON.parse)) {
  const m = j.modeRead ?? {}; console.log(`${j.cell}/${j.mode} ${m.fontPx}px d${+m.dark} f${+m.forced} s${+m.spacing} vw${m.vw} open${+j.open} over${j.overflow?.scrollWidth - j.overflow?.clientWidth}${j.error ? ' ERR ' + j.error : ''}`)
  for (const x of j.rows ?? []) { const l = `  ${x.id} ${x.state} [${x.mark}] m${x.markRead.lines}/${x.markRead.w}of${x.markRead.column} L${x.label.lines}w${x.label.box.w} V${x.value.lines} ${x.beneath ? 'beneath' : 'beside'} dy${x.markTopToLabel} "${x.value.text}" long=${x.label.longest?.t}:${x.label.longest?.w}${x.label.broken.length ? ' BROKEN ' + x.label.broken.map((b) => b.t + ':' + b.w).join(',') : ''}${x.value.broken.length ? ' VBROKEN ' + x.value.broken.map((b) => b.t).join(',') : ''}${x.past ? ' PAST' : ''}${x.failedToStart ? ' +FTS' + x.failedToStart.value.lines : ''}${x.stagedPending ? ' +SP' + x.stagedPending.label.lines : ''}`; if (!rx || rx.test(l)) console.log(l) }
  if (j.fact) console.log(`  fact dt${j.fact.dt.lines} dd${j.fact.dd.lines} "${j.fact.dd.text}" long=${j.fact.dd.longest?.t}:${j.fact.dd.longest?.w}`)
}
