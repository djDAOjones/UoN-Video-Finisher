// VH-235 #1: the 45 matrix keys a side, and which walker plans declare them (read-only).
import { pathToFileURL } from 'node:url'
const WK = process.env.WALKER
const { PLANS } = await import(pathToFileURL(WK + '/scenarios.mjs'))
const { recordKey } = await import(pathToFileURL(WK + '/runner.mjs'))
const L = ['en-GB', 'zh-Hans', 'ms-MY'], keys = []
for (const id of ['S-80a', 'S-80b', 'S-78k']) for (const lang of L) {
  for (const view of ['w1280', 'w375', 'w320']) keys.push(`${id}__${lang}__${view}__light`)
  keys.push(`${id}__${lang}__w320__spacing`)
}
for (const lang of L) for (const view of ['w1280', 'w375', 'w320']) keys.push(`S-76__${lang}__${view}__light`)
if (process.argv[2] === 'list') { console.log(keys.join('\n')); process.exit(0) }
for (const [name, f] of Object.entries(PLANS)) {
  let recs; try { recs = f() } catch { continue }
  const have = new Set(recs.map(recordKey)); const n = keys.filter((k) => have.has(k)).length
  if (n) console.log(name, n, 'of', keys.length, 'plan size', recs.length)
}
