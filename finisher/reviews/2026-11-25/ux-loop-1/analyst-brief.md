# Shared brief for the overnight UX analysts (2026-11-25)

You are a READ-ONLY analyst. Never edit, create, move or delete any file inside the project folder, never run git commands that change anything, never run `npm run check` or builds (a writer may be running the gate; heavy work beside it breaks its DSP tests). Never read or play the files in `samples/` (real staff recordings). Write only your report file, in the scratchpad path given to you.

## The product

"UoN Video Finisher": a browser-only app (Chrome, WebCodecs) that takes ONE recorded educational video and makes a branded, loudness-levelled MP4 for University of Nottingham staff and students. Novice users. It is "a conveyor with one cut, not an editor": choose a video, say staff video or student submission, trim the ends, add a title card or not, choose closing graphics, choose one of two outputs, Create, Save. Nothing leaves the device.

Project folder: the repository's root (the absolute path the analysts were given is left out of this copy).
Standards (read these first, they are short): `UI-STANDARDS.md`, `project/digests/nielsen.md`, `project/digests/carbon.md`, `project/digests/wcag-2.2-aaa.md`. Product intent: `project/brief.md` (Direction and "What we are building").
UI code: `index.html`, `src/ui/*.ts`, `src/main.ts`, `src/styles/app.css`, tokens in `src/styles/tokens.*.css`; every string: `src/i18n/en-GB.ts` (also `zh-Hans.ts`, `ms-MY.ts`).

## The design rule that limits FIXES (never findings)

- No control for power users; no exposed codec, bitrate or loudness settings; not an editor.
- A fix should use existing components, tokens and words. A NEW word, sentence, element or control is the owner's to approve: still report it, but classify it as such.
- Three languages (en-GB, zh-Hans, ms-MY); Chinese and Malay are machine drafts awaiting native readers, so do not report translation quality itself.
- WCAG 2.2 AAA target: 7:1 text contrast, 44 x 44 px targets, focus ring 2 px / 3:1, no sticky bands, reflow at 320 px.

## Already known — do not re-report

Three full design passes have been run (Oct–Nov 2026) and their fixes shipped. Open known points live in `project/wish-list.md` (read it, it is the list of what is already known and parked) and `project/backlog.md`. Things only a person can do (screen readers, real Windows contrast themes, a real phone) are already listed there. Report only what is NOT already there, or say explicitly "this is wish X, and here is an agent-doable fix for it".

## Driving the app (browser analysts)

The dev server is already running. You should have the built-in browser tools `mcp__Claude_Browser__*` (if they are only listed as deferred, load them with ToolSearch; if you do not have them at all, say so in the first line of your report and do the best code-level analysis you can instead). Other analysts share the browser pane: ALWAYS create your own tab with `tabs_create`, navigate it to the URL you were given, and pass your `tabId` on every call. Never touch another tab. Never stop the dev server.

A file is loaded into the page without the native file dialog like this (run with javascript_tool in your tab, after each page load):

```js
window.__loadFixture = async (name) => { const r = await fetch('http://127.0.0.1:5199/' + name); const b = await r.blob(); const type = name.endsWith('.webm') ? 'video/webm' : name.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'; const f = new File([b], name, { type }); const dt = new DataTransfer(); dt.items.add(f); const input = document.querySelector('#file-input'); input.files = dt.files; input.dispatchEvent(new Event('change', { bubbles: true })); return f.size }; await window.__loadFixture('talk-30s.mp4')
```

Synthetic fixtures available (test patterns, no people): `talk-30s.mp4` (720p, 30 s, quiet speech-like audio), `silent-10s.mp4` (no audio track), `dynamic-40s.mp4` (1080p, 20 s very quiet then 20 s loud), `portrait-10s.mp4` (720x1280), `clip-8s.webm` (VP9/Opus), `prores-6s.mov` (ProRes, should be refused), `notvideo.mp4` (a text file, should be unreadable). A job on these takes roughly 10–40 seconds after "Create the video". The Save button opens the browser's native save dialog, which you cannot operate: do not click Save (note it as not exercised). The three dev-only buttons under step 1 ("Copy diagnostics", "Trigger test error…") are not in the release build: ignore them as findings, though "Trigger test error" is a legitimate way to see the error state.

Prefer `get_page_text` / `read_page` / `javascript_tool` (getBoundingClientRect, getComputedStyle, document.activeElement) over screenshots for facts; take screenshots (scale 0.4–0.6) only where the look matters. `resize_window` sets width/height and `colorScheme` for your tab only — reset to preset "desktop" when you finish.

## Your report

Write the full report as Markdown to the file path given in your task. For each finding: an ID (your prefix + number), a one-line statement, the evidence (state, viewport, language, selector, measured numbers or the exact words on screen), the heuristic or success criterion it breaks, severity 1 (blocks or misleads a novice) / 2 (friction or a standards miss) / 3 (polish), and a proposed fix classified as exactly one of: `FIX-NOW` (CSS or behaviour only, existing tokens/components/words, low risk), `WORDS` (needs new or changed words: give your proposed English), `ELEMENT` (needs a new element or control), `PERSON` (needs a human check). Name the file and line the fix would touch when you can. Also list what you checked and found fine, briefly, and what you could not check. Be concrete and sceptical: a finding you could not reproduce twice is marked "seen once".

Your final message back (not the file) must be SHORT, at most 300 words: the report path, the count of findings by severity and class, and your top five findings in one line each.
