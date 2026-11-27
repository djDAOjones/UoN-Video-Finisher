#!/usr/bin/env node
// V31-A11Y stage 4: the VoiceOver journeys through Guidepup, with WebKit and Chromium headed, run serially in the
// owner's attended session (VoiceOver takes the keyboard and speech; nothing else should run). Each declared journey,
// per engine, opens its state, moves VoiceOver into the web content, runs its steps and writes a speech log the report
// judges — the expected phrases against what VoiceOver spoke, in order; the log's own state never stands alone. When
// VoiceOver does not start, or an engine does not launch, every log for it reads blocked with the reason; a step that
// throws reads error. Run by a11y-extended.mjs when the doctor reads vo ready; it starts no server itself. The log is
// Guidepup's capture, not a transcript: the first phrase after a move, every phrase until speech settles after a press
// or the entry, phrases an action spoke joined into one entry, nothing captured during a wait; entry retries clear what
// came before, and a journey that errors keeps no speech. The log also records the phrases per step (V31-A11Y-POLISH),
// so an expected phrase bound to the step that must produce it is judged there.
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { baseURL, InputError, loadProject, playwrightLib, rowsOf, toolMain, writeJSON } from './a11y-extended.mjs';
import { pkgInfo } from './a11y-doctor.mjs';

const msg = (e) => String(e?.message ?? e).split('\n')[0].slice(0, 200);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Guidepup keeps the first phrase after a navigation step, so its hints stay out of the log, and every phrase until the
// speech settles after an action, so a status spoken after the first is logged (heard 2026-10-29).
const FULL = { capture: true };
async function step(vo, s) {
  const [k, v] = Object.entries(s)[0];
  if (k === 'next') return vo.next();
  if (k === 'previous') return vo.previous();
  if (k === 'act') return vo.act(FULL);
  if (k === 'interact') return vo.interact();
  if (k === 'stopInteracting') return vo.stopInteracting();
  if (k === 'press') return vo.press(String(v), FULL);
  if (k === 'type') return vo.type(String(v));
  if (k === 'wait') return sleep(Math.min(Number(v) || 0, 5000));
  if (k === 'perform') { const c = vo.keyboardCommands?.[v]; if (!c) throw new InputError(`no VoiceOver keyboard command named ${v}`); return vo.perform(c); }
  throw new InputError(`unknown step ${k}`);
}
// Into the web content, as @guidepup/playwright's navigateToWebContent does, which core Guidepup 0.36 does not carry
// (heard 2026-10-29): the engine's app activated by its Playwright name, the page's body focused, VoiceOver interacting
// with the content from its left edge, both logged in full. VoiceOver is in the page when its item is the page's text
// or its entry named the page's web content by the title; the jump itself speaks nothing (heard 2026-10-30). A new
// window can leave VoiceOver in the browser's toolbar (heard 2026-10-29); then it steps out of the toolbar once and
// across, at most four times, entering where it reaches the page, the log cleared of the toolbar first. The tries go
// in the log's reason. At most four recovery moves; window confinement is not verified, here or in the steps after.
const APP = { webkit: 'Playwright', chromium: 'Chromium' };
const flat = (t) => String(t ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
async function toWebContent(activate, vo, page, engine) {
  const title = flat(await page.title()), text = flat(await page.locator('body').innerText());
  const inPage = async () => {
    const item = flat(await vo.itemText());
    if (item && text.includes(item.slice(0, 24))) return true;
    return (await vo.spokenPhraseLog()).map(flat).some((p) => !!title && p.includes(title) && /web content|html content/.test(p) && !p.startsWith('out of'));
  };
  const enter = async () => {
    await vo.interact(FULL);
    await vo.perform(vo.keyboardCommands.jumpToLeftEdge, FULL);
  };
  await activate(APP[engine]);
  await page.bringToFront();
  await page.locator('body').waitFor();
  await page.locator('body').focus();
  await vo.clearSpokenPhraseLog();
  await enter();
  let tries = 1;
  if (!(await inPage())) {
    await vo.stopInteracting();
    while (tries < 5) {
      tries++;
      await vo.clearSpokenPhraseLog();
      await vo.next(FULL);
      if (await inPage()) { await vo.clearSpokenPhraseLog(); await enter(); break; }
    }
  }
  if (!(await inPage())) throw new Error(`VoiceOver did not reach the page's content in ${tries} tries`);
  return tries;
}

export async function voJourneys({ root, run, date }) {
  const project = await loadProject(root);
  const journeys = project.extended?.voJourneys ?? [];
  const states = Object.fromEntries(project.states.map((s) => [s.name, s]));
  const base = baseURL(project);
  const gp = pkgInfo(root, '@guidepup/guidepup');
  if (!gp) throw new InputError('@guidepup/guidepup is not installed');
  const mod = await import(pathToFileURL(join(gp.dir, gp.main)).href);
  const vo = mod.voiceOver ?? mod.default?.voiceOver;
  if (!vo) throw new InputError('Guidepup exports no voiceOver');
  const activate = mod.macOSActivate ?? mod.default?.macOSActivate;
  if (!activate) throw new InputError('Guidepup exports no macOSActivate');
  const pw = await playwrightLib(root);
  mkdirSync(join(run, 'speech'), { recursive: true });
  let n = 0;
  const log = (j, engine, body) => writeJSON(run, `speech/${String(++n).padStart(2, '0')}-${j.name}-${engine}.json`, { journey: j.name, engine, rows: rowsOf(j.rows), expected: j.expected, heard: [], state: 'error', date, ...body });
  const pairs = ['webkit', 'chromium'].flatMap((engine) => journeys.filter((j) => (j.engines ?? ['webkit', 'chromium']).includes(engine)).map((j) => [engine, j]));
  let started = false;
  try { await vo.start(); started = true; } catch (e) { for (const [engine, j] of pairs) log(j, engine, { state: 'blocked', reason: `VoiceOver did not start through Guidepup ${gp.version}: ${msg(e)}` }); return 0; }
  try {
    // One browser per journey: a second window in WebKit left VoiceOver in the toolbar (heard 2026-10-29).
    for (const [engine, j] of pairs) {
      let browser;
      try { browser = await pw[engine].launch({ headless: false }); } catch (e) { log(j, engine, { state: 'blocked', reason: `${engine} did not launch headed: ${msg(e)}` }); continue; }
      try {
        const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
        const st = states[j.state];
        await page.goto(base + st.path);
        if (st.setup) await st.setup({ page });
        const tries = await toWebContent(activate, vo, page, engine);
        // What each step made VoiceOver say, so an expected phrase bound to a step is judged in that step's phrases alone:
        // step 0 is the entry into the page, step n the nth step; the log grows as commands return, so a step's phrases
        // are what the log gained, and a phrase spoken after its step returned belongs to no step.
        const spoken = async () => (await vo.spokenPhraseLog()).map((p) => String(p).trim()).filter(Boolean);
        let seen = await spoken();
        const steps = [{ step: 0, kind: 'entry', heard: seen }];
        for (const [n, s] of j.steps.entries()) {
          await step(vo, s);
          const now = await spoken();
          steps.push({ step: n + 1, kind: Object.keys(s)[0], heard: now.length >= seen.length ? now.slice(seen.length) : now });
          seen = now;
        }
        const heard = steps.flatMap((x) => x.heard);
        log(j, engine, { heard, steps, state: 'pass', reason: `${heard.length} phrase(s) spoken in ${engine}, the page entered in ${tries} ${tries === 1 ? 'try' : 'tries'}; the report judges them against the expected` });
      } catch (e) { log(j, engine, { state: 'error', reason: `journey ${j.name} in ${engine}: ${msg(e)}` }); }
      finally { await browser.close().catch(() => {}); }
    }
  } finally { if (started) await vo.stop().catch(() => {}); }
  console.log(`a11y-vo: ${n} speech log(s) written`);
  return 0;
}
toolMain('a11y-vo', voJourneys);
