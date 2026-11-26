# shared/

Code two tools need, imported by path, never copied. Owned by the
parent's ledger (`../project/`, IDs `UVT-n`).

- A file moves here when a second tool needs it, in three green steps: a
  parent commit adds it in the bytes of the tool that had it; a commit in
  that tool switches its imports and deletes its copy; a commit in the
  other tool takes it up.
- `shared/` imports from no tool; no tool imports from another. The ESLint
  rule `uvt/boundaries` (`../eslint.boundaries.js`) fails a crossing.
- A change here is a parent item, and it closes only with every tool's
  gate green. Each tool's gate runs the shared tests it depends on; the
  root gate runs them all, with `vitest.config.ts`, `tsconfig.json` and
  `env.d.ts` here.

| Path | From | Used by |
| --- | --- | --- |
| `core/diagnostics.ts`, `egress.ts`, `logger.ts`, `redact.ts`, each with its test, and `version.ts` | the Finisher's `src/core/`, at `349b3ae4` (UVT-2) | the Finisher (`9ad7635d`), Name Graphics (`730e4b44`) |
| `styles/tokens.carbon.css` | the Finisher's `src/styles/`, at `349b3ae4` (UVT-2) | the Finisher (`9ad7635d`), Name Graphics (`730e4b44`) |
