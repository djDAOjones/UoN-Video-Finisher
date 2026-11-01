// VH-218 #1's driver, from VH-217's: the stage rule's cells by the pass's own runner (matrix.mjs), unchanged, on a plan in memory, with a read-only probe in each scenario's `afterMode`.
// In memory only: S-82-pending, S-82-warned and S-82-failed are declared beside S-82; the modes `dark-spacing`, `forced-light-spacing`, `forced-dark-spacing` run setMode (which reads the prefix) and add the walker's own spacing sheet.
// Two swaps, each set and restored inside one evaluate: the failed worker row's other wording, "Failed to start"; and, in the pending state, the three rows that cannot be seen pending, staged for layout and so labelled.
//   APP_URL=… CDP_PORT=… FIX=… OUT_ROOT=… RUN_ROOT=… node vh218-driver.mjs walk --walker <dir> --label before --name passed --scenarios S-82 [--langs --views --modes]
import { pathToFileURL, fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { appendFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const list = (s) => String(s ?? '').split(',').map((x) => x.trim()).filter(Boolean)
const args = (() => { const a = process.argv.slice(2), o = { _: [] }; for (let i = 0; i < a.length; i++) { if (a[i].startsWith('--')) o[a[i].slice(2)] = a[++i]; else o._.push(a[i]) } return o })()

const PROBE = String.raw`(() => {
  const M = window.__mx, lang = document.documentElement.lang;
  const round = (n) => Math.round(n * 100) / 100;
  const lineTops = (rects) => { const t = []; for (const r of rects) { if (r.width <= 0) continue; if (!t.some((x) => Math.abs(x - r.top) < 3)) t.push(r.top) } return t };
  const rangeRects = (node, a, b) => { const g = document.createRange(); g.setStart(node, a); g.setEnd(node, b); return [...g.getClientRects()] };
  const wordsOf = (s) => lang === 'zh-Hans'
    ? [...new Intl.Segmenter('zh', { granularity: 'word' }).segment(s)].filter((x) => x.isWordLike).map((x) => ({ t: x.segment, i: x.index }))
    : [...s.matchAll(/\S+/g)].map((m) => ({ t: m[0], i: m.index }));
  const text = (el) => { const n = el && [...el.childNodes].find((c) => c.nodeType === 3 && c.data.trim()); if (!n) return { lines: 0, text: el ? el.textContent : null, longest: null, broken: [] };
    const words = wordsOf(n.data).map((w) => { const rs = rangeRects(n, w.i, w.i + w.t.length); return { t: w.t, chars: [...w.t].length, w: round(rs.reduce((a, r) => a + r.width, 0)), lines: lineTops(rs).length } });
    const longest = words.slice().sort((a, b) => b.w - a.w)[0] ?? null;
    const box = el.getBoundingClientRect();
    return { text: n.data, lines: lineTops(rangeRects(n, 0, n.data.length)).length, longest, broken: words.filter((w) => w.lines > 1), wider: words.filter((w) => w.w > box.width + 0.5).map((w) => w.t), box: { left: round(box.left), right: round(box.right), top: round(box.top), bottom: round(box.bottom), w: round(box.width) } } };
  const checkRow = (row) => { const mark = row.querySelector('.mark'), value = row.querySelector('.value'), label = mark.nextElementSibling;
    const read = () => { const L = text(label), V = text(value), rb = row.getBoundingClientRect(), mb = mark.getBoundingClientRect();
      const Mk = text(mark); return { markRead: { lines: Mk.lines, broken: Mk.broken, w: Mk.longest?.w ?? null, column: Mk.box?.w ?? null }, label: L, value: V, beneath: !!(V.box && L.box && V.box.top >= L.box.bottom - 1), markTopToLabel: L.box ? round(mb.top - L.box.top) : null, mark: mark.textContent, markLeft: round(mb.left), rowRight: round(rb.right), rowH: round(rb.height), past: !!(V.box && V.box.right > rb.right + 0.5) || !!(L.box && L.box.right > rb.right + 0.5) } };
    const out = { id: row.id.replace('check-', ''), state: row.dataset.state, ...read() };
    if (row.id === 'check-worker' && row.dataset.state === 'fail') { const was = value.textContent; value.textContent = M.msg('systemCheck.values.failedToStart'); out.failedToStart = read(); value.textContent = was }
    // Staged, not reached: a row that is overwritten in the tick it is written pending (src/main.ts:1108, 1111-1126), read for layout with the state's own words, restored in this evaluate.
    if (window.__vh218pending && ['check-secure', 'check-webcodecs', 'check-opfs'].includes(row.id)) { const was = value.textContent, wasM = mark.textContent, st = row.dataset.state; value.textContent = M.msg('systemCheck.values.checking'); mark.textContent = M.msg('systemCheck.marks.pending'); row.dataset.state = 'pending'; out.stagedPending = read(); value.textContent = was; mark.textContent = wasM; row.dataset.state = st }
    return out };
  const rows = [...document.querySelectorAll('#checks .check')].map(checkRow);
  const dd = [...document.querySelectorAll('#source-report dd')].find((d) => d.textContent.trim() === M.msg('format.alone.lessThanASecond'));
  const fact = dd ? { dt: text(dd.previousElementSibling), dd: text(dd) } : null;
  const doc = document.documentElement;
  return { lang, open: document.getElementById('system-check').open, rows, fact, overflow: { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth },
    modeRead: { fontPx: parseFloat(getComputedStyle(doc).fontSize), forced: matchMedia('(forced-colors: active)').matches, dark: matchMedia('(prefers-color-scheme: dark)').matches, spacing: !!document.getElementById('__audit-spacing'), vw: innerWidth } };
})()`

const wrap = (e) => `(() => { const M = window.__mx; return ${e}; })()`
const SIX = `document.querySelectorAll('#checks .check').length === 6`
const is = (id, s) => `M.el('#check-${id}')?.dataset.state === '${s}'`
const OPEN = `M.el('#system-check').open`
const HOLD_INIT = `(() => { window.__vh218pending = true; const never = () => new Promise(() => {}); VideoEncoder.isConfigSupported = never; AudioEncoder.isConfigSupported = never; const st = window.setTimeout; window.setTimeout = function (f, ms, ...a) { return ms === 5000 ? 0 : st.call(window, f, ms, ...a) }; })()`
const FAIL_INIT = `(() => { Object.defineProperty(window, 'isSecureContext', { get: () => false, configurable: true }); delete globalThis.VideoEncoder; delete globalThis.VideoDecoder; delete StorageManager.prototype.getDirectory; })()`

function power() {
  const sh = (cmd, a) => execFileSync(cmd, a, { encoding: 'utf8' })
  const batt = sh('pmset', ['-g', 'batt']), pm = sh('pmset', ['-g']), up = sh('uptime', []).trim()
  const ac = /AC Power/.test(batt), level = Number((batt.match(/(\d+)%/) ?? [])[1]), mode = Number((pm.match(/^\s*powermode\s+(\d+)/m) ?? [])[1])
  return { at: new Date().toISOString(), source: ac ? 'AC' : 'battery', level, powermode: mode, load: Number((up.match(/load averages?: ([\d.]+)/) ?? [])[1]), ok: ac || (level > 50 && !(/lowpowermode\s+1/.test(pm) || mode === 1)) }
}

async function walk() {
  for (const k of ['APP_URL', 'CDP_PORT', 'FIX', 'OUT_ROOT', 'RUN_ROOT']) if (!process.env[k]) throw new Error('set ' + k)
  const walker = resolve(args.walker), label = args.label ?? 'before', scenarios = list(args.scenarios)
  const langs = list(args.langs ?? 'en-GB,zh-Hans,ms-MY'), views = list(args.views ?? 'w1280,w375,w320')
  const modes = list(args.modes ?? 'light,dark,forced-light,forced-dark,font32,dark-font32,forced-light-font32,forced-dark-font32,spacing,dark-spacing,forced-light-spacing,forced-dark-spacing')
  const records = scenarios.flatMap((id) => langs.flatMap((lang) => views.flatMap((view) => modes.map((mode) => ({ id, lang, view, mode })))))
  const plan = `vh218-${label}-${args.name ?? 'run'}`, p = power()
  mkdirSync(process.env.RUN_ROOT, { recursive: true })
  appendFileSync(join(process.env.RUN_ROOT, 'vh218-ledger.jsonl'), JSON.stringify({ plan, label, power: p, walker, records: records.length, langs, views, modes }) + '\n')
  if (!p.ok) { console.log('POWER-STOP'); process.exit(3) }
  const matrixUrl = pathToFileURL(join(walker, 'matrix.mjs')).href
  const at = (f) => import(new URL('./' + f, matrixUrl).href)
  const { PLANS, SCENARIOS, fresh, LANG_VALUE } = await at('scenarios.mjs')
  const { applyFault } = await at('faults.mjs')
  const { sleep } = await at('walk.mjs')
  const S82 = SCENARIOS['S-82']
  const addInit = (w, source) => w.page.send('Page.addScriptToEvaluateOnNewDocument', { source })
  const openPanel = async (w) => { if (!(await w.evaluate(`document.getElementById('system-check').open`))) await w.click('#system-check summary'); await sleep(300) }
  SCENARIOS['S-82-warned'] = { ...S82, name: 'System check open, the aac row warned (F17)',
    state: wrap(`${OPEN} && ${SIX} && ${is('aac', 'warn')} && ${['secure', 'webcodecs', 'h264', 'opfs', 'worker'].map((i) => is(i, 'pass')).join(' && ')}`),
    setup: async (w, lang) => { await applyFault(w, 'F17'); await fresh(w, lang); await openPanel(w) } }
  SCENARIOS['S-82-failed'] = { ...S82, name: 'System check open, all six rows failed (init script and F1, past the 5 s deadline)',
    state: wrap(`${OPEN} && ${SIX} && ${['secure', 'webcodecs', 'h264', 'aac', 'opfs', 'worker'].map((i) => is(i, 'fail')).join(' && ')}`),
    setup: async (w, lang) => { await addInit(w, FAIL_INIT); await applyFault(w, 'F1'); await fresh(w, lang); await w.waitFor(`document.getElementById('check-worker')?.dataset.state === 'fail'`, { label: 'worker failed', timeout: 20000 }); await sleep(300); await openPanel(w) } }
  SCENARIOS['S-82-pending'] = { ...S82, name: 'System check open, h264, aac and worker held pending (init script and F1)',
    state: wrap(`${OPEN} && ${SIX} && ${['h264', 'aac', 'worker'].map((i) => is(i, 'pending')).join(' && ')} && ${['secure', 'webcodecs', 'opfs'].map((i) => is(i, 'pass')).join(' && ')}`),
    setup: async (w, lang) => {
      await addInit(w, HOLD_INIT); await applyFault(w, 'F1')
      const loaded = w.page.once('Page.loadEventFired'); await w.page.send('Page.navigate', { url: process.env.APP_URL }); await loaded; await sleep(800) // Walk.goto's boot wait refuses "checking", which this state is.
      if (lang !== 'en-GB') await w.chooseLanguage(LANG_VALUE[lang])
      await openPanel(w)
    } }
  for (const v of ['S-82-warned', 'S-82-failed', 'S-82-pending']) SCENARIOS[v].hold = SCENARIOS[v].state // S-82's own wrapped `hold` excludes these states.
  for (const r of records) if (!SCENARIOS[r.id]) throw new Error('the walker holds no scenario ' + r.id)
  const OUT = join(process.env.RUN_ROOT, `vh218-probe-${plan}.jsonl`)
  for (const id of new Set(scenarios)) {
    const sc = (SCENARIOS[id] = { ...SCENARIOS[id] }), orig = sc.afterMode
    sc.afterMode = async (w) => {
      if (orig) await orig(w)
      if (/.-spacing$/.test(w.qualMode)) { await w.spacing(true); await sleep(100) }
      let g
      try { g = await w.evaluate(PROBE) } catch (e) { g = { error: String(e.message ?? e).slice(0, 200) } }
      appendFileSync(OUT, JSON.stringify({ plan, cell: w.name.split('/').pop(), walk: w.name, id, mode: w.qualMode, at: new Date().toISOString(), ...g }) + '\n')
    }
  }
  PLANS[plan] = () => records.map((r) => ({ ...r }))
  process.argv = [process.argv[0], fileURLToPath(matrixUrl), plan]
  await import(matrixUrl)
}
if (args._[0] === 'walk') await walk()
else { console.log('usage: node vh218-driver.mjs walk --walker <dir> --label <l> --name <n> --scenarios …'); process.exit(2) }
