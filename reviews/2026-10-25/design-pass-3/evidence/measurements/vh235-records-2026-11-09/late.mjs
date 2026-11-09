// VH-235 #1: the late route, a driver route outside the walker. It imports the walker's Walk, views,
// modes, `fresh` and fault F5 read-only and changes no walker file. Copy's `writeText` is replaced,
// through CDP after the setup and before the click, by a stand-in whose promise is held; the step
// (Close by click, native Escape by key, Close then Send feedback again, or focus moved by the user)
// is taken; then the promise is resolved or rejected. Each cell reads the status, the dialog and focus
// when Copy is pressed, just before the settle, after it, and (Close, Escape) at the next opening.
// Qualification first: in the same opening, the stand-in's resolved and rejected results against the
// real clipboard's under F5 granted and denied, per language.
import { appendFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
const WK = process.env.WALKER, OUTD = process.env.OUTD
const { connectBrowser } = await import(pathToFileURL(WK + '/cdp.mjs'))
const { Walk, sleep } = await import(pathToFileURL(WK + '/walk.mjs'))
const { setViewport } = await import(pathToFileURL(WK + '/qualify.mjs'))
const { fresh } = await import(pathToFileURL(WK + '/scenarios.mjs'))
const { applyFault } = await import(pathToFileURL(WK + '/faults.mjs'))
const OUT = OUTD + '/late.jsonl'
writeFileSync(OUT, '')

const LANGS = ['en-GB', 'zh-Hans', 'ms-MY']
const STAND = `(() => { const st = window.__vh235 = { calls: 0, settled: null, settle: null };
  Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: (text) => { st.calls++; st.chars = String(text).length;
    return new Promise((res, rej) => { st.settle = (ok) => { st.settled = ok ? 'resolved' : 'rejected'; if (ok) res(); else rej(new DOMException('Write permission denied.', 'NotAllowedError')) } }) } });
  return typeof navigator.clipboard.writeText })()`
const READ = `(() => { const d = document.querySelector('#feedback-dialog'), s = document.querySelector('#feedback-status'), a = document.activeElement, st = window.__vh235;
  return { text: s.textContent, tag: s.tagName, cls: s.className, role: s.getAttribute('role'), ariaLive: s.getAttribute('aria-live'), open: d.open,
    scrollTop: d.scrollTop, scrollHeight: d.scrollHeight, clientHeight: d.clientHeight, scrollLeft: d.scrollLeft, pageY: scrollY,
    focus: a ? (a.id ? '#' + a.id : a.tagName.toLowerCase()) : null, lang: document.documentElement.lang,
    stand: st ? { calls: st.calls, settled: st.settled, held: typeof st.settle === 'function' } : null } })()`

async function ax(w) {
  const { root } = await w.page.send('DOM.getDocument', { depth: 0 })
  const { nodeId } = await w.page.send('DOM.querySelector', { nodeId: root.nodeId, selector: '#feedback-status' })
  const { nodes } = await w.page.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false })
  const n = nodes[0] ?? {}
  const prop = (k) => n.properties?.find((p) => p.name === k)?.value?.value ?? null
  return { role: n.role?.value ?? null, ignored: n.ignored ?? null, live: prop('live'), relevant: prop('relevant'), atomic: prop('atomic') }
}
const read = async (w) => ({ ...(await w.evaluate(READ)), ax: await ax(w).catch((e) => ({ error: String(e).slice(0, 160) })) })

async function cell(browser, { kind, lang, view, step, outcome }) {
  const name = `${kind}-${lang}-${view}-${step}-${outcome}`
  const w = new Walk(browser, name)
  const warns = []
  const started = new Date().toISOString()
  try {
    await w.open()
    w.page.on('Runtime.consoleAPICalled', (e) => { const s = e.args.map((a) => a.value ?? a.description ?? '').join(' '); if (/could not copy/.test(s)) warns.push(s.slice(0, 200)) })
    await setViewport(w, view)
    await fresh(w, lang)
    await w.click('#feedback-open'); await sleep(300)
    if (kind === 'real') await applyFault(w, 'F5', { setting: outcome === 'resolved' ? 'granted' : 'denied' })
    await w.type('#feedback-message', 'A test message.')
    const installed = kind === 'real' ? null : await w.evaluate(STAND)
    await w.click('#feedback-copy'); await sleep(200)
    const pressed = await read(w)
    if (step === 'close') await w.click('#feedback-close')
    if (step === 'escape') await w.press('Escape')
    if (step === 'reopen') { await w.click('#feedback-close'); await sleep(300); await w.click('#feedback-open') }
    if (step === 'focus') await w.click('#feedback-message')
    await sleep(300)
    const beforeSettle = await read(w)
    if (kind !== 'real') await w.evaluate(`window.__vh235.settle(${outcome === 'resolved'})`)
    await sleep(600)
    const afterSettle = await read(w)
    let nextOpening = null
    if (step === 'close' || step === 'escape') { await w.click('#feedback-open'); await sleep(300); nextOpening = await read(w) }
    const rec = { name, kind, lang, view, mode: 'light', step, outcome, started, installed, pressed, beforeSettle, afterSettle, nextOpening, warns, ok: true }
    appendFileSync(OUT, JSON.stringify(rec) + '\n')
    console.log(`${name}: pressed "${pressed.text.slice(0, 30)}" open ${pressed.open}; before settle "${beforeSettle.text.slice(0, 30)}" open ${beforeSettle.open} focus ${beforeSettle.focus}; after "${afterSettle.text.slice(0, 40)}" open ${afterSettle.open} focus ${afterSettle.focus} top ${beforeSettle.scrollTop}->${afterSettle.scrollTop}; next ${nextOpening ? JSON.stringify(nextOpening.text.slice(0, 30)) : '-'}; warns ${warns.length}`)
  } catch (e) {
    appendFileSync(OUT, JSON.stringify({ name, kind, lang, view, step, outcome, started, ok: false, error: String(e?.stack ?? e).slice(0, 600) }) + '\n')
    console.log(`${name}: NOT REACHED ${String(e).slice(0, 200)}`)
  } finally {
    await w.close().catch(() => undefined)
  }
}

const browser = await connectBrowser()
const cells = []
// Qualification: the real clipboard (F5) and the stand-in, same opening, each outcome, each language.
for (const lang of LANGS) for (const outcome of ['resolved', 'rejected']) {
  cells.push({ kind: 'real', lang, view: 'w1280', step: 'same', outcome })
  cells.push({ kind: 'qual', lang, view: 'w1280', step: 'same', outcome })
}
// The late route: 18, then the same opening with focus moved by the user: 6.
for (const step of ['close', 'escape', 'reopen']) for (const outcome of ['resolved', 'rejected']) for (const lang of LANGS) cells.push({ kind: 'late', lang, view: 'w1280', step, outcome })
for (const view of ['w1280', 'w320']) for (const lang of LANGS) cells.push({ kind: 'late', lang, view, step: 'focus', outcome: 'resolved' })
const t0 = Date.now()
for (const c of cells) await cell(browser, c)
console.log(`late: ${cells.length} cells in ${Math.round((Date.now() - t0) / 1000)} s`)
browser.close()
process.exit(0)
