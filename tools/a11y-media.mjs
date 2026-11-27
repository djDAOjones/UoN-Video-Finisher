#!/usr/bin/env node
// V31-A11Y stage 4: the media method, feature-bound — an ffprobe stream inventory of each declared item, WebVTT or SRT
// cue and language parsing of its caption files (an SRT file, which carries no language, takes the declared one), description tracks or a described version, a linked full text alternative,
// and the player and autoplay journeys in the headless shell: captions selectable in the player, the described track
// or version selectable and playing, autoplaying audio stopping within three seconds or carrying a control. Each row
// reads from what the items declare and what the page shows; caption accuracy and description adequacy stay human.
// Writes methods/media.json and media/inventory.json; run by a11y-extended.mjs when the doctor reads media ready and a
// media feature is present. It starts no server itself.
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { applicable, baseURL, loadProject, playwrightLib, readJSON, toolMain, writeJSON } from './a11y-extended.mjs';

// A WebVTT timestamp, whole: optional hours, minutes and seconds under 60, three decimals.
const TIME = /^(?:(\d{2,}):)?([0-5]\d):([0-5]\d)\.(\d{3})$/;
const secs = (s) => { const m = s.trim().match(TIME); if (!m) return null; return (+(m[1] ?? 0)) * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000; };
// WebVTT: the header, an optional Language line, cues with monotonic timings and text.
export function parseVTT(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  if (!/^WEBVTT/.test(lines[0] || '')) return { ok: false, problems: ['not a WebVTT file (no WEBVTT header)'], cues: 0, language: null };
  const language = (lines.slice(0, 20).find((l) => /^Language:/i.test(l)) || '').split(':')[1]?.trim() || null;
  const problems = []; let cues = 0, last = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\S+)\s+-->\s+(\S+)(?:\s|$)/);
    if (!m) { if (/-->/.test(lines[i])) problems.push(`line ${i + 1}: malformed timing ${lines[i].trim()}`); continue; }
    const a = secs(m[1]), b = secs(m[2]);
    cues++;
    if (a === null || b === null || b <= a) problems.push(`cue ${cues}: bad timing ${lines[i].trim()}`);
    else if (a < last) problems.push(`cue ${cues}: starts before the previous cue ends`);
    else last = b;
    const body = []; for (let k = i + 1; k < lines.length && lines[k].trim(); k++) body.push(lines[k]);
    if (!body.join('').replace(/<[^>]+>/g, '').trim()) problems.push(`cue ${cues}: no text`);
  }
  if (!cues) problems.push('no cue');
  return { ok: !problems.length, problems, cues, language, duration: last };
}

// SRT, by its .srt name: numbered cues, each a timing line with hours and a comma or full stop before the milliseconds,
// then its text; the same checks as WebVTT, no language of its own.
const SRT_TIME = /^(\d{2,}):([0-5]\d):([0-5]\d)[,.](\d{3})$/;
const srtSecs = (s) => { const m = s.trim().match(SRT_TIME); return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000 : null; };
export function parseSRT(text) {
  const blocks = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const problems = []; let cues = 0, last = -1;
  for (const b of blocks) {
    const lines = b.split('\n'), t = lines.findIndex((l) => /-->/.test(l));
    if (t < 0) { problems.push(`block ${cues + 1}: no timing line`); continue; }
    cues++;
    if (t !== 1 || !/^\d+$/.test(lines[0].trim())) problems.push(`cue ${cues}: ${t === 0 ? 'no cue number before its timing' : `"${lines[0].trim().slice(0, 30)}" is not a cue number before its timing`}`);
    if (lines.slice(t + 1).some((l) => /-->/.test(l))) problems.push(`cue ${cues}: a second timing line with no blank line before it`);
    const m = lines[t].match(/^(\S+)\s+-->\s+(\S+)$/), a = m && srtSecs(m[1]), z = m && srtSecs(m[2]);
    if (a === null || z === null || !m || z <= a) problems.push(`cue ${cues}: bad timing ${lines[t].trim()}`);
    else if (a < last) problems.push(`cue ${cues}: starts before the previous cue ends`);
    else last = z;
    if (!lines.slice(t + 1).join('').replace(/<[^>]+>/g, '').trim()) problems.push(`cue ${cues}: no text`);
  }
  if (!cues) problems.push('no cue');
  return { ok: !problems.length, problems, cues, language: null, duration: last };
}
export const parseCaptions = (file, text) => (/\.srt$/i.test(file) ? parseSRT(text) : parseVTT(text));

export async function mediaMethod({ root, run, date }) {
  const project = await loadProject(root), cov = readJSON(root, 'project/a11y/coverage.json');
  const items = project.extended?.media ?? [];
  const base = baseURL(project);
  const inventory = [];
  for (const m of items) {
    const file = join(root, m.file);
    const probe = spawnSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', file], { encoding: 'utf8', timeout: 60_000 });
    let streams = [], format = null, error = probe.status === 0 ? null : (probe.stderr || `ffprobe exited ${probe.status}`).trim().split('\n')[0];
    try { const j = JSON.parse(probe.stdout || '{}'); streams = j.streams || []; format = j.format || null; } catch { error ??= 'ffprobe printed no JSON'; }
    const types = streams.map((s) => s.codec_type);
    const kind = error ? 'unknown' : types.includes('video') && types.includes('audio') ? 'synchronized' : types.includes('video') ? 'video-only' : types.includes('audio') ? 'audio-only' : 'none';
    const described = streams.some((s) => s.codec_type === 'audio' && (s.disposition?.descriptions || /descri/i.test(s.tags?.title || ''))) || (m.descriptions ?? []).some((d) => existsSync(join(root, d.file)));
    const captions = (m.captions ?? []).map((c) => { const p = join(root, c.file); if (!existsSync(p)) return { file: c.file, ok: false, problems: ['missing'], language: c.lang ?? null }; const v = parseCaptions(c.file, readFileSync(p, 'utf8')); return { file: c.file, ...v, language: v.language ?? c.lang ?? null }; });
    const transcript = m.transcript ? (existsSync(join(root, m.transcript)) ? 'file' : 'route') : null;
    inventory.push({ item: m.name, file: m.file, kind, duration: format?.duration ? Number(format.duration) : null, streams: streams.map((s) => ({ type: s.codec_type, codec: s.codec_name, language: s.tags?.language ?? null, descriptions: !!s.disposition?.descriptions })), captions, described, transcript: m.transcript ?? null, transcriptFound: transcript, error });
  }
  // The player journeys, per item with a declared player on its state.
  const pw = await playwrightLib(root);
  const journeys = {};
  // Autoplay as a browser that allows it runs it: Chromium's default policy would hold unmuted audio back, and audio that
  // never started reads as stopped (stage 4's second session found 1.4.2 passed that way on looping audio).
  const browser = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    for (const m of items) {
      const st = project.states.find((s) => s.name === m.state), out = { captionsSelectable: null, describedPlays: null, autoplay: null, transcriptLinked: null, problems: [] };
      try {
        await page.goto(base + st.path);
        if (st.setup) await st.setup({ page });
        if (m.transcript) out.transcriptLinked = await page.evaluate((t) => [...document.querySelectorAll('a[href]')].some((a) => a.getAttribute('href') === t || a.href.endsWith(t)), m.transcript);
        if (m.player) {
          const el = page.locator(m.player).first();
          if (!(await el.count())) throw new Error(`player ${m.player} not found`);
          // Captions are selectable through the player's native controls or a declared captions control that, operated, shows a track.
          const hasTrack = await el.evaluate((v) => [...(v.textTracks || [])].some((x) => ['captions', 'subtitles'].includes(x.kind)));
          const native = await el.evaluate((v) => v.controls);
          if (!hasTrack) out.captionsSelectable = false;
          else if (m.captionsControl) { const c = page.locator(m.captionsControl).first(); out.captionsSelectable = (await c.isVisible().catch(() => false)) && (await c.click().then(() => true).catch(() => false)) && await el.evaluate((v) => [...(v.textTracks || [])].some((x) => ['captions', 'subtitles'].includes(x.kind) && x.mode === 'showing')); }
          else out.captionsSelectable = native ? true : null; // null: a track exists, but nothing declared selects it
          out.autoplay = await el.evaluate((v) => ({ autoplay: v.autoplay, muted: v.muted, controls: v.controls, hasAudio: v.mozHasAudio ?? (v.webkitAudioDecodedByteCount !== undefined ? v.webkitAudioDecodedByteCount > 0 || v.readyState < 2 : true) }));
          const playing = out.autoplay.autoplay || await el.evaluate((v) => !v.paused); // script-started playback counts as autoplay
          if (playing && !out.autoplay.muted) { await page.waitForTimeout(3100); out.autoplay.autoplay = true;
            const seen = await el.evaluate((v) => ({ played: v.played.length ? v.played.end(v.played.length - 1) : 0, stopped: v.paused || v.ended || v.muted || v.volume === 0 }));
            out.autoplay.played = seen.played; out.autoplay.pausedAfter3s = seen.stopped;
            if (!seen.played) out.autoplay.unobserved = 'the browser never started the audio, so whether it stops within 3 s was not observed';
            // A control counts when operating it stops or silences the audio: native controls by their pause, a declared one by its click.
            if (!out.autoplay.pausedAfter3s) { if (m.audioControl) { const c = page.locator(m.audioControl).first(); out.autoplay.control = (await c.isVisible().catch(() => false)) && (await c.click().then(() => true).catch(() => false)) && await el.evaluate((v) => v.paused || v.muted || v.volume === 0); } else out.autoplay.control = out.autoplay.controls ? await el.evaluate((v) => { v.pause(); return v.paused; }) : false; } }
          // The described version plays only through its declared control: without one, nothing here selects it.
          if (m.describedControl) { const c = page.locator(m.describedControl).first(); out.describedSelectable = await c.isVisible().catch(() => false); if (out.describedSelectable) { await c.click(); out.describedPlays = await el.evaluate(async (v) => { try { v.muted = true; await v.play(); } catch { return false; } const t = v.currentTime; await new Promise((r) => setTimeout(r, 1500)); const moved = v.currentTime > t; v.pause(); return moved; }); } else out.describedPlays = false; }
        }
      } catch (e) { out.problems.push(String(e.message).split('\n')[0].slice(0, 160)); }
      journeys[m.name] = out;
    }
  } finally { await browser.close().catch(() => {}); }
  writeJSON(run, 'media/inventory.json', { date, items: inventory, journeys });
  // The rows, each from what applies to the declared items; nothing declared under a present feature is not run; an item
  // ffprobe could not read, a player not found or a journey that threw is an error, never a pass by absence.
  const rows = {}, set = (id, state, note) => { if (applicable(cov, id)) rows[id] = { state, note }; };
  const by = (pred) => inventory.filter(pred), names = (l) => l.map((i) => i.item).join(', ');
  const broken = by((i) => journeys[i.item]?.problems?.length);
  if (!items.length) { for (const id of ['1.2.1', '1.2.2', '1.2.3', '1.2.5', '1.2.8', '1.4.2']) set(id, 'not_run', 'a media feature is present, but tests/a11y/project.mjs declares no media item'); }
  else if (broken.length) { for (const id of ['1.2.1', '1.2.2', '1.2.3', '1.2.5', '1.2.8', '1.4.2']) set(id, 'error', `the player journey failed for ${names(broken)}: ${journeys[broken[0].item].problems[0]}`); }
  else {
    const errored = by((i) => i.error);
    // An item ffprobe could not read leaves its streams unknown: no media row, 1.4.2 included, passes by their absence.
    if (errored.length) for (const id of ['1.2.1', '1.2.2', '1.2.3', '1.2.5', '1.2.8', '1.4.2']) set(id, 'error', `ffprobe could not read ${names(errored)}: ${errored[0].error}`);
    else {
      const single = by((i) => ['audio-only', 'video-only'].includes(i.kind)), sync = by((i) => i.kind === 'synchronized'), prerecorded = [...single, ...sync];
      const noAlt = single.filter((i) => !i.transcript || !journeys[i.item]?.transcriptLinked);
      set('1.2.1', noAlt.length ? 'fail' : 'pass', single.length ? (noAlt.length ? `no linked alternative for ${names(noAlt)}` : `each audio-only or video-only item (${names(single)}) links its alternative`) : 'no audio-only or video-only item declared');
      const unselectable = sync.filter((i) => journeys[i.item]?.captionsSelectable === null);
      const badCaps = sync.filter((i) => !i.captions.length || i.captions.some((c) => !c.ok || !c.language) || journeys[i.item]?.captionsSelectable === false);
      set('1.2.2', badCaps.length ? 'fail' : unselectable.length ? 'not_run' : 'pass', sync.length ? (badCaps.length ? badCaps.map((i) => `${i.item}: ${!i.captions.length ? 'no caption file' : i.captions.flatMap((c) => [...c.problems, ...(c.language ? [] : ['no language'])]).join(', ') || 'no caption track in the player, or its control does not show one'}`).join(' | ') : unselectable.length ? `a caption track exists for ${names(unselectable)}, but no player controls or captionsControl is declared to select it` : `captions parsed (${sync.reduce((a, i) => a + i.captions.reduce((b, c) => b + c.cues, 0), 0)} cue(s)), language known, selectable in the player`) : 'no synchronized item declared');
      const noDesc = sync.filter((i) => !i.described && !(i.transcript && journeys[i.item]?.transcriptLinked));
      set('1.2.3', noDesc.length ? 'fail' : 'pass', sync.length ? (noDesc.length ? `no description track or media alternative for ${names(noDesc)}` : 'a description track or a linked media alternative exists for each item') : 'no synchronized item declared');
      const noControl = sync.filter((i) => i.described && journeys[i.item]?.describedPlays === null);
      const notPlaying = sync.filter((i) => !i.described || journeys[i.item]?.describedPlays === false);
      set('1.2.5', notPlaying.length ? 'fail' : noControl.length ? 'not_run' : 'pass', sync.length ? (notPlaying.length ? `no audio description that plays through its control for ${names(notPlaying)}` : noControl.length ? `a described track or version exists for ${names(noControl)}, but no describedControl is declared to select it` : 'the described version plays through its declared control') : 'no synchronized item declared');
      const noText = prerecorded.filter((i) => !i.transcript || !journeys[i.item]?.transcriptLinked);
      set('1.2.8', noText.length ? 'fail' : 'pass', noText.length ? `no linked full text alternative for ${names(noText)}` : 'a full text alternative is linked from each item\'s page');
    }
    if (!errored.length) {
      const unjudged = inventory.filter((i) => !journeys[i.item]?.autoplay && i.streams.some((s) => s.type === 'audio'));
      const auto = inventory.filter((i) => journeys[i.item]?.autoplay?.autoplay && !journeys[i.item].autoplay.muted && i.streams.some((s) => s.type === 'audio'));
      const loud = auto.filter((i) => !journeys[i.item].autoplay.pausedAfter3s && !journeys[i.item].autoplay.control);
      const unobserved = auto.filter((i) => journeys[i.item].autoplay.unobserved);
      set('1.4.2', loud.length ? 'fail' : unjudged.length || unobserved.length ? 'not_run' : 'pass', loud.length ? `autoplaying audio neither stops within 3 s nor has a working control: ${names(loud)}` : unjudged.length ? `no player declared for ${names(unjudged)}, so autoplay was not observed` : unobserved.length ? `${names(unobserved)}: ${journeys[unobserved[0].item].autoplay.unobserved}` : auto.length ? `autoplaying audio stops within 3 s or its control stops it (${auto.map((i) => `${i.item} played ${journeys[i.item].autoplay.played.toFixed(1)} s`).join(', ')})` : 'no item with an audio stream autoplays unmuted');
    }
  }
  writeJSON(run, 'methods/media.json', { method: 'media', date, rows, note: `${items.length} item(s) declared; inventory in media/inventory.json; caption accuracy and description adequacy stay human` });
  console.log(`a11y-media: ${Object.keys(rows).length} row(s) from ${items.length} item(s)`);
  return 0;
}
toolMain('a11y-media', mediaMethod);
