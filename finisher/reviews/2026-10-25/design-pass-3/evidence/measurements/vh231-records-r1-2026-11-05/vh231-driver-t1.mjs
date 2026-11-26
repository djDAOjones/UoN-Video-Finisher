// VH-231 #3's driver, from VH-216 #1's (vh216-driver.mjs, 6dd723e4): VH-231's cells walked by the pass's own runner (matrix.mjs),
// unchanged, on a plan declared in memory. Nothing here is written into the walker or the repository.
// - Five scenarios declared in memory beside the walker's, their IDs given by Orchestrator #40 (brief, section 0): S-170, the cut
//   WebM before Create (S-23's state on S-23w's file); S-171 and S-171s, the cut MKV with the start moved to 0:05, before Create and
//   finished; S-172 and S-172s, the cut WebM with the end moved to 0:04, the same. S-171 to S-172s open "Video properties".
//   S-171s and S-172s read the retained result's transitions in their setup, each step by the probe below: the trimmed line
//   before Create, the finished card, the discard question, "Keep it", "Previous video" (lecture-30s.mp4 chosen, S-64's way;
//   VH-231 #4's repair), the cut file chosen again and trimmed, the question again, then Discard and a second job, whose
//   finished card is the state measured.
// - A read-only probe wraps each walked scenario's `afterMode` in memory (after the runner's setMode, before the state is
//   asserted and the instruments run). It moves no focus and changes nothing.
// - VH-231 #6's t1 copy (from 1776b654, which stays as it is), for Codex's must 1: the runner sets a record's mode after the
//   group's one setup, so 1776b654 read S-171s's and S-172s's transitions in light only. With `--setup-mode <m>`, which must be
//   the job's one `--modes` entry, the finished setup first sets that mode by the walker's own `setMode` (qualify.mjs), before
//   the page loads and again once the file is chosen, so every transition is read in that mode; the runner then sets the same
//   mode for the record. Nothing else differs: one mode per job, so one setup per record.
//
//   APP_URL=… CDP_PORT=9251 FIX=<fixtures> OUT_ROOT=<out> RUN_ROOT=<runs> node vh231-driver.mjs walk --walker <dir> --label before \
//     --name a --scenarios S-23,S-170 [--langs …] [--views …] [--modes …]
import { pathToFileURL, fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { appendFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const list = (s) => String(s ?? '').split(',').map((x) => x.trim()).filter(Boolean)
const args = (() => { const a = process.argv.slice(2), o = { _: [] }; for (let i = 0; i < a.length; i++) { if (a[i].startsWith('--')) { o[a[i].slice(2)] = a[++i] } else o._.push(a[i]) } return o })()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Read-only: what VH-231's criteria name, as the page shows it: Video properties (open or not, its rows), the trim line, the
// sound warnings before Create, step 6's result (its title, lines, warnings' titles, headings and quoted languages), the discard
// question, the status line and the page announcer, the headings, overflow, the mode.
const PROBE = String.raw`(() => {
  const M = window.__mx; const q = (s) => document.querySelector(s);
  const T = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : null);
  const shown = (el) => !!el && el.getClientRects().length > 0;
  const box = (el) => { if (!el || !shown(el)) return null; const b = el.getBoundingClientRect(); return { left: Math.round(b.left), right: Math.round(b.right), w: Math.round(b.width), h: Math.round(b.height) }; };
  const det = q('#source-report details.disclosure');
  const props = det ? { open: det.open, summary: T(det.querySelector('summary')), rows: [...det.querySelectorAll('dl.facts > dt')].map((dt) => [T(dt), T(dt.nextElementSibling)]), box: box(det) } : null;
  const res = q('#process-result');
  const card = q('#process-result > .notification[data-kind="success"]');
  const result = card ? {
    title: M ? M.resultTitle().replace(/\s+/g, ' ').trim() : null,
    lines: [...card.querySelectorAll('p')].filter(shown).map(T),
    warningTitles: [...card.querySelectorAll('.notification-item-title')].filter(shown).map(T),
    headings: [...card.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]')].filter(shown).map((h) => h.tagName + ' ' + T(h)),
    langs: [...card.querySelectorAll('[lang]')].map((e) => e.getAttribute('lang') + ' ' + T(e).slice(0, 80)),
    box: box(card),
  } : null;
  const question = M && M.res() === 'question' ? { text: T(res), buttons: [...res.querySelectorAll('button')].filter(shown).map(T) } : null;
  const a = document.activeElement;
  return {
    lang: document.documentElement.lang,
    res: M ? M.res() : null,
    props,
    trim: T(q('#trim-result')),
    audioWarnings: { titles: [...document.querySelectorAll('#audio-warnings .notification-item-title')].filter(shown).map(T), text: T(q('#audio-warnings')) },
    result, question,
    status: T(q('#status')), announcer: T(q('#page-announcer')),
    headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(shown).map((h) => h.tagName + ' ' + T(h)),
    overflow: { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth },
    modeRead: { forced: matchMedia('(forced-colors: active)').matches, dark: matchMedia('(prefers-color-scheme: dark)').matches, vw: innerWidth },
    focus: !a || a === document.body ? 'body' : (a.id || a.tagName),
  };
})()`

function power() {
  const sh = (cmd, a) => execFileSync(cmd, a, { encoding: 'utf8' })
  const batt = sh('pmset', ['-g', 'batt']), pm = sh('pmset', ['-g']), up = sh('uptime', []).trim()
  const ac = /AC Power/.test(batt), level = Number((batt.match(/(\d+)%/) ?? [])[1])
  const mode = Number((pm.match(/^\s*powermode\s+(\d+)/m) ?? [])[1]), low = /lowpowermode\s+1/.test(pm) || mode === 1
  const load = Number((up.match(/load averages?: ([\d.]+)/) ?? [])[1])
  return { at: new Date().toISOString(), source: ac ? 'AC' : 'battery', level, powermode: mode, low, load, uptime: up, ok: ac || (level > 50 && !low) }
}

// VH-231's scenarios, in memory, on the walker's own helpers (`ready`, `F`, the page's __mx), as its own scenarios are written.
function vh231Scenarios({ ready, F, setMode, setupMode }) {
  const CREATE = '#process-actions > button:nth-child(2)'
  const SAVE = '#process-result > .notification[data-kind="success"] .actions > button.button'
  const KEEP = '#process-result .actions > .button--secondary'
  const DISCARD = '#process-result .actions > .button--danger'
  const wrap = (expr) => `(() => { const M = window.__mx; return (${expr}); })()`
  const until = (w, expr, label, timeout = 120000) => w.waitFor(`(() => { const M = window.__mx; try { return !!(${expr}); } catch (e) { return false; } })()`, { label, timeout })
  const mx = (w, expr) => w.evaluate(`(() => { const M = window.__mx; return ${expr}; })()`)
  const CUT_FIRST = `M.is('warnings.cutShort.heading', '#audio-warnings .notification-item-title')`
  const OPEN = `!!document.querySelector('#source-report details.disclosure[open]')`
  const OTHER = 'lecture-30s.mp4'
  const TRIM = {
    start: { sel: '#trim-start', value: '0:05', moved: `Number(M.el('#trim-start-range').value) > 0` },
    end: { sel: '#trim-end', value: '0:04', moved: `Number(M.el('#trim-end-range').value) < Number(M.el('#trim-end-range').max)` },
  }
  const setTrim = async (w, t) => { await w.type(t.sel, t.value); await w.press('Tab'); await sleep(300); await w.waitSettled(); await until(w, `!!M.verdict() && !M.checking() && ${t.moved}`, 'the verdict on the trim', 300000) }
  const openProps = async (w) => { await w.evaluate(`(() => { const d = document.querySelector('#source-report details.disclosure'); if (d && !d.open) d.querySelector('summary').click(); return !!d; })()`); await sleep(300) }
  const create = async (w) => { if (await mx(w, 'M.ack()')) { await w.click(w.acknowledgeButton()); await sleep(200) } await w.click(w.createButton()) }
  const jobEnd = async (w) => { await w.waitRunning(); await until(w, `M.finished() || M.res() === 'failure'`, 'the job ended', 900000); if (!(await mx(w, 'M.finished()'))) throw new Error('the job did not finish'); await sleep(400) }
  const probe = (w) => w.evaluate(PROBE).catch((e) => ({ error: String(e.message ?? e).slice(0, 200) }))
  const beforeCreate = (name, file, t) => ({
    name, fixOnly: true,
    state: `!!M.verdict() && ${CUT_FIRST} && ${OPEN} && ${t.moved}`,
    setup: async (w, lang) => { await ready(w, lang, file); await setTrim(w, t); await openProps(w) },
    focus: [CREATE], fixtures: [file],
  })
  const finished = (name, file, t) => ({
    name, fixOnly: true,
    state: `M.finished() && !!document.querySelector('video.result-player') && ${OPEN}`,
    setup: async (w, lang) => {
      const s = (STEPS.get(w) ?? STEPS.set(w, {}).get(w))
      if (setupMode) await setMode(w, setupMode)
      await ready(w, lang, file)
      if (setupMode) await setMode(w, setupMode)
      await setTrim(w, t); s.trimmed = await probe(w)
      await create(w); await jobEnd(w); s.finished = await probe(w)
      await w.click(CREATE); await until(w, `M.res() === 'question'`, 'the discard question', 20000); await sleep(300); s.question = await probe(w)
      await w.click(KEEP); await until(w, 'M.finished()', 'Keep it', 20000); await sleep(300); s.kept = await probe(w)
      // VH-231 #4's repair: the same file chosen again by setFiles gives no change, so "Previous video" is reached by another
      // file first (S-64's way), then the cut file is chosen again under it.
      await w.setFiles(F(OTHER)); await sleep(300); await w.waitSettled(); await until(w, '!!M.verdict() && !M.checking() && M.previous()', 'Previous video under the next verdict', 300000); await sleep(300); s.previous = await probe(w)
      await w.setFiles(F(file)); await sleep(300); await w.waitSettled(); await until(w, `!!M.verdict() && !M.checking() && M.previous() && ${CUT_FIRST}`, 'the cut file again under Previous video', 300000); await sleep(300)
      await setTrim(w, t); await create(w); await until(w, `M.res() === 'question'`, 'the discard question again', 20000); await sleep(300); s.questionAgain = await probe(w)
      await w.click(DISCARD); await jobEnd(w); await openProps(w)
    },
    focus: [SAVE, CREATE], fixtures: [file, OTHER],
  })
  const out = {
    'S-170': { name: "VH-231: the cut WebM before Create (S-23's state on S-23w's file)", fixOnly: true, state: `!!M.verdict() && ${CUT_FIRST}`, setup: async (w, lang) => ready(w, lang, 'cut-short-10s.webm'), focus: [CREATE], fixtures: ['cut-short-10s.webm'] },
    'S-171': beforeCreate('VH-231: the cut MKV, the start moved to 0:05, before Create, Video properties open', 'cut-short-30s.mkv', TRIM.start),
    'S-171s': finished("VH-231: the cut MKV, the start moved to 0:05, finished (the retained result's transitions read on the way), Video properties open", 'cut-short-30s.mkv', TRIM.start),
    'S-172': beforeCreate('VH-231: the cut WebM, the end moved to 0:04, before Create, Video properties open', 'cut-short-10s.webm', TRIM.end),
    'S-172s': finished("VH-231: the cut WebM, the end moved to 0:04, finished (the retained result's transitions read on the way), Video properties open", 'cut-short-10s.webm', TRIM.end),
  }
  for (const sc of Object.values(out)) { sc.hold = wrap(sc.hold ?? sc.state); sc.state = wrap(sc.state) }
  return out
}
const STEPS = new Map()

async function walk() {
  for (const k of ['APP_URL', 'CDP_PORT', 'FIX', 'OUT_ROOT', 'RUN_ROOT']) if (!process.env[k]) throw new Error('set ' + k)
  if (!args.walker) throw new Error('--walker <walker dir>')
  const walker = resolve(args.walker), label = args.label ?? 'before', scenarios = list(args.scenarios)
  const langs = list(args.langs ?? 'en-GB,zh-Hans,ms-MY'), views = list(args.views ?? 'w1280,w375,w320'), modes = list(args.modes ?? 'light,dark,forced-light,forced-dark')
  const records = scenarios.flatMap((id) => langs.flatMap((lang) => views.flatMap((view) => modes.map((mode) => ({ id, lang, view, mode })))))
  if (!records.length) throw new Error('nothing declared')
  const plan = `vh231-${label}-${args.name ?? 'g'}`, p = power()
  mkdirSync(process.env.RUN_ROOT, { recursive: true })
  appendFileSync(join(process.env.RUN_ROOT, 'vh231-ledger.jsonl'), JSON.stringify({ plan, label, power: p, walker, appUrl: process.env.APP_URL, cdpPort: process.env.CDP_PORT, records: records.length, ids: [...new Set(records.map((r) => r.id))], langs, views, modes }) + '\n')
  console.log('power: ' + JSON.stringify(p))
  if (!p.ok) { console.log('POWER-STOP: battery at or below 50%, or Low Power'); process.exit(3) }
  const matrixUrl = pathToFileURL(join(walker, 'matrix.mjs')).href
  const { PLANS, SCENARIOS, ready } = await import(new URL('./scenarios.mjs', matrixUrl).href)
  const { F } = await import(new URL('./walk.mjs', matrixUrl).href)
  const { setMode } = await import(new URL('./qualify.mjs', matrixUrl).href)
  const setupMode = args['setup-mode'] ?? null
  if (setupMode && !(modes.length === 1 && modes[0] === setupMode)) throw new Error('--setup-mode must be the job\'s one --modes entry')
  const mine = vh231Scenarios({ ready, F, setMode, setupMode })
  for (const id of Object.keys(mine)) { if (SCENARIOS[id]) throw new Error('the walker already holds ' + id + ': not declared again'); SCENARIOS[id] = mine[id] }
  for (const r of records) if (!SCENARIOS[r.id]) throw new Error('the walker holds no scenario ' + r.id)
  const OUT = join(process.env.RUN_ROOT, `vh231-probe-${plan}.jsonl`)
  const cellOf = new Map()
  for (const id of new Set(records.map((r) => r.id))) {
    const sc = SCENARIOS[id], origSetup = sc.setup, orig = sc.afterMode
    sc.setup = async (w, lang) => { cellOf.set(w, { id, lang, view: (String(w.name).split('/').pop().match(/w(1280|640|375|320)/i) ?? ['?'])[0].toLowerCase() }); return origSetup(w, lang) }
    sc.afterMode = async (w) => {
      if (orig) await orig(w)
      let g
      try { g = await w.evaluate(PROBE) } catch (e) { g = { error: String(e.message ?? e).slice(0, 200) } }
      const c = cellOf.get(w) ?? { id, lang: '?', view: '?' }
      const steps = STEPS.get(w); if (steps) STEPS.delete(w)
      appendFileSync(OUT, JSON.stringify({ plan, walk: w.name, cell: `${c.id}__${c.lang}__${c.view}`, id, mode: w.qualMode, at: new Date().toISOString(), ...g, ...(steps ? { steps } : {}) }) + '\n')
    }
  }
  PLANS[plan] = () => records.map((r) => ({ ...r }))
  // matrix.mjs runs its main when it is the entry point: it is made so, unchanged.
  process.argv = [process.argv[0], fileURLToPath(matrixUrl), plan]
  await import(matrixUrl)
}

if (args._[0] === 'walk') await walk()
else { console.log('usage: node vh231-driver.mjs walk --walker <dir> --label <l> --name <n> --scenarios … [--langs --views --modes]'); process.exit(2) }
