// V31-A11Y-SAMPLE: the browser side of `npm run a11y:sample`, never in `npm run a11y`'s run (the configuration selects
// this file only when A11Y_SAMPLE is set). Phase `discover` opens each declared state, then lists the app's own routes
// or walks from its entry points — following same-origin links by their address and operating buttons, tabs and menu
// items by role and name, to the configured depth — keying each state by its address and tree digest. Phase `relate`
// renders each sampled state twice by default and once under each adaptation, capturing the visible words, the
// accessibility tree and the controls; tools/a11y-sample.mjs judges the relations from those captures, so every
// verdict is made in plain Node. Recording only: nothing here asserts.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Page } from '@playwright/test';
import { SPACING, open, project, test } from './helpers';
import { DEFAULTS, OPERATE, address, kindOf, nodes, stateKey } from '../../tools/a11y-sample.mjs';

const RUN = process.env.A11Y_RUN_DIR as string;
const PHASE = process.env.A11Y_SAMPLE;
const cfg = { ...DEFAULTS, ...(project.sample ?? {}) };
const skip = new RegExp(cfg.skip, 'i');
type Route = { entry: string; steps: { role: string; name: string; nth: number }[]; declared?: string };

async function settle(page: Page) {
  await page.waitForLoadState('load').catch(() => {});
  await page.waitForTimeout(cfg.settle ?? 300);
}
// A state is reopened from scratch by its route: a declared state as the project opens it, any other by its entry's
// address and the recorded clicks, each control found by role, exact name and index.
async function reopen(page: Page, route: Route) {
  if (route.declared) {
    const state = project.states.find((s: { name: string }) => s.name === route.declared);
    if (!state) throw new Error(`no declared state ${route.declared}`);
    await open(page, state);
  } else {
    await page.goto(route.entry);
    for (const st of route.steps) {
      await settle(page);
      await page.getByRole(st.role as Parameters<Page['getByRole']>[0], { name: st.name, exact: true }).nth(st.nth).click({ timeout: 5_000 });
    }
  }
  await settle(page);
}
const snapshot = (page: Page) => page.locator('body').ariaSnapshot({ timeout: 10_000 });

// One render's capture: the words shown, the tree, the controls and the probe that says which adaptation took.
async function capture(page: Page, narrow: boolean) {
  const yaml = await snapshot(page);
  const data = await page.evaluate((narrow) => {
    const W = window.innerWidth;
    const clipped = (r: DOMRect, el: Element) => { for (let p: Element | null = el; p && p !== document.documentElement; p = p.parentElement) { const s = getComputedStyle(p); if (!/(hidden|clip)/.test(s.overflowX + s.overflowY)) continue; const q = p.getBoundingClientRect(); if (r.left < q.left - 1 || r.right > q.right + 1 || r.top < q.top - 1 || r.bottom > q.bottom + 1) return p; } return null; };
    const scroller = (el: Element) => { for (let p: Element | null = el; p && p !== document.body; p = p.parentElement) if (/(auto|scroll)/.test(getComputedStyle(p).overflowX)) return true; return false; };
    const outside = (r: DOMRect, el: Element) => narrow && (r.left < -1 || r.right > W + 1) && !scroller(el);
    const words: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      const el = t.parentElement;
      if (!el || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) continue;
      const s = getComputedStyle(el);
      if (s.visibility !== 'visible') continue;
      const text = t.textContent || '';
      for (const m of text.matchAll(/\S+/g)) {
        const range = document.createRange(); range.setStart(t, m.index!); range.setEnd(t, m.index! + m[0].length);
        const rects = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
        if (rects.length && rects.every((r) => !clipped(r, el) && !outside(r, el))) words.push(m[0]);
      }
    }
    const SEL = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=menuitemcheckbox], [role=menuitemradio], [role=checkbox], [role=radio], [role=switch], [role=combobox], [role=slider], [role=spinbutton], [role=textbox], [role=option], [tabindex]:not([tabindex="-1"])';
    const IMPLICIT: Record<string, string> = { A: 'link', BUTTON: 'button', SELECT: 'combobox', TEXTAREA: 'textbox', SUMMARY: 'button' };
    const INPUT: Record<string, string> = { checkbox: 'checkbox', radio: 'radio', range: 'slider', button: 'button', submit: 'button', reset: 'button', number: 'spinbutton' };
    const roleOf = (el: Element) => el.getAttribute('role') || IMPLICIT[el.tagName] || (el.tagName === 'INPUT' ? INPUT[(el as HTMLInputElement).type] || 'textbox' : 'generic');
    const labelOf = (el: Element) => (el.getAttribute('aria-label') || (el.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean).map((id) => document.getElementById(id)?.textContent || '').join(' ') || (el as HTMLInputElement).labels?.[0]?.textContent || el.textContent || el.getAttribute('placeholder') || el.getAttribute('title') || el.id || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    const controls = [];
    for (const el of document.querySelectorAll(SEL)) {
      const first = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (!first.width || !first.height || s.visibility !== 'visible') { controls.push({ role: roleOf(el), label: labelOf(el), ok: false, why: 'is not shown' }); continue; }
      el.scrollIntoView({ block: 'center', inline: 'center' });
      const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      const hit = document.elementFromPoint(Math.min(Math.max(x, 0), W - 1), Math.min(Math.max(y, 0), window.innerHeight - 1));
      const by = clipped(r, el);
      const why = by ? `is clipped by ${by.id ? `#${by.id}` : by.tagName.toLowerCase()}` : outside(r, el) ? `lies outside the ${W} px width` : !hit || !(hit === el || el.contains(hit) || (hit as HTMLLabelElement).control === el) ? `is covered at its centre by ${hit ? (hit.id ? `#${hit.id}` : hit.tagName.toLowerCase()) : 'nothing'}` : '';
      controls.push({ role: roleOf(el), label: labelOf(el), ok: !why, why });
    }
    window.scrollTo(0, 0);
    const fonts: number[] = [];
    for (const el of document.body.querySelectorAll('*')) if ([...el.childNodes].some((n) => n.nodeType === 3 && (n.textContent || '').trim()) && el.getClientRects().length) fonts.push(parseFloat(getComputedStyle(el).fontSize));
    fonts.sort((a, b) => a - b);
    const root = getComputedStyle(document.documentElement), body = getComputedStyle(document.body), bf = parseFloat(body.fontSize);
    // The four spacing overrides on every rendered element holding text and every rendered paragraph: how many meet
    // each, in multiples of their own font size.
    const near = (v: number, t: number, e: number) => Math.abs(v - t) < e;
    const spacing = { elements: 0, line: 0, letter: 0, word: 0, paragraphs: 0, paragraph: 0 };
    for (const el of document.body.querySelectorAll('*')) {
      if (!el.getClientRects().length) continue;
      const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize);
      if (el.tagName === 'P') { spacing.paragraphs++; if (near(parseFloat(cs.marginBottom) / fs, 2, 0.05)) spacing.paragraph++; }
      if (![...el.childNodes].some((n) => n.nodeType === 3 && (n.textContent || '').trim())) continue;
      spacing.elements++;
      if (near(parseFloat(cs.lineHeight) / fs, 1.5, 0.05)) spacing.line++;
      if (near((parseFloat(cs.letterSpacing) || 0) / fs, 0.12, 0.01)) spacing.letter++;
      if (near((parseFloat(cs.wordSpacing) || 0) / fs, 0.16, 0.01)) spacing.word++;
    }
    const probe = { innerWidth: W, innerHeight: window.innerHeight, vertical: root.writingMode.startsWith('vertical'), rootFont: parseFloat(root.fontSize), maxTextFont: fonts.at(-1) ?? 0, medianTextFont: fonts[fonts.length >> 1] ?? 0, bodyFont: bf, spacing, forced: matchMedia('(forced-colors: active)').matches, portrait: matchMedia('(orientation: portrait)').matches };
    // Only controls shown in this render count as its controls; one not shown is kept with its reason for the report.
    return { words, controls: controls.filter((c) => c.ok || c.why !== 'is not shown'), hidden: controls.filter((c) => c.why === 'is not shown').length, probe };
  }, narrow);
  return { url: page.url(), key: stateKey(page.url(), yaml), snapshot: yaml, ...data };
}

test.beforeEach(({ page }) => {
  page.on('dialog', (d) => d.dismiss().catch(() => {}));
  page.context().on('page', (p) => { if (p !== page) p.close().catch(() => {}); });
});

if (PHASE === 'discover') {
  test('sample: discover', async ({ page }) => {
    test.setTimeout(cfg.timeout ?? 15 * 60_000);
    const states: Record<string, any>[] = [], seen = new Map<string, Record<string, any>>(), refused: string[] = [];
    let loads = 0; // every page load the discovery makes, declared states and replays alike, bounded by maxLoads
    // Each declared state first, opened as the project opens it, so the walk can tell it from an undeclared one.
    for (const s of project.states) {
      if (loads >= cfg.maxLoads) { refused.push(`maxLoads ${cfg.maxLoads} reached before the declared state ${s.name} opened`); break; }
      loads++;
      try { await reopen(page, { entry: s.path, steps: [], declared: s.name }); } catch (e) { refused.push(`declared ${s.name} did not open: ${String((e as Error).message).split('\n')[0]}`); continue; }
      const yaml = await snapshot(page), key = stateKey(page.url(), yaml);
      const rec = seen.get(key);
      if (rec) { rec.also = [...(rec.also ?? []), s.name]; continue; } // two declarations of one state: both recorded
      const fresh = { key, address: address(page.url()), snapshot: yaml, depth: 0, route: { entry: s.path, steps: [], declared: s.name }, declared: s.name, walked: false };
      seen.set(key, fresh); states.push(fresh);
    }
    const walk = !cfg.routes || cfg.walk;
    const entries: string[] = cfg.routes ?? cfg.entries ?? [...new Set(project.states.map((s: { path: string }) => s.path))];
    const queue: { route: Route; depth: number; parent: string | null }[] = (entries.length ? entries : ['/']).map((entry) => ({ route: { entry, steps: [] }, depth: 0, parent: null }));
    while (queue.length && states.length < cfg.maxStates) {
      if (loads >= cfg.maxLoads) { refused.push(`maxLoads ${cfg.maxLoads} reached: the walk stopped`); break; }
      const item = queue.shift()!;
      loads++;
      try { await reopen(page, item.route); } catch (e) { refused.push(`${item.route.entry} ${item.route.steps.map((s) => `${s.role} "${s.name}"`).join(' > ')}: ${String((e as Error).message).split('\n')[0].slice(0, 120)}`); continue; }
      const yaml = await snapshot(page), key = stateKey(page.url(), yaml);
      let rec = seen.get(key);
      if (rec?.walked !== false && rec) continue; // seen and walked already
      if (!rec) { rec = { key, address: address(page.url()), snapshot: yaml, depth: item.depth, route: item.route, declared: null, parent: item.parent }; seen.set(key, rec); states.push(rec); }
      rec.walked = true;
      if (!walk || item.depth >= cfg.depth) continue;
      const here = new URL(page.url());
      const links: string[] = await page.$$eval('a[href]', (as) => (as as HTMLAnchorElement[]).filter((a) => a.getClientRects().length && !a.hasAttribute('download') && (!a.target || a.target === '_self')).map((a) => a.href));
      for (const href of [...new Set(links)]) {
        const u = new URL(href);
        if (u.origin !== here.origin) { refused.push(`external link ${u.origin}`); continue; }
        if (u.pathname === here.pathname && u.search === here.search) continue; // an in-page anchor is the same state
        queue.push({ route: { entry: address(href), steps: [] }, depth: item.depth + 1, parent: key });
      }
      const counts = new Map<string, number>();
      let actions = 0;
      for (const n of nodes(yaml)) {
        if (!OPERATE.includes(n.role)) continue;
        const name = n.name.replace(/\\(.)/g, '$1'), id = `${n.role} ${name}`, nth = counts.get(id) ?? 0;
        counts.set(id, nth + 1);
        if (!name) { refused.push(`an unnamed ${n.role} at ${address(page.url())}`); continue; }
        if (skip.test(name)) { refused.push(`${n.role} "${name}": its name matches sample.skip`); continue; }
        if (++actions > cfg.maxActions) { refused.push(`${address(page.url())}: more than ${cfg.maxActions} controls; the rest not operated`); break; }
        queue.push({ route: { entry: item.route.entry, steps: [...item.route.steps, { role: n.role, name, nth }] }, depth: item.depth + 1, parent: key });
      }
    }
    if (queue.length) refused.push(`${queue.length} queued action(s) not made: maxStates ${cfg.maxStates} reached`);
    const out = states.map(({ walked, ...s }) => ({ ...s, kind: kindOf(s) }));
    writeFileSync(join(RUN, 'discovered.json'), JSON.stringify({ walk, entries, loads, refused, states: out }, null, 1));
  });
}

if (PHASE === 'relate') {
  const { states } = JSON.parse(readFileSync(join(RUN, 'sample.json'), 'utf8')) as { states: { key: string; route: Route }[] };
  mkdirSync(join(RUN, 'renders'), { recursive: true });
  states.forEach((s, i) => {
    test(`sample: relate ${i} ${s.key}`, async ({ page }, testInfo) => {
      test.setTimeout(5 * 60_000);
      // Every adaptation is applied after the state opens at default settings, its key there recorded first, so the
      // judge can tell a replay that reached another state from a relation that failed; then reset for the next.
      const wide = { width: 1280, height: 800 };
      const take = async (narrow: boolean, apply?: () => Promise<void>, reset?: () => Promise<void>) => {
        try {
          await page.setViewportSize(wide); await reopen(page, s.route);
          if (!apply) return await capture(page, narrow);
          const key = stateKey(page.url(), await snapshot(page));
          await apply(); await settle(page);
          return { ...(await capture(page, narrow)), before: key };
        } catch (e) { return { error: String((e as Error).message).split('\n')[0].slice(0, 200) }; } finally { if (reset) await reset().catch(() => {}); }
      };
      const defaults = [await take(false), await take(false)];
      const adapted: Record<string, unknown> = {};
      // Vertical writing reflows at 256 px high, read from the default render, so reflow is always one render.
      const vertical = 'probe' in defaults[0] && defaults[0].probe.vertical;
      adapted.reflow = await take(true, () => page.setViewportSize(vertical ? { width: 640, height: 256 } : { width: 320, height: 640 }));
      adapted['text-200'] = await take(false, () => page.evaluate(() => { const r = document.documentElement; r.style.fontSize = `${parseFloat(getComputedStyle(r).fontSize) * 2}px`; }));
      adapted['text-spacing'] = await take(false, async () => { await page.addStyleTag({ content: SPACING }); });
      adapted['forced-colours'] = await take(false, () => page.emulateMedia({ forcedColors: 'active' }), () => page.emulateMedia({ forcedColors: 'none' }));
      adapted.orientation = await take(true, () => page.setViewportSize({ width: 800, height: 1280 }));
      const engine = testInfo.project.name;
      writeFileSync(join(RUN, 'renders', `${engine}-${String(i).padStart(3, '0')}.json`), JSON.stringify({ key: s.key, engine, defaults, adapted }));
    });
  });
}
