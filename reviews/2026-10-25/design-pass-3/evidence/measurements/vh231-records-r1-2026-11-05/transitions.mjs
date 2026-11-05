// VH-231 #5: S-171s and S-172s's transitions, read from a group's probes: in each cell whose driver read them, whether the
// finished card, "Keep it", "Previous video" and the final card give one record, the discard question and the question
// again carry it, and the card's warnings start with the cut-short title read before Create. Usage: node transitions.mjs <group> …
import { readdirSync, readFileSync } from 'node:fs'
for (const g of process.argv.slice(2)) {
  const c = {}
  const bump = (k) => (c[k] = (c[k] || 0) + 1)
  for (const f of readdirSync(`${g}/runs`).filter((x) => /probe/.test(x)))
    for (const l of readFileSync(`${g}/runs/${f}`, 'utf8').trim().split('\n')) {
      const j = JSON.parse(l)
      if (!/^S-17[12]s_/.test(j.cell)) continue
      bump('cells')
      const s = j.steps
      if (!s) { bump('noSteps'); continue }
      const cut = s.trimmed?.audioWarnings?.titles?.[0]
      const recOf = (x) => (x?.result?.lines || [])[1]
      const r = recOf(s.finished)
      for (const k of ['finished', 'kept', 'previous']) {
        if (recOf(s[k]) === r) bump(`${k}:sameRecord`)
        if (s[k]?.result?.warningTitles?.[0] === cut) bump(`${k}:cutFirst`)
      }
      for (const k of ['question', 'questionAgain']) {
        if (!s[k]) bump(`${k}:absent`)
        else if ((s[k].question?.text || '').includes(r)) bump(`${k}:carriesRecord`)
      }
      if (recOf(j) === r) bump('final:sameRecord')
      if (j.result?.warningTitles?.[0] === cut) bump('final:cutFirst')
    }
  console.log(g, JSON.stringify(c))
}
