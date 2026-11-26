// VH-232 #3: read-only sum of a side's probe and states readings. For each status-setting cell (the status says one of the feedback
// rows): whole (every line box in the dialog's client area and the window), complete, the focused control's box and ring in view, and
// the clip rule of VH-222's row probe (FLAWED: shown and clipped by an ancestor, or not whole). Controls: the status empty, the dialog's
// scrollTop. Routes: each reading's whole, focus and scroll. Cells reached come from the walker's own records.
//   node vh232-sum.mjs <walk dir> <group>[,<group>…] [--json out.json]
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const [walk, gs, flag, outJson] = process.argv.slice(2)
const jsonl = (p) => readFileSync(p, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l))
const probe = [], states = [], reached = {}
for (const g of gs.split(',')) {
  const runs = join(walk, g, 'runs')
  if (!existsSync(runs)) { console.log('no runs', g); continue }
  for (const e of readdirSync(runs)) {
    const p = join(runs, e)
    if (statSync(p).isDirectory()) { for (const f of readdirSync(p).filter((x) => /__.*\.json$/.test(x) && !/__(ax|page)/.test(x))) { const j = JSON.parse(readFileSync(join(p, f), 'utf8')); reached[f.replace('.json', '')] = { status: j.status, reached: j.reached?.outcome, why: j.reached?.problems?.slice?.(0, 2) ?? j.error?.slice?.(0, 160) } } }
    else if (/-probe-.*\.jsonl$/.test(e)) probe.push(...jsonl(p).map((j) => ({ ...j, group: g })))
    else if (/-states-.*\.jsonl$/.test(e)) states.push(...jsonl(p).map((j) => ({ ...j, group: g })))
  }
}
const focusOk = (f) => !f?.box || (f.boxInClient && f.boxInWin && f.ringInClient && f.ringInWin)
const flawed = (j) => j.keys?.length && (j.clip?.length || !j.whole)
const out = { reached: { cells: Object.keys(reached).length, pass: Object.values(reached).filter((r) => r.reached === 'pass').length, notReached: Object.entries(reached).filter(([, r]) => r.reached !== 'pass').map(([k, r]) => `${k} ${JSON.stringify(r)}`) }, status: {}, controls: {}, routes: {} }
for (const j of probe) {
  const set = j.keys?.length > 0
  if (set) {
    const s = (out.status[j.id] ??= { cells: 0, whole: 0, complete: 0, focusInView: 0, flawed: [], notWhole: [], focusOut: [], pageScrollY: {} })
    s.cells++; if (j.whole) s.whole++; if (j.complete) s.complete++; if (focusOk(j.focus)) s.focusInView++; else s.focusOut.push(`${j.cell} ${j.focus?.el}`)
    if (flawed(j)) s.flawed.push(`${j.cell} ${j.status.t}-${j.status.b} in ${j.dialog.client.t}-${j.dialog.client.b} top ${j.dialog.scrollTop}`)
    if (!j.whole) s.notWhole.push(j.cell)
  } else {
    const c = (out.controls[j.id] ??= { cells: 0, empty: 0, scrollTop: {}, focus: {} })
    c.cells++; if ((j.text ?? '') === '') c.empty++; c.scrollTop[j.dialog?.scrollTop] = (c.scrollTop[j.dialog?.scrollTop] ?? 0) + 1; c.focus[j.focus?.el] = (c.focus[j.focus?.el] ?? 0) + 1
  }
}
for (const j of states) {
  const k = `${j.which} ${j.state}`
  const r = (out.routes[k] ??= { n: 0, whole: 0, focusInView: 0, focus: {}, atTop: 0, atEnd: 0, flawed: [] })
  r.n++; if (j.whole) r.whole++; if (focusOk(j.focus)) r.focusInView++; r.focus[j.focus?.el] = (r.focus[j.focus?.el] ?? 0) + 1
  if (j.open && j.dialog.scrollTop === 0) r.atTop++
  if (j.open && Math.abs(j.dialog.scrollTop - (j.dialog.scrollHeight - j.dialog.clientHeight)) <= 1) r.atEnd++
  if (j.open && flawed(j)) r.flawed.push(`${j.lang} ${j.view} ${j.status.t}-${j.status.b} in ${j.dialog.client.t}-${j.dialog.client.b}`)
}
console.log(`cells ${out.reached.cells}, reached ${out.reached.pass}${out.reached.notReached.length ? '; not reached: ' + out.reached.notReached.join(' | ') : ''}`)
for (const [id, s] of Object.entries(out.status)) console.log(`status ${id.padEnd(6)} cells ${s.cells} whole ${s.whole} complete ${s.complete} focus-in-view ${s.focusInView} FLAWED ${s.flawed.length}${s.flawed.length ? ': ' + s.flawed.join('; ') : ''}${s.focusOut.length ? ' | focus out: ' + s.focusOut.join('; ') : ''}`)
for (const [id, c] of Object.entries(out.controls)) console.log(`control ${id.padEnd(6)} cells ${c.cells} empty ${c.empty} scrollTop ${JSON.stringify(c.scrollTop)} focus ${JSON.stringify(c.focus)}`)
for (const [k, r] of Object.entries(out.routes)) console.log(`route ${k.padEnd(22)} n ${r.n} whole ${r.whole} focus-in-view ${r.focusInView} at-top ${r.atTop} at-end ${r.atEnd} focus ${JSON.stringify(r.focus)}${r.flawed.length ? ' FLAWED ' + r.flawed.length + ': ' + r.flawed.join('; ') : ''}`)
if (flag === '--json') writeFileSync(outJson, JSON.stringify(out, null, 1))
