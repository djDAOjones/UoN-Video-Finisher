#!/usr/bin/env node
// V31-A11Y stage 4: frame capture for flashing content, a capture method — material for specialist analysis, since
// the sources name no validated flash analyser that runs on macOS. For each declared flashing item: its state opened in
// the headless shell, the start control pressed where one is declared, then frames of the item's box (or the viewport)
// by screenshot at the declared rate for the declared seconds, into flash/<item>/, with an inventory of what was
// captured and the project's no-flashing design constraint where it records one. Rows 2.3.1, 2.3.2 and CONF05 read
// unverified: nothing here judges flash safety. Run by a11y-extended.mjs when the doctor reads flash-capture ready
// and the flashing feature is present.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { applicable, baseURL, loadProject, methodRows, playwrightLib, readJSON, toolMain, writeJSON } from './a11y-extended.mjs';

export async function flashCapture({ root, run, date }) {
  const project = await loadProject(root), cat = readJSON(root, 'project/a11y/catalogue.json'), cov = readJSON(root, 'project/a11y/coverage.json');
  const items = project.extended?.flashing ?? [], constraint = project.extended?.flashingConstraint ?? null;
  const pw = await playwrightLib(root), base = baseURL(project);
  const inventory = [], problems = [];
  const browser = await pw.chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    for (const f of items) {
      const st = project.states.find((s) => s.name === f.state), dir = join(run, 'flash', f.name);
      mkdirSync(dir, { recursive: true });
      try {
        await page.goto(base + st.path);
        if (st.setup) await st.setup({ page });
        if (f.start) await page.locator(f.start).click();
        const clip = f.selector ? await page.locator(f.selector).first().boundingBox() : null;
        if (f.selector && !clip) throw new Error(`${f.selector} has no box`);
        const fps = f.fps ?? 20, seconds = f.seconds ?? 3, interval = 1000 / fps, total = Math.round(fps * seconds);
        const t0 = Date.now(), times = [];
        for (let i = 0; i < total; i++) {
          const due = t0 + i * interval, now = Date.now();
          if (due > now) await page.waitForTimeout(due - now);
          times.push(Date.now() - t0);
          await page.screenshot({ path: join(dir, `frame-${String(i).padStart(3, '0')}.png`), clip: clip ?? undefined, scale: 'css' });
        }
        inventory.push({ item: f.name, state: f.state, selector: f.selector ?? null, startedBy: f.start ?? null, frames: total, fps, seconds, firstAt: times[0], lastAt: times.at(-1), box: clip, viewport: { width: 1280, height: 800 }, folder: `flash/${f.name}` });
      } catch (e) { problems.push(`${f.name}: ${String(e.message).split('\n')[0].slice(0, 160)}`); }
    }
  } finally { await browser.close().catch(() => {}); }
  writeJSON(run, 'flash/inventory.json', { date, constraint, items: inventory, problems, note: 'frames for specialist analysis; no validated flash analyser runs on macOS, so nothing here judges 2.3.1 or 2.3.2' });
  const rows = {};
  const note = items.length ? `${inventory.reduce((a, i) => a + i.frames, 0)} frame(s) of ${inventory.length} item(s) captured for specialist analysis${constraint ? `; design constraint recorded: ${constraint.slice(0, 120)}` : ''}${problems.length ? `; not captured: ${problems.join(' | ')}` : ''}` : 'flashing declared present, but tests/a11y/project.mjs declares no flashing item to capture';
  for (const id of methodRows(cat, 'flash-capture')) if (applicable(cov, id)) rows[id] = problems.length ? { state: 'error', note } : items.length ? { state: 'unverified', note } : { state: 'not_run', note };
  writeJSON(run, 'methods/flash-capture.json', { method: 'flash-capture', date, rows, note: 'a capture: material, never a judgement' });
  console.log(`a11y-flash: ${inventory.length} item(s) captured`);
  return 0;
}
toolMain('a11y-flash', flashCapture);
