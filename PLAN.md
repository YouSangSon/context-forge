# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — NPM Package Tarball Manifest Hygiene

Status:
- `package.json` now has an explicit `files` allowlist for built runtime output,
  shell/runtime assets, public docs, and Korean mirrors.
- Source-checkout-only Docker/Compose assets and `install.sh` stay out of the
  npm package surface; checkout docs may still reference the installer.
- `npm run build` now cleans `dist/` first, and `prepack` runs the build before
  `npm pack` / publish.
- `tests/scripts/package-manifest.test.ts` guards the package surface without
  invoking `npm pack`.

Loop closeout:
- Focused package manifest tests passed; `npm pack --dry-run --json` confirms
  the runtime tarball remains self-contained, and `git diff --check` passed.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
