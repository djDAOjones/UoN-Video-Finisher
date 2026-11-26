# VNG-1 — The seed: the Finisher's tooling, core and tokens copied at a named commit, a page shell, the gate green in CI

## Intent

Give the project a working, empty app that already looks and behaves
like the Finisher, so later items add the form and the graphics, not
the plumbing. Everything is copied from the UoN Video Finisher at
27f51dd and owned here; nothing is shared or forked.

## Acceptance criteria

- `package.json` (name `video-name-graphics`, version 0.1.0, no runtime dependency), the Finisher's dev dependencies and its `tsconfig.json`, ESLint, Prettier, markdownlint, `.editorconfig` and `check-links.mjs` configs, adjusted only where they name Finisher paths
- `vite.config.ts` with the Finisher's build id, `BASE_PATH`, port and sourcemap handling, without its branding-asset plugins
- .github/workflows/deploy-pages.yml as the Finisher's, SHAs unchanged
- src/core/ logger, redact, egress, version and diagnostics with their tests, each file's header naming Finisher 27f51dd
- src/styles/tokens.carbon.css verbatim; `app.css` cut to the shell's rules (Finisher lines 1–475 and the page title, status, mono and forced-colours rules from 1797 on), no rule a page element here does not use
- brands/neutral/tokens.css: the Finisher's role names, a neutral palette, light, dark and `.on-brand` (renamed from `.on-brand-blue`), and test/contrast.test.ts reading it
- `index.html`: header band, title, lede, an empty main and footer, in en-GB only (VNG-4 adds the languages)
- `npm run check` green locally and in CI; `node tools/check.mjs` clean

## Now

Updated: 2026-11-05

Next step: None.

Open question: None.

## Context and sources

- [The INTAKE and PLAN-1 decisions](../decisions.md)
- [UI-STANDARDS.md](../../UI-STANDARDS.md), Token systems
- [brands/README.md](../../brands/README.md)
- The Finisher at ../2026-08-24 UoN Video Helper, commit 27f51dd: `vite.config.ts`, eslint.config.js, src/core/, src/styles/, test/contrast.test.ts, `index.html`

## Notes

- 2026-11-05 — Found while planning, in the Finisher: `app.css` names `--uon-logo-*` at lines 154–170 (the header logo) and other `--uon-*` tokens at 1400–1436 (closing controls, not needed here); the logo variables become a pack's `--brand-logo-*`. src/ui/brand-assets.ts finds the logo and Lora by `import.meta.glob`, which is the pattern VNG-2's pack assets follow. The Finisher tracks src/assets/uon-logo-white.svg in its public repository; this project keeps it in brands/uon/assets/ (VNG-2), under the same precedent.
- 2026-11-05 — The Finisher's i18n machinery (src/i18n/index.ts, `bind.ts`, `compile.ts`, `intl.ts`, `preference.ts`) and src/ui/language-switcher.ts are VNG-4's, with new, small tables; its `en-GB.ts`, `zh-Hans.ts` and `ms-MY.ts` are the Finisher's words and are not copied.
- 2026-11-05 — Not copied: src/media/, src/audio/, src/workers/, test/ebu3341/, the spikes, `samples/`, `docs/`, `DEV-INFRASTRUCTURE.md`.
- 2026-11-05 — At close: GitHub Pages was not enabled for the repository (the API answered 404), so the deploy job would fail at configure-pages. Asked through the planning session; the owner's words, 2026-11-05, relayed by it: "Yes, turn it on". Pages enabled with GitHub Actions as the source. No other owner instruction for this item is recorded.
- 2026-11-05 — The built-in browser's preview started the Finisher's dev server, not this one, so the shell was checked on the deployed preview instead.
