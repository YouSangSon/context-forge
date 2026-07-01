# PLAN

This file is the durable continuation plan for ongoing Akasha improvement work.
Keep it short; detailed evidence belongs in `WORKLOG.md` and one-off rationale in
`DECISIONS.md`.

## Current Loop — NPM Package Metadata and Tarball Hygiene

Status:
- `package.json` now has an explicit `files` allowlist for built runtime output,
  shell/runtime assets, public docs, and Korean mirrors.
- Source-checkout-only Docker/Compose assets and `install.sh` stay out of the
  npm package surface; checkout docs may still reference the installer.
- `npm run build` now cleans `dist/` first, and `prepack` runs the build before
  `npm pack` / publish.
- `tests/scripts/package-manifest.test.ts` guards the package surface without
  invoking `npm pack`.
- The missing Unreleased English/Korean changelog notes now document the
  package tarball surface, and public docs drift coverage checks those notes.
- `package.json#description` now matches the documented vector-backend model:
  Postgres-backed storage with Qdrant or pgvector search.

Loop closeout:
- Focused package manifest tests passed; `npm pack --dry-run --json` confirms
  the runtime tarball remains self-contained, and `git diff --check` passed.
- Focused public docs drift coverage now passes for the Unreleased changelog
  package tarball notes, and `git diff --check` passed after this update.
- Focused package manifest coverage now guards the npm metadata description.
- Full typecheck, build, audit, and test gates passed for this metadata update.
- Local commit is expected/done by the controller; do not push or merge from
  this loop.

## Next Loop Candidates

- Pick one clear target from `BACKLOG.md`, preferring stability,
  tests, scalability, developer experience, documentation, then new features.
