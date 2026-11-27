#!/usr/bin/env node
// V31-A11Y stage 4: the doctor behind `npm run a11y:doctor`. It reads what each extended method needs on this machine
// and reports the method ready, or blocked with its reason, as doctor.json in the report tool's contract: a blocked
// method's rows then read blocked, never passed or not applicable. It never installs, downloads or changes a
// permission: every command it runs answers a version flag or reads a setting, and the one thing it does beyond
// reading is the spoken canary — VoiceOver started through Guidepup, a phrase heard, VoiceOver stopped — attempted
// only when VoiceOver's AppleScript setting is already on and Guidepup is installed. It reports tools, never a human
// method: the review sheet is judgement and the participation record is a record, so neither is here. Node built-ins
// only; macOS only (ruling 13), so elsewhere every method but the bundle is blocked.
// Usage: node tools/a11y-doctor.mjs [--root <dir>] [--out <dir>] [--date YYYY-MM-DD] [--no-canary]
// Exit: 0 when the reading was made (blocked is a reading, not a failure); 2 on a bad option or a crash.
import { accessSync, constants, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir, release } from 'node:os';
import { delimiter, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { childEnv, InputError, playwrightCore } from './a11y-run.mjs';

// The methods the doctor reports: each needs a tool on this machine. sheet (human), participation and bundle (records)
// are not here: the report passes bundle for every extended run from the run folder itself.
export const TOOL_METHODS = ['vo', 'engines', 'touch', 'media', 'flash-capture', 'pdf', 'ios-audit', 'android-checks', 'native-journey', 'ai-review'];
export const BROWSERS = ['chromium', 'chromium-headless-shell', 'firefox', 'webkit', 'ffmpeg'];
const VO_SETTING = ['read', 'com.apple.VoiceOver4/default', 'SCREnableAppleScript'];
const firstLine = (s) => String(s ?? '').replace(/\x1b\[[0-9;]*m/g, '').split('\n').map((l) => l.trim()).find(Boolean) || '';
const real = (p) => { try { return realpathSync(p); } catch { return resolve(p); } };

// The first executable of that name on the child's PATH, or null; nothing is run to find out.
export function which(cmd, env) {
  for (const d of String(env.PATH || '').split(delimiter)) { if (!d) continue; const p = join(d, cmd); try { accessSync(p, constants.X_OK); return p; } catch { /* next */ } }
  return null;
}
// A command answering a version flag or reading a setting: ok when it exits 0; the first line of what it printed.
export function answer(cmd, args, env, timeout = 20_000) {
  if (!(cmd.startsWith('/') ? existsSync(cmd) : which(cmd, env))) return { ok: false, line: `${cmd} is not ${cmd.startsWith('/') ? 'present' : 'on PATH'}` };
  const r = spawnSync(cmd, args, { encoding: 'utf8', env, timeout });
  const line = firstLine(`${r.stdout || ''}\n${r.stderr || ''}`);
  return { ok: r.status === 0, line: line || (r.error ? r.error.message : `exit ${r.status}`), stdout: r.stdout || '' };
}
// A package as Node would resolve it from the project: its folder and version, or null.
export function pkgInfo(root, name) {
  for (let d = root; ; d = dirname(d)) {
    const p = join(d, 'node_modules', name, 'package.json');
    if (existsSync(p)) { try { const j = JSON.parse(readFileSync(p, 'utf8')); return { dir: dirname(p), version: j.version || 'unknown', main: j.main || 'index.js' }; } catch { return null; } }
    if (dirname(d) === d) return null;
  }
}
// A build is present when Playwright's completion marker and an executable are both in its folder.
const hasExecutable = (dir, depth = 0) => { try { for (const n of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, n.name); if (n.isDirectory() && depth < 7 && hasExecutable(p, depth + 1)) return true; if (n.isFile()) { try { accessSync(p, constants.X_OK); return true; } catch { /* not executable */ } } } } catch { /* unreadable */ } return false; };
export const cacheDir = (root, env, home) => (env.PLAYWRIGHT_BROWSERS_PATH === '0' ? join(root, 'node_modules/playwright-core/.local-browsers') : env.PLAYWRIGHT_BROWSERS_PATH || join(home, 'Library/Caches/ms-playwright'));
// Playwright's browser list, from the playwright-core @playwright/test itself resolves, each build looked for in the cache.
export function browsers(root, env, home) {
  const core = playwrightCore(root);
  let list;
  try { list = JSON.parse(readFileSync(join(core, 'browsers.json'), 'utf8')).browsers; } catch { return null; }
  const base = cacheDir(root, env, home), out = {};
  for (const b of list) if (BROWSERS.includes(b.name)) { const dir = join(base, `${b.name.replace(/-/g, '_')}-${b.revision}`), marked = existsSync(join(dir, 'INSTALLATION_COMPLETE')); out[b.name] = { revision: String(b.revision), version: b.browserVersion || null, marked, installed: marked && hasExecutable(dir) }; }
  return out;
}

// The canary, in a child with a deadline: VoiceOver started through Guidepup, a step taken, the phrase heard, VoiceOver
// stopped. Guidepup 0.36 logs a phrase only after an action, so the step comes first, captured in full; a step that
// speaks nothing where it lands, at an edge of the front app, is followed by one back (heard 2026-10-29 and -30). It
// hears VoiceOver in the foreground application, whatever that is; browser entry is tested by the journeys.
const CANARY = `const { pathToFileURL } = await import('node:url');
const mod = await import(pathToFileURL(process.env.A11Y_GUIDEPUP).href);
const vo = mod.voiceOver ?? mod.default?.voiceOver;
const out = (o) => { console.log(JSON.stringify(o)); };
if (!vo) { out({ heard: false, reason: 'Guidepup exports no voiceOver' }); process.exit(0); }
let heard = '', reason = '', started = false;
try {
  await vo.start();
  started = true;
  await vo.next({ capture: true });
  if (!String((await vo.lastSpokenPhrase()) || '')) await vo.previous({ capture: true });
  for (let i = 0; i < 40 && !heard; i++) { heard = String((await vo.lastSpokenPhrase()) || ''); if (!heard) await new Promise((r) => setTimeout(r, 500)); }
  if (!heard) reason = 'VoiceOver started but no phrase was heard within 20 s';
} catch (e) { reason = 'VoiceOver did not start through Guidepup: ' + String(e && e.message || e).split('\\n')[0]; }
finally { if (started) { try { await vo.stop(); } catch { /* already stopped */ } } }
out({ heard: !!heard, phrase: heard.slice(0, 80), reason });
`;
// The adb server's own protocol: a length-prefixed host:devices on 127.0.0.1:5037, in a child with a deadline; nothing starts a daemon.
const ADB_QUERY = `const net = await import('node:net'); let out = '', done = false; const end = (r) => { if (!done) { done = true; console.log(JSON.stringify(r)); process.exit(0); } };
const s = net.connect(5037, '127.0.0.1'); s.setTimeout(3000, () => end({ server: false, devices: 0 })); s.on('error', () => end({ server: false, devices: 0 }));
s.on('connect', () => { const q = 'host:devices'; s.write(q.length.toString(16).padStart(4, '0') + q); });
s.on('data', (d) => { out += d; }); s.on('end', () => { const ok = out.startsWith('OKAY'); end({ server: ok, devices: ok ? out.slice(8).split('\\n').filter((l) => /\\tdevice$/.test(l.trim())).length : 0 }); });
`;
export function adbQuery(env) {
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', ADB_QUERY], { encoding: 'utf8', env, timeout: 8000 });
  try { return JSON.parse(r.stdout.trim().split('\n').at(-1)); } catch { return { server: false, devices: 0 }; }
}
export function canary(guidepup, env, timeout = 90_000) {
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', CANARY], { encoding: 'utf8', env: { ...env, A11Y_GUIDEPUP: join(guidepup.dir, guidepup.main) }, timeout });
  if (r.error || r.status === null) return { heard: false, reason: `the canary did not finish within ${timeout / 1000} s: VoiceOver may need attention` };
  try { return JSON.parse(r.stdout.trim().split('\n').at(-1)); } catch { return { heard: false, reason: `the canary printed no result: ${firstLine(r.stderr) || `exit ${r.status}`}` }; }
}

export function doctor({ root = process.cwd(), env = childEnv(), home = homedir(), date = new Date().toISOString().slice(0, 10), platform = process.platform, canary: tryCanary = true } = {}) {
  root = real(root);
  const methods = {}, tools = { node: process.versions.node }, machine = { platform, release: release() };
  const ready = (m, reason) => { methods[m] = { state: 'ready', reason }; };
  const blocked = (m, reason) => { methods[m] = { state: 'blocked', reason }; };
  const result = () => ({ schema: 1, date, machine, tools, methods: Object.fromEntries(TOOL_METHODS.map((m) => [m, methods[m]])) });
  if (platform !== 'darwin') { for (const m of TOOL_METHODS) blocked(m, `the extended pack runs on macOS only (ruling 13); this is ${platform}`); return result(); }
  const macos = answer('sw_vers', ['-productVersion'], env); machine.macos = macos.ok ? macos.line : 'unknown';
  const voV = answer('defaults', ['read', '/System/Library/CoreServices/VoiceOver.app/Contents/Info', 'CFBundleShortVersionString'], env); machine.voiceover = voV.ok ? voV.line : 'unknown';
  const pw = pkgInfo(root, '@playwright/test'); tools.playwright = pw?.version ?? 'absent';
  const b = browsers(root, env, home), base = cacheDir(root, env, home);
  const named = (n) => (b?.[n] ? `${n} ${b[n].version ?? ''} (revision ${b[n].revision})`.replace(/\s+/g, ' ') : n);
  for (const n of BROWSERS) if (b?.[n]) tools[n] = b[n].installed ? `${b[n].version ?? 'build'} (revision ${b[n].revision})` : 'absent';
  const missing = (names) => (!pw ? ['@playwright/test is not installed'] : !b ? ['Playwright\'s browser list is not installed'] : names.filter((n) => !b[n]?.installed).map((n) => `${named(n)} ${b[n]?.marked ? 'has no executable in' : 'is not in'} ${base}; install it on the owner's word, never from here`));
  const shell = missing(['chromium-headless-shell']);
  // engines: Firefox and WebKit re-run the standard specs headless.
  const eng = missing(['firefox', 'webkit']);
  if (eng.length) blocked('engines', eng.join('; ')); else ready('engines', `${named('firefox')} and ${named('webkit')} in the cache`);
  // touch: the headless shell with a touch device descriptor from Playwright's own core.
  const core = pw && playwrightCore(root);
  let descriptor = false;
  try { descriptor = !!JSON.parse(readFileSync(join(core, 'lib/server/deviceDescriptorsSource.json'), 'utf8'))['Pixel 7']?.hasTouch; } catch { descriptor = false; }
  if (shell.length) blocked('touch', shell.join('; ')); else if (!descriptor) blocked('touch', 'touch emulation unavailable: no Pixel 7 device descriptor in this Playwright build'); else ready('touch', `${named('chromium-headless-shell')} with Playwright's Pixel 7 descriptor`);
  // media: ffprobe for the inventory, ffmpeg beside it, a browser for the player journeys.
  const ffprobe = answer('ffprobe', ['-version'], env), ffmpeg = answer('ffmpeg', ['-version'], env);
  tools.ffprobe = ffprobe.ok ? ffprobe.line.replace(/\s+Copyright.*$/i, '') : 'absent'; tools.ffmpeg = ffmpeg.ok ? ffmpeg.line.replace(/\s+Copyright.*$/i, '') : 'absent';
  const mediaMissing = [...(ffprobe.ok ? [] : [`ffprobe: ${ffprobe.line}`]), ...(ffmpeg.ok ? [] : [`ffmpeg: ${ffmpeg.line}`]), ...shell];
  if (mediaMissing.length) blocked('media', mediaMissing.join('; ')); else ready('media', `${tools.ffprobe}, ${tools.ffmpeg} and ${named('chromium-headless-shell')}`);
  // flash capture: frames by screenshot in the headless shell.
  if (shell.length) blocked('flash-capture', shell.join('; ')); else ready('flash-capture', `frames by screenshot in ${named('chromium-headless-shell')}; no validated analyser runs on macOS`);
  // pdf: veraPDF needs Java; both must answer their version flags.
  // macOS's stub at /usr/bin/java only says that no runtime is installed: when that is the java on PATH, a JDK is looked
  // for through java_home first; a java elsewhere on PATH answers for itself.
  const stub = which('java', env) === '/usr/bin/java', jh = stub ? answer('/usr/libexec/java_home', [], env) : { ok: true };
  const java = jh.ok ? answer('java', ['-version'], env) : { ok: false, line: `no JDK registered with java_home (${jh.line})` }, vera = answer('verapdf', ['--version'], env);
  tools.java = java.ok ? java.line : 'absent'; tools.verapdf = vera.ok ? vera.line : 'absent';
  if (!java.ok || !vera.ok) blocked('pdf', [...(java.ok ? [] : [`no Java runtime answered -version (${java.line}), so veraPDF cannot run`]), ...(vera.ok ? [] : [`veraPDF: ${vera.line}`])].join('; ')); else ready('pdf', `${vera.line} on ${java.line}`);
  // ios: full Xcode selected, xcodebuild answering; a simulator for the native journeys.
  const sel = answer('xcode-select', ['-p'], env), xb = sel.ok && /\.app\/Contents\/Developer\/?$/.test(sel.line) ? answer('xcodebuild', ['-version'], env) : { ok: false, line: sel.ok ? `the selected developer directory is ${sel.line}, not an Xcode.app` : sel.line };
  tools.xcode = xb.ok ? xb.line : 'absent';
  let simulators = 0;
  if (xb.ok) { const sim = answer('xcrun', ['simctl', 'list', 'devices', 'available', '-j'], env); try { simulators = Object.values(JSON.parse(sim.stdout).devices).flat().filter((d) => d.isAvailable !== false).length; } catch { simulators = 0; } }
  if (!xb.ok) blocked('ios-audit', `full Xcode is not selected: ${xb.line}`); else if (!simulators) blocked('ios-audit', `${xb.line} is selected, but xcrun simctl lists no available simulator for the audit to run on`); else ready('ios-audit', `${xb.line} selected; ${simulators} simulator(s) available`);
  // android: an SDK root with platform-tools, and a device or an emulator image listed.
  const sdk = env.ANDROID_HOME || env.ANDROID_SDK_ROOT || join(home, 'Library/Android/sdk');
  const adbPath = existsSync(join(sdk, 'platform-tools/adb')) ? join(sdk, 'platform-tools/adb') : which('adb', env);
  const emuPath = existsSync(join(sdk, 'emulator/emulator')) ? join(sdk, 'emulator/emulator') : which('emulator', env);
  let devices = 0, avds = 0;
  // Devices are asked of an adb server already listening on 5037, over its own protocol: `adb devices` would start one.
  const adbServer = adbPath ? adbQuery(env) : { server: false, devices: 0 };
  devices = adbServer.devices;
  let emuOk = false;
  if (emuPath) { const r = spawnSync(emuPath, ['-list-avds'], { encoding: 'utf8', env, timeout: 20_000 }); emuOk = r.status === 0; avds = emuOk ? (r.stdout || '').split('\n').filter((l) => l.trim() && !l.startsWith('INFO')).length : 0; }
  tools['android-sdk'] = adbPath ? sdk : 'absent';
  if (!adbPath) blocked('android-checks', `no Android SDK: neither ${sdk}/platform-tools/adb nor adb on PATH`); else if (!devices && !avds) blocked('android-checks', `the Android SDK at ${sdk} lists no emulator image (${emuPath ? (emuOk ? 'emulator -list-avds' : 'emulator -list-avds failed') : 'no emulator'})${adbServer.server ? ' and its adb server lists no device' : '; no adb server is listening, so devices were not asked for'}`); else ready('android-checks', `Android SDK at ${sdk}; ${devices} device(s)${adbServer.server ? '' : ' (no adb server listening)'}, ${avds} emulator image(s)`);
  // native journeys: either platform with a simulator, emulator or device.
  const ios = xb.ok && simulators > 0, android = methods['android-checks'].state === 'ready';
  if (ios || android) ready('native-journey', [ios ? `iOS: ${simulators} simulator(s)` : '', android ? `Android: ${devices} device(s), ${avds} image(s)` : ''].filter(Boolean).join('; ')); else blocked('native-journey', `no simulator, emulator or device: ${xb.ok ? `${simulators} iOS simulator(s)` : methods['ios-audit'].reason}; ${methods['android-checks'].reason}`);
  // VoiceOver: the AppleScript setting read, Guidepup installed, a headed Chromium and WebKit in the cache, then the canary.
  const setting = answer('defaults', VO_SETTING, env), on = setting.ok && setting.line === '1';
  const gp = pkgInfo(root, '@guidepup/guidepup'); tools.guidepup = gp?.version ?? 'absent';
  const headed = missing(['chromium', 'webkit']);
  const voMissing = [...(on ? [] : [`VoiceOver's AppleScript control is off (defaults ${VO_SETTING.slice(1).join(' ')} reads ${setting.ok ? setting.line : 'unset'}); switch it on in VoiceOver Utility, attended, never from here`]), ...(gp ? [] : ['@guidepup/guidepup is not installed']), ...headed];
  if (voMissing.length) blocked('vo', voMissing.join('; '));
  else if (!tryCanary) blocked('vo', `AppleScript control on, Guidepup ${gp.version}, ${named('chromium')} and ${named('webkit')} present, but the canary was not run (--no-canary): vo stays blocked until a phrase is heard`);
  else { const c = canary(gp, env); if (c.heard) ready('vo', `AppleScript control on, Guidepup ${gp.version}, ${named('chromium')} and ${named('webkit')}; canary heard: "${c.phrase}"`); else blocked('vo', `AppleScript control on and Guidepup ${gp.version} installed, but no spoken canary was heard: ${c.reason}`); }
  // ai-review: a session step over the run's material; it needs an agent session or an agent CLI, never a service (ruling 12).
  const session = Object.keys(env).find((k) => /^(CLAUDECODE|CLAUDE_CODE_|CODEX_)/.test(k)), cli = ['codex', 'claude'].find((c) => which(c, env));
  if (session) ready('ai-review', `an agent session (${session} set) can run the review step over the material in ai-review/`); else if (cli) ready('ai-review', `${cli} is on PATH to run the review step over the material in ai-review/`); else blocked('ai-review', 'no agent session or CLI: the review step runs in an agent session (ruling 12: AI flags in, services out)');
  return result();
}

export function parseArgs(argv) {
  const o = { root: process.cwd(), out: null, date: null, canary: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i], v = argv[i + 1];
    if (a === '--root' && v) { o.root = resolve(v); i++; } else if (a === '--out' && v) { o.out = resolve(v); i++; } else if (a === '--date' && v) { o.date = v; i++; } else if (a === '--no-canary') o.canary = false; else throw new InputError(`unknown or incomplete option ${a}`);
  }
  if (o.date !== null && !(/^\d{4}-\d{2}-\d{2}$/.test(o.date) && new Date(o.date).toISOString().slice(0, 10) === o.date)) throw new InputError(`--date takes a real YYYY-MM-DD date, not ${o.date}`);
  return o;
}

if (process.argv[1] && real(process.argv[1]) === real(fileURLToPath(import.meta.url))) {
  try {
    const o = parseArgs(process.argv.slice(2));
    const d = doctor({ root: o.root, date: o.date || undefined, canary: o.canary });
    for (const [m, r] of Object.entries(d.methods)) console.log(`a11y-doctor: ${m.padEnd(15)} ${r.state.padEnd(8)} ${r.reason}`);
    if (o.out) { mkdirSync(o.out, { recursive: true }); writeFileSync(join(o.out, 'doctor.json'), `${JSON.stringify(d, null, 2)}\n`); console.log(`a11y-doctor: wrote ${join(o.out, 'doctor.json')}`); }
    else console.log(JSON.stringify(d, null, 2));
  } catch (e) { console.error(`a11y-doctor: ${e instanceof InputError ? e.message : `crash: ${e.stack || e.message}`}`); process.exitCode = 2; }
}
