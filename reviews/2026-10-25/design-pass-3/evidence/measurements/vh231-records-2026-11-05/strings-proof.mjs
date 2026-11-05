// VH-231 #4's strings proof, after vh216-walk/strings-proof-2.mjs: run from $W with the base SHA. For each table, the base's
// and the tree's messages, flattened by key: added, removed and changed keys. Then index.html, and the filled sheet row by row.
// Node strips the tables' types itself; the base's tables are written to a scratch folder given as the second argument.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
const [base, scratch] = process.argv.slice(2)
const show = (p) => execFileSync('git', ['show', `${base}:${p}`], { encoding: 'utf8', maxBuffer: 1 << 26 })
const flat = (o, pre = '', out = {}) => { for (const [k, v] of Object.entries(o)) { const key = pre ? `${pre}.${k}` : k; if (typeof v === 'string') out[key] = v; else if (v && typeof v === 'object') flat(v, key, out) } return out }
mkdirSync(scratch, { recursive: true })
for (const [p, name] of [['src/i18n/en-GB.ts', 'enGB'], ['src/i18n/zh-Hans.ts', 'zhHans'], ['src/i18n/ms-MY.ts', 'msMY']]) {
  const b = join(scratch, 'base-' + p.split('/').pop()); writeFileSync(b, show(p))
  const was = flat((await import(pathToFileURL(b).href))[name]), now = flat((await import(pathToFileURL(join(process.cwd(), p)).href))[name])
  const added = Object.keys(now).filter((k) => !(k in was)), removed = Object.keys(was).filter((k) => !(k in now)), changed = Object.keys(now).filter((k) => k in was && was[k] !== now[k])
  console.log(p, 'messages', Object.keys(was).length, '->', Object.keys(now).length, '; added', JSON.stringify(added.map((k) => [k, now[k]])), '; removed', removed.length, '; changed', JSON.stringify(changed))
}
console.log('index.html', show('index.html') === readFileSync('index.html', 'utf8') ? 'identical' : 'DIFFERS')
const csv = 'reviews/2026-10-18/VH-105-strings-filled.csv'
const a = show(csv).split('\r\n'), c = readFileSync(csv, 'utf8').split('\r\n')
const key = (l) => l.split(',', 1)[0], A = new Map(a.map((l) => [key(l), l])), C = new Map(c.map((l) => [key(l), l]))
console.log('filled sheet lines', a.length, '->', c.length, '; added', JSON.stringify([...C.keys()].filter((k) => !A.has(k))), '; removed', [...A.keys()].filter((k) => !C.has(k)).length, '; changed', JSON.stringify([...C.keys()].filter((k) => A.has(k) && A.get(k) !== C.get(k))))
