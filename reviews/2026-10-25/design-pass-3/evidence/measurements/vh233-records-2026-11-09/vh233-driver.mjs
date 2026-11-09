// VH-233 #1's driver, modelled read-only on VH-203's (vh203-walk/vh203-driver.mjs, 2a9671cd). The pass's own runner (matrix.mjs), unchanged,
// walks a plan declared in memory, `PLANS['vh233']`: S-81's 45 keys as VH-203 walked them (42 of `PLANS.matrix`, and the three w320
// spacing keys of VH-203's added list) and its 18 neighbours (w320 and w375 in dark, forced light and forced dark, the three languages),
// each declared as the walker's plans declare S-81 ({ id, lang, view, mode }, nothing else). Nothing is written into the walker or the
// repository. `matrix.mjs vh233 --keys <file>` (VH-223's interface) runs as declared. It records power and both loads and the key list in a
// ledger line, and refuses off power.
//   APP_URL=… CDP_PORT=… FIX=… OUT_ROOT=… RUN_ROOT=… OUTD=… node vh233-driver.mjs walk --walker <dir> --label <l> --name <group> --keys <file>
//   RUN_ROOT=<any> node vh233-driver.mjs keys --walker <dir> --out <file>   (read-only: every key of the plan, one per line)
//   RUN_ROOT=<any> node vh233-driver.mjs count --walker <dir> --keys <file> (read-only: the records the list keeps, by view and mode)
import { pathToFileURL, fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'

const args = (() => { const a = process.argv.slice(2), o = { _: [] }; for (let i = 0; i < a.length; i++) { if (a[i].startsWith('--')) { const k = a[i].slice(2); if (a[i + 1] === undefined || a[i + 1].startsWith('--')) o[k] = true; else o[k] = a[++i] } else o._.push(a[i]) } return o })()
const PLAN = 'vh233'
const LANGS = ['en-GB', 'zh-Hans', 'ms-MY']
const W1280 = ['light', 'dark', 'forced-light', 'forced-dark', 'fallback', 'font32', 'reduced-motion', 'spacing']
const VIEWS = ['landscape', 'short', 'zoom200proxy', 'zoom400proxy']
const NEIGHBOUR_MODES = ['dark', 'forced-light', 'forced-dark']

/** The 63 records: per language, S-81's 15 (w1280 ×8, the four views, w375 light, w320 light and spacing), then the 18 neighbours. */
export function vh233Records() {
  const rec = (lang, view, mode) => ({ id: 'S-81', lang, view, mode })
  const s81 = LANGS.flatMap((lang) => [...W1280.map((m) => rec(lang, 'w1280', m)), ...VIEWS.map((v) => rec(lang, v, 'light')), rec(lang, 'w375', 'light'), rec(lang, 'w320', 'light'), rec(lang, 'w320', 'spacing')])
  const nb = LANGS.flatMap((lang) => ['w320', 'w375'].flatMap((v) => NEIGHBOUR_MODES.map((m) => rec(lang, v, m))))
  return [...s81, ...nb]
}

function power() {
  const sh = (cmd, a) => execFileSync(cmd, a, { encoding: 'utf8' })
  const batt = sh('pmset', ['-g', 'batt']), pm = sh('pmset', ['-g']), up = sh('uptime', []).trim()
  const ac = /AC Power/.test(batt), level = Number((batt.match(/(\d+)%/) ?? [])[1]), mode = Number((pm.match(/^\s*powermode\s+(\d+)/m) ?? [])[1])
  const la = up.match(/load averages?: ([\d.]+),? ([\d.]+),? ([\d.]+)/) ?? []
  return { at: new Date().toISOString(), source: ac ? 'AC' : 'battery', level, powermode: mode, load: Number(la[1]), load5: Number(la[2]), load15: Number(la[3]), ok: ac || (level > 50 && !(/lowpowermode\s+1/.test(pm) || mode === 1)) }
}
const keyFile = () => { if (typeof args.keys !== 'string') throw new Error('--keys <file> is required'); return resolve(args.keys) }

async function register(walker) {
  const at = (f) => import(pathToFileURL(join(walker, f)).href)
  const S = await at('scenarios.mjs'), { recordKey } = await at('runner.mjs')
  // The 42 S-81 keys PLANS.matrix declares must be declared there as here (the same four fields), or the driver refuses.
  const matrix = new Map(S.PLANS.matrix().filter((r) => r.id === 'S-81').map((r) => [recordKey(r), r]))
  const recs = vh233Records()
  for (const r of recs) { const m = matrix.get(recordKey(r)); if (m && JSON.stringify(m) !== JSON.stringify(r)) throw new Error('declared otherwise in PLANS.matrix: ' + recordKey(r) + ' ' + JSON.stringify(m)) }
  if (new Set(recs.map(recordKey)).size !== 63) throw new Error('not 63 distinct keys')
  S.PLANS[PLAN] = () => vh233Records()
  return { name: PLAN, records: recs, recordKey, inMatrix: (k) => matrix.has(k) }
}

async function walk() {
  for (const k of ['APP_URL', 'CDP_PORT', 'FIX', 'OUT_ROOT', 'RUN_ROOT', 'OUTD']) if (!process.env[k]) throw new Error('set ' + k)
  const walker = resolve(args.walker), label = args.label ?? 'after', file = keyFile(), bytes = readFileSync(file)
  const keys = String(bytes).split('\n').map((l) => l.trim()).filter(Boolean)
  const { name } = await register(walker)
  const matrixUrl = pathToFileURL(join(walker, 'matrix.mjs')).href, p = power()
  mkdirSync(process.env.RUN_ROOT, { recursive: true })
  appendFileSync(join(process.env.RUN_ROOT, 'vh233-ledger.jsonl'), JSON.stringify({ label, name: args.name, plan: name, power: p, walker, keys: { file, count: keys.length, sha1: createHash('sha1').update(bytes).digest('hex') }, args }) + '\n')
  if (!p.ok) { console.log('POWER-STOP'); process.exit(3) }
  process.argv = [process.argv[0], fileURLToPath(matrixUrl), name, '--keys', file]
  await import(matrixUrl)
}

async function count() {
  const walker = resolve(args.walker), { records } = await register(walker), { keepKeys } = await import(pathToFileURL(join(walker, 'matrix.mjs')).href)
  const keys = readFileSync(keyFile(), 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)
  const kept = keepKeys(records, keys), by = {}
  for (const r of kept) for (const t of [r.lang, r.view, r.mode]) by[t] = (by[t] ?? 0) + 1
  console.log('records', kept.length, JSON.stringify(by))
}

async function keysOut() {
  const walker = resolve(args.walker), { records, recordKey, inMatrix } = await register(walker)
  if (typeof args.out !== 'string') throw new Error('--out <file> is required')
  writeFileSync(resolve(args.out), records.map(recordKey).join('\n') + '\n')
  console.log(PLAN, records.length, 'keys to', args.out, '; in PLANS.matrix:', records.filter((r) => inMatrix(recordKey(r))).length)
}
if (args._[0] === 'walk') await walk()
else if (args._[0] === 'count') await count()
else if (args._[0] === 'keys') await keysOut()
else { console.log('usage: node vh233-driver.mjs walk|count|keys --walker <dir> [--label l --name n] --keys <file> | --out <file>'); process.exit(2) }
