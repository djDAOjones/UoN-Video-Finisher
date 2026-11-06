// VH-232 #3's driver, modelled read-only on VH-216's (vh216-driver.mjs, 6dd723e4). The pass's own runner (matrix.mjs), unchanged, walks a
// plan declared in memory. In memory only, nothing written into the walker or the repository:
//  - a read-only probe of the feedback dialog's status, its focus and its scroll, wrapping each walked scenario's `afterMode` (after the
//    runner's setMode, before the state is asserted and the instruments run). It moves no focus and scrolls nothing.
//  - the same probe at S-76's subresults' hand-off (DIALOG_ENLARGED_SUB.run wrapped: the probe runs just before the walker's own
//    "opened" check, 600 ms after its Enter on Open email app), so the status S-76 sets at enlargement is read where it is set.
//  - three routes on the walker's own keys (qualify.mjs's keysRoute, CDP Input.dispatchKeyEvent): R-232a and R-232b, S-79a's and
//    S-79b's states reached by keys and read after each key; R-232o, S-79b with "What will be sent" open (set up as S-79b is, by the
//    walker's clicks, the summary clicked before Open email app). A route's reading is a non-key step (keysRoute's `setup`).
// One plan per process and one mode per plan, so every record has a setup of its own and is read before any instrument has moved
// focus or scroll (a group's later modes are otherwise read after the earlier record's instruments: VH-222's g4, 434 vs 498 px).
//
//   APP_URL=… CDP_PORT=9251 FIX=<dir> OUT_ROOT=<out> RUN_ROOT=<runs> node vh232-driver.mjs walk --walker <dir> --label before --name m-light \
//     --set matrix --modes light        (or --set extras-a, extras-b, keys)
import { pathToFileURL, fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { appendFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const list = (s) => String(s ?? '').split(',').map((x) => x.trim()).filter(Boolean)
const args = (() => { const a = process.argv.slice(2), o = { _: [] }; for (let i = 0; i < a.length; i++) { if (a[i].startsWith('--')) { o[a[i].slice(2)] = a[++i] } else o._.push(a[i]) } return o })()
const LANGS = ['en-GB', 'zh-Hans', 'ms-MY'], WIDTHS = ['w1280', 'w375', 'w320']
const MATRIX = ['S-75', 'S-76', 'S-77', 'S-78', 'S-78k', 'S-79a', 'S-79b', 'S-80a', 'S-80b']
const SUBMIT = '#feedback-form button[type="submit"]'
const MSG = { 'R-232a': 'This message runs past what an email link can carry. '.repeat(40), 'R-232b': 'Long but under the limit. '.repeat(30) }
const KEYS_STATE = { 'R-232a': "M.has('feedback.tooLong', '#feedback-status')", 'R-232b': "M.has('feedback.opened', '#feedback-status') && M.has('feedback.someOmitted', '#feedback-status')" }

// Read-only: the status's text and line boxes against the dialog's client area and the window; the focused control and its ring; the
// dialog's box, scroll and range; each control's offset in the form; heading, Tab order, role and live region; the page's offsets.
export const PROBE = String.raw`(() => {
  const M = window.__mx, round = (n) => Math.round(n * 100) / 100, E = 0.5;
  const d = document.getElementById('feedback-dialog'), s = document.getElementById('feedback-status'), f = document.getElementById('feedback-form');
  if (!d || !s) return { error: 'no dialog' };
  const bx = (b) => ({ t: round(b.top), b: round(b.bottom), l: round(b.left), r: round(b.right) });
  const dr = d.getBoundingClientRect(), ct = dr.top + d.clientTop, cl = dr.left + d.clientLeft, cb = ct + d.clientHeight, cr = cl + d.clientWidth;
  const inClient = (x) => x.top >= ct - E && x.bottom <= cb + E && x.left >= cl - E && x.right <= cr + E;
  const inWin = (x) => x.top >= -E && x.bottom <= innerHeight + E && x.left >= -E && x.right <= innerWidth + E;
  const rg = document.createRange(); rg.selectNodeContents(s);
  const frags = [...rg.getClientRects()].filter((x) => x.width > 0 && x.height > 0);
  const text = (s.textContent || '').replace(/\s+/g, ' ').trim();
  const keys = ['opened', 'someOmitted', 'tooLong', 'copied', 'couldNotCopy'].filter((k) => { try { return M.has('feedback.' + k, '#feedback-status'); } catch (e) { return false; } });
  // VH-222's row probe's clip rule (vh222-driver.mjs's ROW_PROBE, read-only copy): the status's box outside a clipping ancestor's.
  const clip = []; { const r = s.getBoundingClientRect(); for (let a = s.parentElement; a && a !== document.body; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') { const q = a.getBoundingClientRect(); if ((cs.overflowX !== 'visible' && (r.left < q.left - 1 || r.right > q.right + 1)) || (cs.overflowY !== 'visible' && (r.top < q.top - 1 || r.bottom > q.bottom + 1))) clip.push(a.id ? '#' + a.id : a.tagName.toLowerCase()); } } }
  const a = document.activeElement, onA = a && a !== document.body;
  let focus = { el: onA ? (a.id || (a.tagName.toLowerCase() + (a.type ? '[' + a.type + ']' : ''))) : 'body', inDialog: !!(onA && d.contains(a)) };
  if (onA) { const r = a.getBoundingClientRect(), cs = getComputedStyle(a), w = cs.outlineStyle !== 'none' ? parseFloat(cs.outlineWidth) || 0 : 0, o = parseFloat(cs.outlineOffset) || 0, g = w ? w + o : 0;
    const ring = { top: r.top - g, bottom: r.bottom + g, left: r.left - g, right: r.right + g };
    focus = { ...focus, box: bx(r), visible: a.matches(':focus-visible'), ring: w, boxInClient: inClient(r), boxInWin: inWin(r), ringInClient: inClient(ring), ringInWin: inWin(ring), text: (a.textContent || '').trim().slice(0, 40) }; }
  const ctl = { heading: d.querySelector('h2'), intro: document.getElementById('feedback-intro'), message: document.getElementById('feedback-message'), summary: d.querySelector('summary'), submit: d.querySelector('button[type="submit"]'), copy: document.getElementById('feedback-copy'), close: document.getElementById('feedback-close'), status: s };
  const offsets = Object.fromEntries(Object.entries(ctl).map(([k, e]) => [k, e ? round(e.getBoundingClientRect().top - f.getBoundingClientRect().top) : null]));
  const tabs = [...d.querySelectorAll('a[href],button,textarea,input,select,summary,[tabindex]')].filter((e) => !e.disabled && e.getClientRects().length && e.tabIndex >= 0).map((e) => e.id || e.tagName.toLowerCase() + (e.type ? '[' + e.type + ']' : ''));
  const det = d.querySelector('details'), ta = document.getElementById('feedback-message'), pre = document.getElementById('feedback-details');
  return {
    open: d.open, text, keys, address: /@nottingham\.ac\.uk/.test(text), complete: keys.length > 0 && !/\{[^}]+\}/.test(text),
    fragments: frags.length, whole: frags.length > 0 && frags.every((x) => inClient(x) && inWin(x)), wholeClient: frags.length > 0 && frags.every(inClient), wholeWin: frags.length > 0 && frags.every(inWin),
    lastFragInView: frags.length > 0 && inClient(frags[frags.length - 1]) && inWin(frags[frags.length - 1]),
    status: bx(s.getBoundingClientRect()), clip, role: s.getAttribute('role'), ariaLive: s.getAttribute('aria-live'), tag: s.tagName.toLowerCase(), cls: s.className,
    dialog: { box: bx(dr), client: { t: round(ct), b: round(cb) }, scrollTop: round(d.scrollTop), scrollHeight: d.scrollHeight, clientHeight: d.clientHeight, scrollLeft: d.scrollLeft, padEnd: getComputedStyle(d).paddingBlockEnd, scrollBehavior: getComputedStyle(d).scrollBehavior },
    focus, offsets, tabs, heading: (d.querySelector('h2')?.textContent || '').trim(), disclosureOpen: !!det?.open, textareaScroll: ta ? round(ta.scrollTop) : null, detailsScroll: pre ? round(pre.scrollTop) : null,
    page: { scrollX, scrollY, vw: innerWidth, vh: innerHeight }, lang: document.documentElement.lang,
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
const lv = (name) => { const m = /-(en-GB|zh-Hans|ms-MY)-((?:w\d+)|(?:zoom\d+proxy))/i.exec(name) ?? []; return { lang: m[1], view: m[2] } }

function declare(set, modes) {
  const r = (id, lang, view, mode) => ({ id, lang, view, mode })
  if (set === 'matrix') return MATRIX.flatMap((id) => LANGS.flatMap((lang) => WIDTHS.flatMap((view) => modes.map((mode) => r(id, lang, view, mode)))))
  // S-76 enlarged (9), S-79b at 320 px in reduced motion (1), K-dialog (3), R-232o (9); extras-b: S-79b at 320 px in text spacing (1).
  if (set === 'extras-a') return [...LANGS.flatMap((lang) => [r('S-76', lang, 'w1280', 'font32'), r('S-76', lang, 'zoom200proxy', 'light'), r('S-76', lang, 'zoom400proxy', 'light')]),
    r('S-79b', 'en-GB', 'w320', 'reduced-motion'), ...WIDTHS.map((v) => r('K-dialog', 'en-GB', v, 'light')), ...LANGS.flatMap((lang) => WIDTHS.map((v) => r('R-232o', lang, v, 'light')))]
  if (set === 'extras-b') return [r('S-79b', 'en-GB', 'w320', 'spacing')]
  // The qualification: the probe, the subresults' reading, a keys route and the open-disclosure route, once each, before use.
  if (set === 'qual') return [r('S-79b', 'en-GB', 'w320', 'light'), r('S-78k', 'en-GB', 'w320', 'light'), r('S-76', 'en-GB', 'w320', 'light'), r('R-232b', 'en-GB', 'w320', 'light'), r('R-232o', 'en-GB', 'w1280', 'light')]
  if (set === 'qual2') return [r('R-232a', 'en-GB', 'w320', 'light'), r('R-232b', 'en-GB', 'w320', 'light')]
  if (set === 'keys') return ['R-232a', 'R-232b'].flatMap((id) => LANGS.flatMap((lang) => WIDTHS.map((v) => r(id, lang, v, 'light'))))
  throw new Error('no set ' + set)
}

async function walk() {
  for (const k of ['APP_URL', 'CDP_PORT', 'FIX', 'OUT_ROOT', 'RUN_ROOT']) if (!process.env[k]) throw new Error('set ' + k)
  if (!args.walker) throw new Error('--walker <walker dir>')
  const walker = resolve(args.walker), label = args.label ?? 'before', set = args.set ?? 'matrix', modes = list(args.modes ?? 'light')
  const records = declare(set, modes)
  const plan = `vh232-${label}-${args.name ?? set}`, p = power()
  mkdirSync(process.env.RUN_ROOT, { recursive: true })
  appendFileSync(join(process.env.RUN_ROOT, 'vh232-ledger.jsonl'), JSON.stringify({ plan, label, set, power: p, walker, appUrl: process.env.APP_URL, cdpPort: process.env.CDP_PORT, records: records.length, ids: [...new Set(records.map((r) => r.id))], modes }) + '\n')
  console.log('power: ' + JSON.stringify(p))
  if (!p.ok) { console.log('POWER-STOP'); process.exit(3) }
  const matrixUrl = pathToFileURL(join(walker, 'matrix.mjs')).href
  const { PLANS, SCENARIOS, ROUTES, fresh } = await import(new URL('./scenarios.mjs', matrixUrl).href)
  const PROBE_OUT = join(process.env.RUN_ROOT, `vh232-probe-${plan}.jsonl`), STATES_OUT = join(process.env.RUN_ROOT, `vh232-states-${plan}.jsonl`)
  const read = async (w) => { try { return await w.evaluate(PROBE) } catch (e) { return { error: String(e.message ?? e).slice(0, 200) } } }
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms))
  // Matrix and extras: the probe at the state (afterMode), keyed as table-1page.mjs reads a probe, by cell and mode.
  for (const id of new Set(records.map((r) => r.id).filter((id) => SCENARIOS[id]))) {
    const sc = SCENARIOS[id], orig = sc.afterMode
    sc.afterMode = async (w) => {
      if (orig) await orig(w)
      const { lang, view } = lv(w.name)
      appendFileSync(PROBE_OUT, JSON.stringify({ plan, walk: w.name, cell: `${id}__${lang}__${view}__${w.qualMode}`, id, mode: w.qualMode, at: new Date().toISOString(), ...(await read(w)) }) + '\n')
    }
    if (id === 'S-76' && sc.subresults?.run) {
      const run = sc.subresults.run
      sc.subresults = { ...sc.subresults, run: async (w) => {
        const ev = w.evaluate.bind(w)
        let done = false
        w.evaluate = async (expr, ...rest) => {
          if (!done && typeof expr === 'string' && expr.includes("'feedback.opened'")) { done = true; const { lang, view } = lv(w.name); const g = await ev(PROBE).catch((e) => ({ error: String(e.message ?? e).slice(0, 200) })); appendFileSync(STATES_OUT, JSON.stringify({ plan, walk: w.name, lang, view, mode: w.qualMode, which: 'S-76-handoff', state: 'opened', at: new Date().toISOString(), ...g }) + '\n') }
          return ev(expr, ...rest)
        }
        try { return await run(w) } finally { w.evaluate = ev }
      } }
    }
  }
  // The routes, in memory. A reading is a non-key step; each lands in the states file, keyed by language, view, mode, route and step.
  // Keyboard scrolling in Chrome is smooth: a reading waits until the dialog's, the page's and the textarea's scroll are still (two
  // samples 100 ms apart alike, at most 3 s), and records how long that took.
  const SETTLE = `(() => { const d = document.getElementById('feedback-dialog'), t = document.getElementById('feedback-message'); return [d ? d.scrollTop : 0, scrollY, t ? t.scrollTop : 0].join(','); })()`
  const settle = async (w) => { const t0 = Date.now(); let last = await w.evaluate(SETTLE); while (Date.now() - t0 < 3000) { await sleep(100); const now = await w.evaluate(SETTLE); if (now === last) return Date.now() - t0; last = now } return 'not still after 3 s' }
  const at = (which, step) => ({ setup: async (w) => { const settledMs = await settle(w); const { lang, view } = lv(w.name); appendFileSync(STATES_OUT, JSON.stringify({ plan, walk: w.name, lang, view, mode: w.qualMode ?? 'light', which, state: step, settledMs, at: new Date().toISOString(), ...(await read(w)) }) + '\n') }, note: `${which}: read ${step}` })
  const ON = (sel) => `!!document.activeElement && document.activeElement.matches(${JSON.stringify(sel)})`
  for (const id of ['R-232a', 'R-232b']) {
    const st = (k, extra = {}) => [{ key: k, ...extra }, at(id, k + (extra.shift ? '+shift' : ''))]
    ROUTES[id] = { name: `VH-232: ${id === 'R-232a' ? "S-79a's" : "S-79b's"} state reached by keys; the dialog read after each key`, setup: async (w, lang) => fresh(w, lang), fixtures: [],
      steps: [
        { key: 'Tab', until: 'feedback-open', repeat: 80, note: 'Tab forward to Send feedback' },
        { key: 'Enter', state: ON('#feedback-message'), note: 'Enter opens the dialog on the message field' },
        { wait: 1500, note: "S-79b's own wait for the details" },
        { text: MSG[id], state: ON('#feedback-message'), note: "the scenario's message typed by keys" },
        { key: 'Tab', untilState: ON(SUBMIT), repeat: 6, note: 'Tab to Open email app' },
        { key: 'Enter', state: `(() => { const M = window.__mx; return ${KEYS_STATE[id]}; })()`, wait: 500, note: "Enter: the scenario's status set" },
        at(id, 'at once'),
        ...st('PageUp'), ...st('ArrowUp'), ...st('Home'), ...st('PageDown'), ...st('ArrowDown'), ...st('End'),
        ...st('Tab'), ...st('Tab'), ...st('Tab', { shift: true }), ...st('Tab', { shift: true }),
        { key: 'Escape', state: `!document.querySelector('dialog#feedback-dialog[open]') && ${ON('#feedback-open')}`, note: 'Escape closes; focus back on the opener' },
        at(id, 'Escape'),
      ] }
  }
  ROUTES['R-232o'] = { name: 'VH-232: S-79b with "What will be sent" open before Open email app', fixtures: [],
    setup: async (w, lang) => { await fresh(w, lang); await w.click('#feedback-open'); await sleep(300); await sleep(1500); await w.type('#feedback-message', MSG['R-232b']); await w.click('#feedback-dialog summary'); await sleep(300); await w.click(SUBMIT); await sleep(500) },
    steps: [{ setup: async () => {}, state: `(() => { const M = window.__mx; return !!document.querySelector('details.disclosure[open]') && ${KEYS_STATE['R-232b']}; })()`, note: 'S-79b\'s state with the disclosure open' }, at('R-232o', 'state')] }
  PLANS[plan] = () => records.map((r) => ({ ...r }))
  // matrix.mjs runs its main when it is the entry point: it is made so, unchanged.
  process.argv = [process.argv[0], fileURLToPath(matrixUrl), plan]
  await import(matrixUrl)
}

if (args._[0] === 'walk') await walk()
else { console.log('usage: node vh232-driver.mjs walk --walker <dir> --label <l> --name <n> --set matrix|extras-a|extras-b|keys [--modes …]'); process.exit(2) }
