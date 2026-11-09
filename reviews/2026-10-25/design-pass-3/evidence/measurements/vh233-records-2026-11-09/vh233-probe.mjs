// VH-233 #1's read-only probe of S-81's two statement links, modelled on VH-203's s113-probe.mjs (the walker's own setup, viewport, mode and
// focusArea, unchanged, imported). The walker's S-81 focus subject `#accessibility-statement a` is `document.querySelector`'s first match,
// the contact address only (qualify.mjs, focusArea), so this probe reads both links by their own paragraphs, `#statement-contact a` and
// `#statement-enforcement a`, at the same cells as the matrix, each on a page of its own (its setup as the matrix's: viewport, fonts,
// S-81's setup, then the mode). Per cell and link it records: the walker's focusArea reading (area at 3:1, the fragments' 2 px perimeter,
// 2.4.7's :focus-visible, the best ratio) with its two captures; the link's line fragments, the gaps and overlaps between consecutive
// lines; the unfocused and focused computed outline and box-decoration-break; and whether each fragment's centre hit-tests to the link
// (2.4.11, 2.4.12) with the ring's extent inside the viewport. `--trial <css file>[,…]` (the design's probe on the base only) injects each
// candidate stylesheet into the page, in memory, after the reading without it, and reads again; nothing is written to the repository,
// the walker or samples/. Moves focus and scroll only as focusArea does, on its own page.
// Before those readings (from 00:42Z, after the design compare), the Tab arrival: summary, Tab, Tab, Shift+Tab, read where focus lands.
//   FIX=… CDP_PORT=… APP_URL=… OUT_ROOT=… RUN_ROOT=… WALKER=… OUTD=… node vh233-probe.mjs --keys <file> [--trial a.css,b.css]
import { pathToFileURL } from 'node:url'
import { join, basename } from 'node:path'
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
const WALKER = process.env.WALKER, OUTD = process.env.OUTD
if (!WALKER || !OUTD) throw new Error('set WALKER and OUTD')
const imp = (f) => import(pathToFileURL(join(WALKER, f)).href)
const { connectBrowser } = await imp('cdp.mjs')
const { Walk, sleep } = await imp('walk.mjs')
const Q = await imp('qualify.mjs')
const { MX_INIT } = await imp('scenarios.mjs')
const { P8_INIT } = await imp('phase8.mjs')
const { SCENARIOS } = await imp('matrix.mjs')
const { instrumentRevision } = await imp('runner.mjs')
const argv = process.argv.slice(2), opt = (n) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : undefined }
const keys = readFileSync(opt('keys'), 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)
const trials = (opt('trial') ?? '').split(',').filter(Boolean).map((f) => { const css = readFileSync(f, 'utf8'); return { name: basename(f), css, sha1: createHash('sha1').update(css).digest('hex') } })
const LINKS = { contact: '#statement-contact a', service: '#statement-enforcement a' }
const OUT = join(OUTD, 'vh233-probe.jsonl'), PNG = join(OUTD, 'png'); mkdirSync(PNG, { recursive: true })
const sc = SCENARIOS['S-81']
if (!sc?.setup) throw new Error('no S-81 scenario')
const VIEWS = Q.VIEWS

// The link's geometry, unfocused or focused as it stands: fragments, consecutive gaps and overlaps, computed style, and hit tests.
const GEOM = (sel) => `(() => {
  const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return { error: 'no element' };
  const r2 = (n) => Math.round(n * 100) / 100, cs = getComputedStyle(el), p = el.parentElement, ps = getComputedStyle(p);
  const frags = [...el.getClientRects()].filter((q) => q.width > 0 && q.height > 0).map((q) => ({ x: r2(q.left), y: r2(q.top), w: r2(q.width), h: r2(q.height) }));
  const pairs = frags.slice(1).map((q, i) => { const a = frags[i]; return { gap: r2(q.y - (a.y + a.h)), xOverlap: r2(Math.min(a.x + a.w, q.x + q.w) - Math.max(a.x, q.x)) }; });
  const ow = cs.outlineStyle !== 'none' ? parseFloat(cs.outlineWidth) || 0 : 0, oo = parseFloat(cs.outlineOffset) || 0, g = ow ? ow + oo : 0;
  const ringIn = frags.every((q) => q.x - g >= -0.5 && q.y - g >= -0.5 && q.x + q.w + g <= innerWidth + 0.5 && q.y + q.h + g <= innerHeight + 0.5);
  const hits = frags.map((q) => { const h = document.elementFromPoint(q.x + q.w / 2, q.y + q.h / 2); return !!h && (h === el || el.contains(h)); });
  return { text: el.textContent, href: el.getAttribute('href'), focused: document.activeElement === el, focusVisible: el.matches(':focus-visible'),
    display: cs.display, color: cs.color, textDecorationLine: cs.textDecorationLine, boxDecorationBreak: cs.boxDecorationBreak ?? null, webkitBoxDecorationBreak: cs.webkitBoxDecorationBreak ?? null,
    outline: { style: cs.outlineStyle, width: cs.outlineWidth, offset: cs.outlineOffset, color: cs.outlineColor },
    paragraph: { id: p.id, fontSize: ps.fontSize, lineHeight: ps.lineHeight, width: r2(p.getBoundingClientRect().width) },
    fragments: frags, pairs, ringInViewport: ringIn, fragmentCentresHitLink: hits, scroll: [scrollX, scrollY], vw: innerWidth, vh: innerHeight };
})()`

const browser = await connectBrowser()
const rev = instrumentRevision().revision
let notReached = 0
for (const key of keys) {
  const [id, lang, view, mode] = key.split('__')
  if (id !== 'S-81') throw new Error('not an S-81 key: ' + key)
  const put = (what, r) => appendFileSync(OUT, JSON.stringify({ key, lang, view, mode, revision: rev, what, ...r }) + '\n')
  const png = (name, buf) => { const f = `${key}__${name}.png`; writeFileSync(join(PNG, f), buf); return f }
  const w = new Walk(browser, `vh233-probe/${key}`)
  try {
    await w.open()
    await w.page.send('Page.addScriptToEvaluateOnNewDocument', { source: Q.QUAL_INIT })
    await w.page.send('Page.addScriptToEvaluateOnNewDocument', { source: MX_INIT })
    await w.page.send('Page.addScriptToEvaluateOnNewDocument', { source: P8_INIT })
    await Q.setViewport(w, view)
    await Q.withholdFonts(w, mode === 'fallback')
    await sc.setup(w, lang)
    await Q.setMode(w, mode)
    const v = VIEWS[view]
    const reached = await Q.assertReached(w, { lang, mode, state: sc.state, viewport: v ? { w: v.width, h: v.height, dpr: v.deviceScaleFactor } : undefined })
    put('reached', { outcome: reached.outcome, problems: reached.problems })
    if (reached.outcome !== 'pass') { notReached++; console.log('not reached ' + key); continue }
    // Tab arrival with no centring (Codex's design point 4): the summary focused by keyboard, then Tab, Tab and Shift+Tab by the walker's
    // own keys, each read where the browser itself leaves it (which element has focus, the link's ring in the viewport, its centres hit).
    {
      await Q.focusByKeyboard(w, '#accessibility-statement summary')
      const steps = [['Tab', false, 'contact'], ['Tab', false, 'service'], ['Tab', true, 'contact']]
      const read = []
      for (const [k, shift, want] of steps) {
        await Q.key(w, k, { shift }); await sleep(150)
        const active = await w.evaluate(`(() => { const a = document.activeElement; return a ? (a.closest('p')?.id ?? '') + ' ' + a.tagName.toLowerCase() + ' ' + (a.textContent || '').trim().slice(0, 40) : 'none'; })()`)
        read.push({ key: (shift ? 'Shift+' : '') + k, want, active, geom: await w.evaluate(GEOM(LINKS[want])) })
      }
      put('keys', { steps: read, ok: read.every((s) => s.geom.focused && s.geom.focusVisible && s.geom.ringInViewport && s.geom.fragmentCentresHitLink.every(Boolean)) })
      await w.evaluate(`(() => { const a = document.activeElement; if (a && a !== document.body) a.blur(); window.scrollTo(0, 0); })()`)
      await sleep(150)
    }
    for (const cand of [{ name: 'as built', css: null, sha1: null }, ...trials]) {
      if (cand.css) { await w.evaluate(`(() => { const s = document.createElement('style'); s.id = '__vh233-trial'; s.textContent = ${JSON.stringify(cand.css)}; document.head.append(s); })()`); await sleep(150) }
      try {
        for (const [link, sel] of Object.entries(LINKS)) {
          await w.evaluate(`(() => { const a = document.activeElement; if (a && a !== document.body) a.blur(); })()`)
          await sleep(100)
          const unfocused = await w.evaluate(GEOM(sel))
          const f = await Q.focusArea(w, sel)
          const focused = await w.evaluate(GEOM(sel))
          const clips = f.on ? [png(`${cand.name}__${link}-off`, f.off), png(`${cand.name}__${link}-on`, f.on)] : undefined
          delete f.on; delete f.off
          put('link', { candidate: cand.name, candidateSha1: cand.sha1, link, sel, focusArea: f, unfocused, focused, clips })
        }
      } finally {
        await w.evaluate(`(() => { const a = document.activeElement; if (a && a !== document.body) a.blur(); document.getElementById('__vh233-trial')?.remove(); window.scrollTo(0, 0); })()`)
        await sleep(150)
      }
    }
    console.log('probed ' + key)
  } catch (e) {
    put('error', { error: String(e.stack ?? e).slice(0, 400) }); notReached++; console.log('probe failed ' + key + ': ' + String(e.message ?? e).slice(0, 200))
  } finally {
    await w.close()
  }
}
await Q.closeAnalysis()
console.log(`probe done: ${keys.length} keys, ${notReached} not reached or failed`)
process.exit(notReached ? 1 : 0)
