# WORKLOG

## 2026-07-02

- Guarded lockfile root platform metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that the package-lock
    root descriptor does not declare `os`, `cpu`, or `libc` platform
    restriction metadata.
  - This keeps the self-hosted npm install surface platform-neutral unless a
    future packaging decision intentionally narrows supported install targets.
  - Sources checked: npm documents package-lock package descriptors as carrying
    package metadata including `os` and `cpu` restrictions, and documents
    package `os`, `cpu`, and `libc` as install/build platform restriction
    fields:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`39` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1883` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded development dependency lockfile flags:
  - `tests/scripts/package-manifest.test.ts` now checks that direct development
    dependencies exist in package-lock package descriptors without `optional`
    or `devOptional` flags.
  - The current direct dev-only lockfile package set remains explicit, while
    shared dev dependencies may stay non-dev-only when npm's dependency tree
    classification requires it.
  - Source checked: npm documents package-lock package descriptor `dev`,
    `optional`, and `devOptional` flags as dependency-tree classification
    markers for dev-only, optional-only, or combined dev/optional paths:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`39` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1883` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded runtime dependency lockfile flags:
  - `tests/scripts/package-manifest.test.ts` now checks that direct runtime
    dependencies exist in package-lock package descriptors without `dev`,
    `optional`, or `devOptional` flags.
  - This catches dependency tree drift that would move a runtime dependency
    into a dev-only or optional install path without an explicit dependency
    review.
  - Source checked: npm documents package-lock package descriptor `dev`,
    `optional`, and `devOptional` flags as dependency-tree classification
    markers for dev-only, optional-only, or combined dev/optional paths:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`38` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1882` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded lockfile package source resolution:
  - `tests/scripts/package-manifest.test.ts` now checks that every non-root
    package-lock package descriptor resolves from `https://registry.npmjs.org/`
    and carries `sha512-` integrity metadata.
  - This catches dependency tree drift that would introduce git, file, link,
    local tarball, or non-registry HTTP package sources without an explicit
    dependency review.
  - Source checked: npm documents `resolved` as the actual package source,
    with registry, git, and link cases, and `integrity` as the artifact
    integrity string for the unpacked package:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`37` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1881` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded nested shrinkwrap lockfile descriptors:
  - `tests/scripts/package-manifest.test.ts` now checks that package-lock
    package descriptors do not declare `hasShrinkwrap` metadata.
  - This catches dependency tree drift that would introduce package-scoped
    shrinkwrap lockfiles without an explicit dependency review.
  - Source checked: npm documents `hasShrinkwrap` as a package-lock package
    descriptor flag for packages that have an `npm-shrinkwrap.json` file:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`36` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1880` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded lockfile bundled/linked package descriptors:
  - `tests/scripts/package-manifest.test.ts` now checks that package-lock
    package descriptors do not declare `inBundle` or `link` metadata.
  - This catches dependency tree drift that would introduce bundled dependency
    extraction or local/symlink package resolution without an explicit
    dependency review.
  - Source checked: npm documents `inBundle` as a package-lock package
    descriptor flag for bundled dependencies and `link` as a flag for symbolic
    links where the link target is included in the lockfile:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`35` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1879` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded lockfile install-script packages:
  - `tests/scripts/package-manifest.test.ts` now checks the exact package-lock
    package paths that declare `hasInstallScript: true`.
  - This catches dependency tree drift that would introduce a new
    preinstall/install/postinstall package script without an explicit
    dependency review.
  - Source checked: npm documents `hasInstallScript` as a package-lock package
    descriptor flag for packages that have `preinstall`, `install`, or
    `postinstall` scripts:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`34` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1878` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package types metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package `types`
    and `typings` metadata stay absent.
  - This catches metadata drift that would add a TypeScript declaration
    entrypoint without an explicit public API packaging decision.
  - Source checked: TypeScript's publishing guide documents package
    `types` as the pointer to a bundled declaration file and notes `typings`
    is synonymous with `types`:
    https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`33` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1877` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package manual metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package `man` and
    `directories` metadata stay absent.
  - This catches metadata drift that would add npm-installed manual page or
    directory-derived bin/man surfaces without an explicit packaging decision.
  - Source checked: npm documents `man` as installed manual page metadata and
    `directories.bin`/`directories.man` as directory-derived executable/manual
    page metadata:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`32` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1876` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded native addon build metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package `gypfile`
    metadata and tracked root `binding.gyp` stay absent.
  - This catches metadata drift that would introduce npm's native addon
    node-gyp build path without an explicit packaging decision.
  - Source checked: npm documents `gypfile` in the context of root
    `binding.gyp`; without explicit install/preinstall scripts, npm defaults to
    building with `node-gyp` when that file exists:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`31` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1875` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded browser package metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package `browser`
    stays absent in `package.json`.
  - This catches metadata drift that would add client-side entrypoint
    hints/replacements to this Node-oriented MCP server package without an
    explicit packaging decision.
  - Source checked: npm documents `browser` as the client-side alternative to
    `main`, used to hint that a module may rely on primitives unavailable in
    Node.js modules:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`30` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1874` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package script config metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package `config`
    stays absent in both `package.json` and the lockfile root metadata.
  - This catches metadata drift that would add npm-managed package script
    configuration/env behavior without an explicit tooling policy decision.
  - Source checked: npm documents `config` as package script configuration
    parameters that persist across upgrades and can be referenced from scripts
    through `npm_package_config_*` environment variables:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`29` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1873` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package devEngines metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package
    `devEngines` stays absent in both `package.json` and the lockfile root
    metadata.
  - This catches metadata drift that would add npm-managed dev-time gates
    before install, ci, or run commands without an explicit tooling policy
    decision.
  - Source checked: npm documents `devEngines` as a field that runs before
    `install`, `ci`, and `run` commands, with runtime/package manager gate
    support separate from package `engines`:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`28` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1872` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package peer dependency metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package
    `peerDependencies` and `peerDependenciesMeta` stay absent in both
    `package.json` and the lockfile root metadata.
  - This catches dependency metadata drift that would turn Akasha's runtime
    dependencies into host/plugin compatibility contracts without an explicit
    dependency policy decision.
  - Source checked: npm documents `peerDependencies` as compatibility with a
    host tool or library for plugin-style packages, and `peerDependenciesMeta`
    as metadata that can mark peer dependencies optional:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`27` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1871` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package optional dependency metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package
    `optionalDependencies` stays absent in both `package.json` and the
    lockfile root metadata.
  - This catches dependency metadata drift that would make runtime dependency
    install failures non-fatal or override normal dependency entries without an
    explicit dependency policy decision.
  - Source checked: npm documents `optionalDependencies` as dependencies whose
    build failures do not fail installation, and notes entries there override
    same-name entries in `dependencies`:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`26` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1870` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package workspace metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package
    `workspaces` stays absent.
  - This catches package metadata drift that would move Akasha from a single
    npm package into workspace install/symlink behavior without an explicit
    repo architecture decision.
  - Source checked: npm documents `workspaces` as local file-system patterns
    the install client uses to find packages that need symlinking into the
    top-level `node_modules` folder:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`25` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1869` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package bundled dependency metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package
    `bundleDependencies` and `bundledDependencies` stay absent.
  - This catches package metadata drift that would bundle dependency contents
    into npm pack/publish tarballs without an explicit packaging decision.
  - Source checked: npm documents `bundleDependencies` as package names bundled
    when publishing, and notes the `bundledDependencies` spelling is also
    honored:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`24` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1868` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package publish configuration:
  - `tests/scripts/package-manifest.test.ts` now checks that package
    `publishConfig` stays absent.
  - This catches package metadata drift that would change npm publish-time
    registry, tag, or access behavior without an explicit release decision.
  - Source checked: npm documents `publishConfig` as publish-time config values
    for settings such as tag, registry, and access:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`23` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1867` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package platform restrictions:
  - `tests/scripts/package-manifest.test.ts` now checks that package `os`,
    `cpu`, and `libc` restrictions stay absent.
  - This catches package metadata drift that would narrow Akasha's self-hosted
    npm install surface without an explicit portability decision.
  - Source checked: npm documents `os`, `cpu`, and `libc` fields as package
    metadata that restrict supported operating systems, CPU architectures, and
    Linux libc variants:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`22` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1866` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package lifecycle scripts:
  - `tests/scripts/package-manifest.test.ts` now checks that npm
    install/publish lifecycle scripts stay absent except for the existing
    `prepack` build hook.
  - This catches package metadata drift that would add hidden install or
    publish-time side effects beyond the documented clean build before pack.
  - Source checked: npm documents install, pack, and publish lifecycle script
    order, including `preinstall`, `install`, `postinstall`, `prepare`,
    `prepack`, `postpack`, `prepublishOnly`, `publish`, and `postpublish`:
    https://docs.npmjs.com/cli/v11/using-npm/scripts/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`21` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1865` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package lockfile precedence:
  - `tests/scripts/package-manifest.test.ts` now checks that tracked
    `npm-shrinkwrap.json` stays absent.
  - This catches lockfile precedence drift where npm would ignore the
    repository's `package-lock.json` contract in favor of shrinkwrap metadata.
  - Source checked: npm documents that root `npm-shrinkwrap.json` takes
    precedence over `package-lock.json` when both are present:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`20` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1864` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded npm private publish metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package `private`
    is not `true`.
  - This catches package metadata drift that would make npm refuse publication
    while avoiding extra constraints on normal release fields.
  - Source checked: npm documents `"private": true` as a package metadata flag
    that causes npm to refuse publication:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`19` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1863` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded npm package identity metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package `name`
    remains `akasha-mcp` and package `license` remains `MIT`.
  - This catches package identity or license drift while intentionally avoiding
    a fixed `version` assertion, because release versions should change during
    normal publishing.
  - Source checked: npm documents `name` as the package's identifier and
    recommends SPDX identifiers such as `MIT` in the `license` field:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`18` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1862` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package entrypoint surface:
  - `tests/scripts/package-manifest.test.ts` now checks that package `main`
    remains absent alongside the existing `bin` and `exports` absence checks.
  - This catches package metadata drift where npm consumers could get an
    unintended module entrypoint instead of using the documented package
    scripts.
  - Source checked: npm documents `main` as the primary module entrypoint,
    `exports` as a package entrypoint definition surface, and `bin` as
    executable command surface:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`17` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1861` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded npm package support metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that package
    `homepage`, `repository`, `bugs`, and `author` stay pointed at the Akasha
    GitHub project surfaces.
  - This catches package metadata drift where published npm metadata stops
    routing users and contributors to the canonical README, source, or issue
    tracker.
  - Source checked: npm documents `homepage`, `bugs`, and `repository` as
    package metadata used for the project homepage, issue reporting, and source
    location:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`17` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1861` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded `esbuild` override lockfile resolution:
  - `tests/scripts/package-manifest.test.ts` now checks that
    `node_modules/esbuild` and its optional `@esbuild/*` platform packages stay
    resolved to `0.28.1` in `package-lock.json`.
  - This catches lockfile drift when the package override remains present but
    the resolved build tooling package tree moves to another version.
  - Source checked: npm documents `overrides` as a root `package.json` field
    that changes dependency tree resolution, and `package-lock.json` as the
    committed dependency tree representation:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#overrides
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`16` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1860` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package module type metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that top-level
    `type` stays `module` for generated `.js` files.
  - This catches package metadata drift where NodeNext build output could be
    interpreted with the wrong module system.
  - Source checked: Node.js documents `.js` files as ES modules when the
    nearest parent `package.json` has top-level `"type": "module"`:
    https://nodejs.org/api/packages.html#determining-module-system

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`15` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1859` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package override metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that
    `overrides.esbuild` stays on the current `^0.28.1` build tooling override.
  - This catches package metadata drift when the npm override that shapes
    transitive build tooling resolution is removed or changed without review.
  - Source checked: npm documents `overrides` as a root `package.json` field
    for replacing packages in the dependency tree:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#overrides

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`14` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1858` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package dependency scope:
  - `tests/scripts/package-manifest.test.ts` now checks the exact runtime
    dependency names separately from development-only tooling names.
  - This catches package metadata drift when runtime libraries and local
    build/test tools move across the `dependencies` / `devDependencies`
    boundary while the lockfile remains aligned.
  - Source checked: `package.json`, package-lock root metadata, README,
    configuration, architecture, and public-doc drift coverage describe
    runtime dependencies such as `@huggingface/transformers` separately from
    local TypeScript/Vitest tooling.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`13` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1857` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded documented backup creation scripts:
  - `tests/scripts/package-manifest.test.ts` now checks that `backup:create`,
    `backup:create:qdrant`, and `backup:create:pgvector` still route through
    `scripts/create-backup.sh` with the documented backend override behavior.
  - This catches package script drift before README, operations, deployment,
    or self-hosted backup docs can keep pointing operators at stale commands.
  - Source checked: README, operations, deployment, self-hosted operations, and
    public-doc drift coverage all document the backend-aware backup creation
    scripts.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`12` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1856` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded documented development watch scripts:
  - `tests/scripts/package-manifest.test.ts` now checks that `dev:server`,
    `dev:worker`, `dev:mcp`, `dev:cli`, and `test:watch` still point at the
    expected source entrypoints and Vitest watch command.
  - This catches package script drift before README and CONTRIBUTING can keep
    pointing contributors at commands with changed local-development behavior.
  - Source checked: README and CONTRIBUTING list these npm scripts in their
    common or daily command tables.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`11` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1855` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded documented operator package scripts:
  - `tests/scripts/package-manifest.test.ts` now checks that `start:server`,
    `start:worker`, `db:migrate`, `lifecycle:init`, `backup:decrypt`,
    `backup:verify`, and `restore:smoke` still point at built `dist/`
    artifacts.
  - This catches package script drift before operator docs can keep referring
    to commands whose runtime entrypoints changed.
  - Source checked: README, deployment, operations, self-hosted operations,
    and configuration docs reference these npm scripts as operator commands.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`10` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1854` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded contributor verification scripts:
  - `tests/scripts/package-manifest.test.ts` now checks that package scripts
    keep `typecheck` on `tsc --noEmit` and `test` on `vitest run`.
  - This catches package script drift before README, CONTRIBUTING, PR template,
    and CI guidance can point contributors at commands with changed behavior.
  - Source checked: README and CONTRIBUTING list `npm run typecheck`,
    `npm run build`, `npm audit --audit-level=moderate`, and `npm test` as the
    local verification sequence, while CI runs the same typecheck/build/audit
    and test gates.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`9` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1853` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package lockfile top-level format:
  - `tests/scripts/package-manifest.test.ts` now checks that
    `package-lock.json` top-level `name` and `version` match `package.json`.
  - The same guard keeps the committed lockfile on `lockfileVersion: 3` and
    requires an explicit root package entry in `packages[""]`.
  - Source checked: npm documents top-level lockfile `name` and `version` as
    matching `package.json`, `lockfileVersion: 3` as the npm v9+ format, and
    `packages[""]` as the typical root project entry:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`8` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1852` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package lockfile root package metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that
    `package-lock.json` root metadata matches `package.json` for package
    identity, license, dependencies, and dev dependencies.
  - This catches manual lockfile drift when package identity or dependency
    surface changes.
  - Source checked: npm documents `package-lock.json` as a committed
    dependency-tree representation and `packages[""]` as the root project
    entry whose package descriptor can include package metadata:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`7` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1851` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package lockfile runtime metadata:
  - `tests/scripts/package-manifest.test.ts` now checks that
    `package-lock.json` root metadata matches `package.json` for `engines.node`
    and root `@types/node`.
  - This catches lockfile drift when the package's supported Node runtime or
    ambient Node type line changes.
  - Source checked: npm documents `package-lock.json` as a committed
    dependency-tree representation and `packages[""]` as the root project
    entry whose package descriptor can include `engines`:
    https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`6` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1850` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded package Node runtime metadata:
  - `tests/scripts/package-manifest.test.ts` now checks `engines.node: >=22`
    and a root `@types/node` version on the Node 22 line.
  - This keeps package metadata aligned with Akasha's minimum supported Node
    runtime and its oldest supported TypeScript ambient types.
  - Source checked: Node.js Release Working Group schedule marks Node 22 as a
    supported maintenance LTS line through 2027-04-30 and Node 20 as
    end-of-life on 2026-04-30:
    https://github.com/nodejs/release#release-schedule

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`6` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1850` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded CI install ordering:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that every CI job
    runs the CPU-only `Install` step immediately after `actions/setup-node`.
  - This keeps `npm ci` on a runner where Akasha's configured Node version and
    npm cache settings are already active.
  - Source checked: `actions/setup-node` examples run checkout, setup-node,
    `npm ci`, then tests, including the npm caching example:
    https://github.com/actions/setup-node

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`20` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1849` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded CI checkout ordering:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that every CI job
    uses `actions/checkout@v4` immediately before `actions/setup-node`.
  - This keeps repository files present before dependency installation,
    typecheck, build, and test commands run.
  - Source checked: `actions/checkout` documents that the action checks out the
    repository under `$GITHUB_WORKSPACE` so workflows can access it:
    https://github.com/actions/checkout

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`19` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1848` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded backend integration CI runtime:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that the Postgres
    and pgvector integration jobs use `node-version: "22"`.
  - This keeps backend integration coverage on Akasha's minimum supported
    runtime while the main matrix still covers Node 22 and Node 24.
  - Source checked: GitHub Actions' Node.js guide documents that `setup-node`
    takes a Node version input and configures that version on the runner:
    https://docs.github.com/actions/guides/building-and-testing-nodejs

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`18` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1847` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded CI Node matrix fail-fast behavior:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that the Node
    matrix keeps `fail-fast: false` next to the supported Node 22/24 matrix.
  - This keeps a failure on one runtime from canceling the sibling runtime job
    before it reports, preserving full runtime-support signal in CI.
  - Source checked: GitHub Actions workflow syntax documents that
    `strategy.fail-fast` defaults to true and cancels in-progress or queued
    matrix jobs after a matrix job failure:
    https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`17` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1846` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded database service health checks in CI:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that the Postgres
    and pgvector integration jobs keep `pg_isready` service health checks.
  - The guard covers the health command, interval, timeout, and retry settings
    so CI waits for database containers before integration tests connect.
  - Source checked: GitHub Actions' PostgreSQL service container guide uses
    health check options to make sure the service is running:
    https://docs.github.com/actions/using-containerized-services/creating-postgresql-service-containers

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`16` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1845` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded CI stale-run cancellation:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that CI keeps the
    workflow-level concurrency group based on workflow name and branch/PR ref.
  - The same guard requires `cancel-in-progress: true` so newer commits cancel
    stale runs for the same branch or pull request.
  - Source checked: GitHub Actions workflow syntax documents
    `cancel-in-progress: true` for canceling running jobs or workflows in the
    same concurrency group:
    https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`15` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1844` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded setup-node dependency caching:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that all three
    `actions/setup-node` steps keep `cache: npm`.
  - Source checked: `actions/setup-node` documents the `cache` input for npm
    dependency caching:
    https://github.com/actions/setup-node

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`14` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1843` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded CI workflow triggers:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that
    `.github/workflows/ci.yml` runs on pushes to `main` and pull requests
    targeting `main`.
  - Source checked: GitHub Actions workflow trigger guidance documents branch
    filters for `push` and `pull_request` events:
    https://docs.github.com/actions/using-workflows/triggering-a-workflow

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`13` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1842` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded the CI Node matrix:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks that the main CI
    matrix keeps Node 22 and Node 24.
  - The same guard confirms `actions/setup-node` receives `${{ matrix.node }}`
    as its `node-version` input.
  - Source checked: GitHub Actions Node.js guidance describes `setup-node` as
    the recommended way to configure Node.js versions consistently across
    runners:
    https://docs.github.com/actions/guides/building-and-testing-nodejs

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`12` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1841` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded CI install commands:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now rejects raw `npm ci`,
    `npm install`, and `npm i` workflow commands.
  - This keeps future CI install steps on the documented CPU-only
    `ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm ci` path.

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`11` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1840` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded the TypeScript project include set:
  - `tests/scripts/source-conventions.test.ts` now checks that `tsconfig.json`
    continues to include `src/**/*.ts`, `scripts/**/*.ts`, `tests/**/*.ts`, and
    `vitest.config.ts`.
  - This keeps the tsconfig-driven source convention scanner from silently
    dropping source, script, test, or root Vitest config files.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`5` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1839` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Derived TypeScript convention coverage from `tsconfig.json`:
  - `tests/scripts/source-conventions.test.ts` now parses `tsconfig.json` with
    the TypeScript compiler API before applying catch binding, explicit `any`,
    and suppression guards.
  - The guard filters that project file set through `git ls-files` so generated
    or untracked local files do not affect source convention checks.
  - Source checked: TypeScript's TSConfig documentation describes
    `tsconfig.json` as the place that specifies project root files and compiler
    options.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`4` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1838` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Covered root TypeScript config files:
  - `tests/scripts/source-conventions.test.ts` now includes `vitest.config.ts`
    when scanning tracked TypeScript files.
  - This matches the `tsconfig.json` include set so the root Vitest config also
    stays covered by catch binding, explicit `any`, and suppression guards.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`4` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1838` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded strict TypeScript config:
  - `tests/scripts/source-conventions.test.ts` now checks that `tsconfig.json`
    keeps `strict: true`.
  - The same guard rejects explicit `noImplicitAny: false` and
    `useUnknownInCatchVariables: false` overrides.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`4` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1838` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded file-wide TypeScript suppression comments:
  - `tests/scripts/source-conventions.test.ts` now includes `@ts-nocheck` in
    the tracked TypeScript suppression comment guard.
  - This prevents a whole file from opting out of strict TypeScript checks while
    keeping the scanner's self-match avoidance pattern.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`3` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1837` tests passed, `34`
  skipped)
- `git diff --check` (passed)

- Guarded TypeScript suppression comments:
  - `tests/scripts/source-conventions.test.ts` now scans tracked TypeScript
    files for `@ts-ignore` and `@ts-expect-error` comments.
  - The guard reports file and line details without embedding the forbidden
    strings directly in the scanner source.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`3` tests passed)
- `npm run typecheck` (passed)
- `npm run build` (passed)
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1837` tests passed, `34`
  skipped)
- `git diff --check` (passed)

## 2026-07-01

- Recorded admin shell reliability fixes in changelogs:
  - `CHANGELOG.md` and `CHANGELOG.ko.md` now note safer `/admin/memory`
    load/save/tag/archive error reporting, API error preservation, non-JSON
    HTTP status fallback text, and finite numeric payload handling.
  - `tests/scripts/public-docs-drift.test.ts` guards the Unreleased changelog
    entries.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`43` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1836` tests passed, `34` skipped)
- `git diff --check` (passed)

- Improved admin shell HTTP error fallback text:
  - `src/app/admin-memory-page.ts` now includes response status and status text
    when a failed request does not return a JSON API error message.
  - `tests/app/server.test.ts` guards the rendered `/admin/memory` shell for
    the status-bearing fallback string.

Verification plan:
- `npx vitest run tests/app/server.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/app/server.test.ts` (`67` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1835` tests passed, `34` skipped)
- `git diff --check` (passed)

- Guarded admin shell numeric payloads:
  - `src/app/admin-memory-page.ts` now reads `limit` and `importance` through a
    finite-number helper so `NaN`/`Infinity` do not serialize as JSON `null`.
  - `tests/app/server.test.ts` guards the rendered `/admin/memory` shell for
    the helper and the updated numeric payload construction.

Verification plan:
- `npx vitest run tests/app/server.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/app/server.test.ts` (`67` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1835` tests passed, `34` skipped)
- `git diff --check` (passed)

- Covered admin shell action failures:
  - `src/app/admin-memory-page.ts` now catches save, tag, and archive action
    handler failures and reports them through `errorMessage`.
  - `tests/app/server.test.ts` guards the rendered `/admin/memory` shell so
    those handlers keep the status fallback.

Verification plan:
- `npx vitest run tests/app/server.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/app/server.test.ts` (`67` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1835` tests passed, `34` skipped)
- `git diff --check` (passed)

- Hardened admin shell error status rendering:
  - `src/app/admin-memory-page.ts` now maps caught values through a small
    `errorMessage` helper before writing status text.
  - `tests/app/server.test.ts` guards the rendered `/admin/memory` shell against
    direct `error.message` status writes.

Verification plan:
- `npx vitest run tests/app/server.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/app/server.test.ts` (`67` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1835` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed migration SQL comments:
  - `src/db/migrations/004_add_cascade_indexes.sql`,
    `005_add_compaction_archive.sql`, and
    `006_add_archive_unarchive.sql` now describe current compaction and
    unarchive behavior without internal `P17` or `P19.1` phase labels.
  - `tests/scripts/public-docs-drift.test.ts` now guards those migration
    comments against phase-label drift.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`42` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1835` tests passed, `34` skipped)
- `git diff --check` (passed)

- Tightened bare catch binding coverage:
  - Remaining bare `catch {}` clauses under `src/`, `tests/`, and `scripts/`
    now use explicit `_err: unknown` bindings.
  - `tests/scripts/source-conventions.test.ts` now fails catch clauses with no
    binding, preserving the contributor convention through AST coverage.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`2` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1834` tests passed, `34` skipped)
- `git diff --check` (passed)

- Added an explicit `any` type convention guard:
  - `tests/scripts/source-conventions.test.ts` now scans tracked TypeScript ASTs
    for `AnyKeyword` nodes.
  - This guards the contributor rule that untrusted input should use `unknown`,
    not `any`, without flagging ordinary identifiers like `expect.any(...)`.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`2` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1834` tests passed, `34` skipped)
- `git diff --check` (passed)

- Replaced the catch binding convention regex with AST traversal:
  - `tests/scripts/source-conventions.test.ts` now parses tracked TypeScript
    files with the TypeScript compiler API and inspects real `CatchClause`
    nodes.
  - This keeps the catch binding convention guard from flagging strings,
    comments, or diagnostic messages that only contain `catch (...)` text.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`1` test passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1833` tests passed, `34` skipped)
- `git diff --check` (passed)

- Extended catch binding convention coverage to tests and scripts:
  - `tests/scripts/source-conventions.test.ts` now scans tracked TypeScript
    under `src/`, `tests/`, and `scripts/`.
  - Remaining test catch bindings in secret-scrub, canonical-indexing,
    retrieve-memory, and pgvector integration tests now use `unknown`.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`1` test passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1833` tests passed, `34` skipped)
- `git diff --check` (passed)

- Guarded the eval harness package-exclusion invariant:
  - `tests/scripts/package-manifest.test.ts` now scans tracked runtime source
    files and fails if they import `src/eval/*`.
  - This keeps the `!dist/src/eval/` package allowlist exclusion safe if future
    runtime code starts depending on eval utilities.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`5` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1833` tests passed, `34` skipped)
- `git diff --check` (passed)

- Excluded the compiled eval harness from npm tarballs:
  - `npm pack --dry-run --json` showed `dist/src/eval/*` in the package even
    though `src/eval/*` is imported only by tests.
  - `package.json` now excludes `!dist/src/eval/`, and
    `tests/scripts/package-manifest.test.ts` guards the allowlist.
  - English/Korean Unreleased changelog tarball-surface notes and
    `tests/scripts/public-docs-drift.test.ts` now mention the compiled eval
    harness exclusion.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts tests/scripts/public-docs-drift.test.ts`
- `npm pack --dry-run --json` parsed for `dist/src/eval/`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts tests/scripts/public-docs-drift.test.ts`
  (`45` tests passed)
- `npm pack --dry-run --json` (`entryCount: 113`, no `dist/src/eval/` paths)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1832` tests passed, `34` skipped)
- `git diff --check` (passed)

- Guarded source catch binding conventions:
  - `src/mcp/canonical-services.ts`, `src/vector/pgvector-index.ts`,
    `src/embedding/transformers-embedding.ts`, and
    `src/store/memory-repository.ts` now type catch bindings as `unknown`.
  - `tests/scripts/source-conventions.test.ts` scans tracked source files so
    future `catch (err)` drift fails in the script test suite.

Verification plan:
- `npx vitest run tests/scripts/source-conventions.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/source-conventions.test.ts` (`1` test passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`80` files passed, `2` skipped; `1832` tests passed, `34` skipped)
- `git diff --check` (passed)

- Tightened Docker build context hygiene:
  - `.dockerignore` now excludes local agent/workflow artifacts, internal docs,
    and common desktop/editor metadata from Docker build contexts.
  - `tests/scripts/dockerfile-hardening.test.ts` now guards the internal
    artifact exclusions so the builder-stage `COPY . .` path does not
    accidentally absorb them later.

Verification plan:
- `npx vitest run tests/scripts/dockerfile-hardening.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/dockerfile-hardening.test.ts` (`6` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1831` tests passed, `34` skipped)
- `git diff --check` (passed)

- Guarded CPU-only CI install steps:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now asserts all three CI
    `Install` steps keep using `ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm ci`.
  - This preserves the existing runner-stability workaround that avoids flaky
    GPU binary downloads on CPU-only GitHub Actions runners.

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`10` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1830` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned Postgres-backed test wording:
  - `.github/workflows/ci.yml` now names the backend-gated step
    `Run Postgres-backed suites`.
  - `tests/store/memory-repository.test.ts`,
    `tests/jobs/ingest-job-repository.test.ts`, and
    `tests/db/migrate.test.ts` use the same Postgres-backed wording in their
    skip comments.
  - `tests/scripts/ci-workflow-hygiene.test.ts` guards the updated step name.

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`9` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1829` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed semantic dedup MCP test naming:
  - `tests/mcp/server.test.ts` now names the `semanticDedupThreshold` behavior
    without the planning-era `(P18)` label.
  - `tests/scripts/public-docs-drift.test.ts` now guards that stale phrase
    alongside the existing compaction drift checks.

Verification plan:
- `npx vitest run tests/mcp/server.test.ts tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/mcp/server.test.ts tests/scripts/public-docs-drift.test.ts`
  (`172` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1829` tests passed, `34` skipped)
- `git diff --check` (passed)

- Hardened CI workflow job-section tests:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now asserts the
    `pg-integration` and `pgvector-integration` job headings exist, and that
    pgvector follows Postgres, before slicing backend job sections.
  - This makes backend job command guards fail clearly if the workflow layout
    changes.

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`9` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1829` tests passed, `34` skipped)
- `git diff --check` (passed)

- Guarded the focused pgvector CI job:
  - `tests/scripts/ci-workflow-hygiene.test.ts` now checks the
    `pgvector-integration` job sets `PGVECTOR_TEST_URL` and runs only
    `tests/vector/pgvector-index.integration.test.ts`.
  - This complements the Postgres integration job guard and keeps both
    backend-gated CI jobs focused.

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`9` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1829` tests passed, `34` skipped)
- `git diff --check` (passed)

- Focused the Postgres integration CI job:
  - `.github/workflows/ci.yml` now runs only
    `tests/store/memory-repository.test.ts`,
    `tests/jobs/ingest-job-repository.test.ts`, and
    `tests/db/migrate.test.ts` in the `pg-integration` job.
  - The main Node matrix still runs `npm test`; narrowing the Postgres job
    avoids duplicating the full suite while keeping the backend-gated coverage.
  - `tests/scripts/ci-workflow-hygiene.test.ts` now guards the focused command.

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`8` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1828` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned integration skip guidance:
  - `CONTRIBUTING.md`, `CONTRIBUTING.ko.md`, `docs/troubleshooting.md`, and
    `docs/troubleshooting.ko.md` now document both Postgres-backed
    repository/migration skips and `PGVECTOR_TEST_URL`-gated pgvector adapter
    skips.
  - `.github/workflows/ci.yml` main-matrix test comment now reflects the same
    split, with dedicated backend jobs below.
  - `tests/scripts/public-docs-drift.test.ts` and
    `tests/scripts/ci-workflow-hygiene.test.ts` now guard the current wording.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts tests/scripts/ci-workflow-hygiene.test.ts`
  (`48` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1827` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed semantic compaction comments:
  - `src/compact/compact-memory.ts` now describes the semantic compaction
    orchestrator without the planning-era `P18.1` label.
  - `src/mcp/types.ts` now describes opt-in semantic dedup without the
    planning-era `P18` label.
  - `tests/scripts/public-docs-drift.test.ts` now guards those exact stale
    phrases alongside the existing compaction comment checks.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`41` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1826` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed compaction cleanup sweeper comments:
  - `.env.example` now describes compaction-apply Qdrant cleanup retries
    without the planning-era `P17` label.
  - `src/compact/sweeper-loop.ts` now describes the default-disabled
    env-driven opt-in behavior without saying the machinery ships in `P19`.
  - `tests/scripts/public-docs-drift.test.ts` now guards those exact stale
    phrases alongside the existing compaction comment checks.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`41` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1826` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned contributor test command spelling:
  - `CONTRIBUTING.md` and `CONTRIBUTING.ko.md` now use `npm test` in the daily
    command tables, matching README common commands and PR verification.
  - `tests/scripts/public-docs-drift.test.ts` now guards the exact English and
    Korean table rows so the docs do not drift back to mixed spellings.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`41` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1826` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned README common commands:
  - `README.md` and `README.ko.md` now list `npm run build` and
    `npm audit --audit-level=moderate` alongside typecheck/test in the common
    commands section.
  - `tests/scripts/public-docs-drift.test.ts` now checks the shared
    verification command set across README, CONTRIBUTING, and the PR template.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`41` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1826` tests passed, `34` skipped)
- `git diff --check` (passed)

- Added CI build coverage:
  - `.github/workflows/ci.yml` now runs `npm run build` in the main Node matrix
    after typecheck and before non-PG tests.
  - `tests/scripts/ci-workflow-hygiene.test.ts` now guards the build step and
    its ordering.
  - Source checked: `CONTRIBUTING.md`, `CONTRIBUTING.ko.md`, and the PR
    template already require `npm run build` as part of local/PR verification;
    this aligns CI with that repository policy.

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`6` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1826` tests passed, `34` skipped)
- `git diff --check` (passed)

- Added explicit CI job timeouts:
  - `.github/workflows/ci.yml` now sets `timeout-minutes: 30` on
    `typecheck-and-test`, `pg-integration`, and `pgvector-integration`.
  - `tests/scripts/ci-workflow-hygiene.test.ts` now guards those timeouts so
    hung jobs do not fall back to GitHub Actions' default 360-minute limit.
  - Source checked: GitHub Actions workflow syntax documents
    `jobs.<job_id>.timeout-minutes` and says the default job timeout is 360
    minutes:
    https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`5` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1825` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed compaction apply and MCP type comments:
  - `src/compact/apply-compaction.ts` now describes the destructive apply path,
    advisory-lock scope choice, and rate limit without internal phase labels.
  - `src/mcp/types.ts` now describes compact apply result fields and unarchive
    tool types with current feature wording.
  - Historical changelog and migration comments remain untouched because those
    describe past release context.
  - `tests/scripts/public-docs-drift.test.ts` now guards the stale source
    phrases from returning.

Verification plan:
- `npx vitest run tests/compact/apply-compaction.test.ts tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/compact/apply-compaction.test.ts tests/scripts/public-docs-drift.test.ts`
  (`82` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1824` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed memory archive source labels:
  - `src/store/memory-archive-repository.ts` no longer describes the
    compaction apply path, rate-limit helper, or unarchive recovery flow with
    internal phase labels.
  - Direct `restoreToCanonical` calls now report missing `source_id` without a
    `pre-P19.1` label.
  - The documented `unarchive_memory` skipped outcome reason remains
    `pre_p19.1_archive_missing_source_id` for client compatibility; changing
    that API string is a separate compatibility decision, not a cleanup.
  - `tests/scripts/public-docs-drift.test.ts` guards against the stale source
    phrases returning.

Verification plan:
- `npx vitest run tests/store/memory-archive-repository.test.ts tests/compact/unarchive-compaction.test.ts tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts tests/compact/unarchive-compaction.test.ts tests/scripts/public-docs-drift.test.ts`
  (`112` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1823` tests passed, `34` skipped)
- `git diff --check` (passed)

- Cleaned up public architecture phase labels:
  - `docs/architecture.md` and `docs/architecture.ko.md` now use feature
    names for the compact apply and unarchive data-flow sections instead of
    internal phase labels.
  - The unarchive skip path now describes rows with missing `source_id`
    directly instead of referring to `pre-P19.1`.
  - `tests/scripts/public-docs-drift.test.ts` now guards against `(P17)`,
    `(P19.1)`, and `pre-P19.1` returning to public architecture docs.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`39` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1822` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed ingest sweeper repository comments:
  - `src/jobs/ingest-job-repository.ts` now describes `listPendingForRetry` as
    a read-only monitoring/manual replay query and points production sweepers
    at the implemented `claimPendingForRetry` claim path.
  - `tests/scripts/public-docs-drift.test.ts` now guards against
    reintroducing the stale future-tense "The sweeper PR will" wording.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npx vitest run tests/jobs/ingest-job-claim.test.ts tests/compact/ingest-sweeper.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts tests/jobs/ingest-job-claim.test.ts tests/compact/ingest-sweeper.test.ts`
  (`102` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1821` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned contributing daily commands:
  - `CONTRIBUTING.md` and `CONTRIBUTING.ko.md` now list `npm run build` and
    `npm audit --audit-level=moderate` in the daily command tables.
  - `tests/scripts/public-docs-drift.test.ts` now guards those table entries
    alongside the shared verification command set.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`37` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1820` tests passed, `34` skipped)
- `git diff --check` (passed)

- Refreshed compaction plan comments:
  - `src/compact/compact-memory.ts` now describes the current shared dry-run
    and destructive-apply result-shape role instead of a future P17 extension
    point.
  - `tests/scripts/public-docs-drift.test.ts` now guards that stale planning
    wording does not return.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npx vitest run tests/compact/compact-memory.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`37` tests passed)
- `npx vitest run tests/compact/compact-memory.test.ts` (`36` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1820` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned contributing verification guidance:
  - `CONTRIBUTING.md` and `CONTRIBUTING.ko.md` now ask contributors to run
    `npm run typecheck`, `npm run build`, `npm audit --audit-level=moderate`,
    and `npm test` before pushing.
  - `tests/scripts/public-docs-drift.test.ts` now guards the shared command set
    across the PR template and both contributing docs.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`37` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1820` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned PR verification checklist:
  - `.github/PULL_REQUEST_TEMPLATE.md` now asks contributors to include
    `npm run typecheck`, `npm run build`, `npm audit --audit-level=moderate`,
    and `npm test` results for non-trivial changes.
  - `tests/scripts/public-docs-drift.test.ts` now guards the PR test-plan
    checklist so it stays aligned with the local verification loop and CI audit
    coverage.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`37` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1820` tests passed, `34` skipped)
- `git diff --check` (passed)

- Documented `MEMORY_API_TOKENS` colon restrictions:
  - `.env.example`, `docs/configuration.md`, and `docs/configuration.ko.md`
    now state that token values cannot contain `:` because it is reserved for
    the optional `token:org` binding separator.
  - `tests/scripts/public-docs-drift.test.ts` now guards the env-template and
    English/Korean configuration wording.
  - `CHANGELOG.md` and `CHANGELOG.ko.md` record the public configuration docs
    clarification.
  - Source checked: `docs/superpowers/audit/02-security.md` finding 11 asked
    for the colon restriction to be explicit in config docs and the env var
    comment. Runtime parsing and tests already reject multiple-colon entries.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`36` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1819` tests passed, `34` skipped)
- `git diff --check` (passed)

- Added CI dependency audit coverage:
  - `.github/workflows/ci.yml` now runs
    `npm audit --audit-level=moderate` in the `typecheck-and-test` job after
    dependency installation and before typecheck/test.
  - `tests/scripts/ci-workflow-hygiene.test.ts` now guards that the audit step
    remains in the CI workflow.
  - Source checked: repo security audit notes called for running `npm audit`
    as part of CI (`docs/superpowers/audit/02-security.md`).
  - Source checked: npm docs recommend adding `npm audit` to continuous
    integration and document `--audit-level=moderate` as the CI failure
    threshold for moderate-or-higher vulnerabilities:
    https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/
    https://docs.npmjs.com/cli/v8/commands/npm-audit/

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`4` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1818` tests passed, `34` skipped)
- `git diff --check` (passed)

- Restricted CI workflow token permissions:
  - `.github/workflows/ci.yml` now sets top-level `permissions:
    contents: read` for the default `GITHUB_TOKEN`.
  - `tests/scripts/ci-workflow-hygiene.test.ts` guards the least-privilege
    workflow permission block and prevents broad write grants from creeping in.
  - Source checked: GitHub Actions secure-use guidance recommends minimum
    required `GITHUB_TOKEN` permissions and read-only repository contents by
    default:
    https://docs.github.com/en/actions/reference/security/secure-use
  - Source checked: GitHub workflow syntax documents top-level `permissions`
    and that unspecified permissions become `none` when a permission is set:
    https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax

Verification plan:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/ci-workflow-hygiene.test.ts` (`3` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`79` files passed, `2` skipped; `1817` tests passed, `34` skipped)
- `git diff --check` (passed)

- Guarded local secret/generated artifact ignore patterns:
  - `.gitignore` now ignores local `.env` variants, `.envrc`, and generated
    `.akasha/` client/hook artifacts while keeping `.env.example` tracked.
  - `tests/scripts/repo-secret-hygiene.test.ts` now verifies those ignore
    patterns stay present and those local artifacts stay out of tracked files.

Verification plan:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts`
- `git check-ignore -v .env .env.local .envrc .akasha/mcp/codex.toml`
- `git check-ignore -v .env.example` (expected no match)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts` (`6` tests passed)
- `git check-ignore -v .env .env.local .envrc .akasha/mcp/codex.toml`
  (all ignored by `.gitignore`)
- `git check-ignore -v .env.example` (no match; tracked template remains
  available)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1814` tests passed, `34` skipped)
- `git diff --check` (passed)

- Added generated metadata ignore-pattern coverage:
  - `tests/scripts/repo-secret-hygiene.test.ts` now verifies `.gitignore`
    keeps the desktop/editor metadata patterns that the tracked-file hygiene
    guard expects.

Verification plan:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts` (`4` tests passed)
- Generated-metadata workspace scan excluding `node_modules`, `.git`, and
  `.worktrees` (no matches)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1812` tests passed, `34` skipped)
- `git diff --check` (passed)

- Broadened generated metadata hygiene:
  - Removed ignored desktop metadata artifacts from the workspace.
  - `.gitignore` now covers common desktop/editor metadata files.
  - `tests/scripts/repo-secret-hygiene.test.ts` now guards against tracked
    desktop/editor metadata files, not only `.DS_Store`.

Verification plan:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts` (`3` tests passed)
- Generated-metadata workspace scan excluding `node_modules`, `.git`, and
  `.worktrees` (no matches)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1811` tests passed, `34` skipped)
- `git diff --check` (passed)

- Cleaned up Finder metadata hygiene:
  - Removed ignored workspace artifact `.github/.DS_Store`.
  - `tests/scripts/repo-secret-hygiene.test.ts` now guards against tracked
    `.DS_Store` files.

Verification plan:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts` (`3` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1811` tests passed, `34` skipped)
- `git diff --check` (passed)

- Localized Korean setup and embedding labels:
  - `README.ko.md`, `docs/configuration.ko.md`, `docs/security.ko.md`, and
    `docs/troubleshooting.ko.md` now avoid mixed English `default`/`stub`
    labels in setup, embedding, and backup snippets.
  - `tests/scripts/public-docs-drift.test.ts` now guards those localized Korean
    setup and embedding labels.
  - `CHANGELOG.md` and `CHANGELOG.ko.md` record the public documentation polish.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`35` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1810` tests passed, `34` skipped)
- `git diff --check` (passed)

- Localized Korean README comparison-table labels:
  - `README.ko.md` now uses Korean labels for non-code comparison-table status
    cells such as OpenAI default, hosted, wrapper-only, varies, proprietary,
    and deprecated.
  - `tests/scripts/public-docs-drift.test.ts` now guards the localized Korean
    comparison-table labels.
  - `CHANGELOG.md` and `CHANGELOG.ko.md` record the public documentation polish.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`34` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1809` tests passed, `34` skipped)
- `git diff --check` (passed)

- Localized Korean README comparison copy:
  - `README.ko.md` now avoids mixed English positioning phrases such as
    `무료/로컬 default`, `distinctively`, and `peers 는 skip` in the comparison
    section.
  - `tests/scripts/public-docs-drift.test.ts` now guards the localized Korean
    comparison wording.
  - `CHANGELOG.md` and `CHANGELOG.ko.md` record the public documentation polish.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`33` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1808` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned Korean backup guidance wording:
  - `README.ko.md`, `docs/operations.ko.md`, and
    `docs/self-hosted-operations.ko.md` now describe pgvector backup logical
    data paths in Korean instead of inheriting English README phrasing.
  - `tests/scripts/public-docs-drift.test.ts` now validates English and Korean
    backup wording separately.
  - `CHANGELOG.md` and `CHANGELOG.ko.md` record the public documentation polish.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`32` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1807` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned Korean public-doc body links with Korean mirrors:
  - `README.ko.md`, `CONTRIBUTING.ko.md`, `docs/configuration.ko.md`,
    `docs/operations.ko.md`, `docs/security.ko.md`, and
    `docs/troubleshooting.ko.md` now point body links at Korean mirror files
    where those mirrors exist.
  - Explicit language-switch links and `docs/README.ko.md` bilingual index
    columns remain unchanged.
  - `tests/scripts/public-docs-drift.test.ts` now guards these mirror links.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`32` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1807` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned the feature request scope dropdown with vector-backend support:
  - `.github/ISSUE_TEMPLATE/feature_request.yml` now uses `Vector backend
    (Qdrant / pgvector)` instead of Qdrant-only wording.
  - `tests/scripts/public-docs-drift.test.ts` now uses a shared issue-template
    dropdown helper and guards the feature-request scope option.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`31` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1806` tests passed, `34` skipped)
- `git diff --check` (passed)

- Added missing pgvector npm package metadata:
  - `package.json#keywords` now includes `pgvector`, matching the package
    description and public vector-backend docs.
  - `tests/scripts/package-manifest.test.ts` now guards the backend metadata
    keywords together with the package description.
  - `CHANGELOG.md` and `CHANGELOG.ko.md` record the user-visible metadata fix.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm pack --dry-run --json`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`4` tests passed)
- `npm pack --dry-run --json` (passed; `prepack` rebuilt `dist/`, `115`
  package entries)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1805` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned the bug report deployment dropdown with vector-backend support:
  - `.github/ISSUE_TEMPLATE/bug_report.yml` now describes custom deployments as
    external Postgres plus Qdrant or pgvector.
  - `tests/scripts/public-docs-drift.test.ts` now uses a shared dropdown-option
    helper and guards the deployment option alongside provider options.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`30` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1805` tests passed, `34` skipped)
  - A previous full-suite attempt hit a transient 5s timeout in
    `tests/scripts/backup-verify.test.ts`; rerunning that file passed (`60`
    tests) before the final full-suite pass.
- `git diff --check` (passed)

- Fixed bug report template drift:
  - `.github/ISSUE_TEMPLATE/bug_report.yml` now lists `transformers`, `openai`,
    and `local`, matching the supported provider set and putting the default
    first.
  - The markdown security link now uses `../../SECURITY.md`, matching the
    checklist link from the issue-template location.
  - `tests/scripts/public-docs-drift.test.ts` now guards the provider option
    list and security links.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`29` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1804` tests passed, `34` skipped)
- `git diff --check` (passed)

- Aligned npm package metadata with the pluggable vector-backend docs:
  - `package.json#description` now describes Postgres-backed storage with
    Qdrant or pgvector search instead of implying Qdrant-only operation.
  - `tests/scripts/package-manifest.test.ts` now guards that npm metadata
    wording alongside the package publish surface.
  - `CHANGELOG.md` and `CHANGELOG.ko.md` record the user-visible metadata fix.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm pack --dry-run --json`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`4` tests passed)
- `npm pack --dry-run --json` (passed; `prepack` rebuilt `dist/`, `115`
  package entries)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1802` tests passed, `34` skipped)
- `git diff --check` (passed)

- Removed the source-checkout-only installer from the npm package allowlist:
  - `package.json#files` no longer includes `install.sh`; the script remains a
    repository-checkout installer and source-checkout docs may still reference
    it.
  - `tests/scripts/package-manifest.test.ts` now expects the smaller allowlist
    and explicitly rejects `install.sh` as a source-checkout-only package entry.
  - `PLAN.md` and `BACKLOG.md` reflect the completed package-surface hygiene
    correction.
  - No `DECISIONS.md` entry is needed because this is a package-surface hygiene
    correction, not a durable installer behavior or package UX decision.

Verification plan:
- `npx vitest run tests/scripts/package-manifest.test.ts`
- `npm pack --dry-run --json`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts` (`3` tests passed)
- `npm pack --dry-run --json` (passed; `prepack` rebuilt `dist/`, `115`
  package entries)
  - Included built runtime output under `dist/src/**` and `dist/scripts/**`,
    plus `scripts/*.sh`, `.env.example`, public docs, mirrored root docs, and
    `LICENSE`.
  - Excluded `install.sh`, `docker/**`, `compose*.yaml`, root `src/**`, and
    `tests/**`.
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1800` tests passed, `34` skipped)
- `git diff --check` (passed)

- Added the missing Unreleased npm package tarball changelog notes:
  - `CHANGELOG.md` now says published packages include built runtime output
    under `dist/`, exclude root source/tests/CI/internal work tracking plus
    source-checkout-only `install.sh` and Docker/Compose assets, and rebuild a
    clean `dist/` via `prepack`.
  - `CHANGELOG.ko.md` carries the equivalent Korean Unreleased note.
  - `tests/scripts/public-docs-drift.test.ts` now checks only the Unreleased
    changelog sections for stable package tarball markers in both languages.

Verification plan:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- `npm test`
- `git diff --check`

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`27` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1801` tests passed, `34` skipped)
- `git diff --check` (passed)

- Fixed stale Unreleased ingest outbox sweeper changelog wording:
  - `CHANGELOG.md` and `CHANGELOG.ko.md` now describe Migration 007 as shipped
    Qdrant outbox support for the implemented opt-in ingest sweeper/retry loop,
    including the current `qdrant_*` columns and `INGEST_SWEEP_ENABLED` path.
  - `tests/scripts/public-docs-drift.test.ts` now guards only the Unreleased
    Migration 007 ingest outbox bullet against stale `#12 branch`, `in-flight`,
    and `in-progress` wording, leaving older release history unrestricted.
  - Spec and code-quality reviews approved the scoped diff.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (25 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1796 passed, 34 skipped across 79 files)
- `git diff --check`

- Fixed Unreleased changelog migration-range drift:
  - `CHANGELOG.md` and `CHANGELOG.ko.md` no longer present `001-012` as the
    current migration range in Unreleased; all range literals in that section
    now resolve to the current `001-015`.
  - `tests/scripts/public-docs-drift.test.ts` now checks the Unreleased
    changelog section only, so older release-history ranges remain allowed.
    Code-quality review tightened the guard to inspect every `NNN-NNN`
    literal and anchor on the actual `## [Unreleased]` heading.
  - Spec and code-quality re-review approved the final scoped diff.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (24 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1795 passed, 34 skipped across 79 files)
- `git diff --check`

- Aligned the local installer with Docker and CI ONNX Runtime install behavior:
  - `install.sh` now runs `npm install` with
    `ONNXRUNTIME_NODE_INSTALL_CUDA=skip` so local dependency installation avoids
    downloading CUDA provider binaries.
  - `tests/scripts/dockerfile-hardening.test.ts` now verifies Dockerfile, CI,
    and local installer dependency installs use the supported environment
    variable and avoid the deprecated npm CLI config flag.
  - The locked `onnxruntime-node@1.21.0` install script documents
    `ONNXRUNTIME_NODE_INSTALL_CUDA` and the `skip` value, matching the
    Docker/CI hardening path:
    https://github.com/microsoft/onnxruntime/blob/v1.21.0/js/node/script/install.js
  - Spec and code-quality reviews approved the scoped diff.

Verification:
- `npx vitest run tests/scripts/dockerfile-hardening.test.ts` (5 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1794 passed, 34 skipped across 79 files)
- `git diff --check`

## 2026-06-30

- Fixed Compose environment-flow wording drift:
  - `.env.example` now says Compose reads `.env` through `${VAR:-default}`
    substitution, matching `compose.yaml` and `docs/configuration.md`, instead
    of incorrectly saying `env_file` substitution.
  - `tests/scripts/public-docs-drift.test.ts` now guards that wording and the
    matching English/Korean configuration-doc flow descriptions.
  - Spec review passed.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (23 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1793 passed, 34 skipped
  across 79 files)
- `git diff --check`

- Stabilized Docker image dependency installs for local CPU-only ONNX Runtime:
  - `docker/app.Dockerfile` now sets
    `ONNXRUNTIME_NODE_INSTALL_CUDA=skip` on both the builder and runtime
    `npm ci` commands.
  - `.github/workflows/ci.yml` now uses the same environment variable form
    instead of npm's unknown CLI config path.
  - `tests/scripts/dockerfile-hardening.test.ts` now verifies both Dockerfile
    install commands and CI use the environment variable, while the runtime
    Docker install still omits dev dependencies.
  - A worker subagent implemented the scoped patch. Spec review passed.
    Code-quality review caught the npm unknown-config risk in the initial CLI
    flag form; the final env-var version passed re-review.
- Source rationale:
  - The locked `onnxruntime-node` install script documents
    `ONNXRUNTIME_NODE_INSTALL_CUDA` as a supported way to control CUDA provider
    binary installation and `skip` as the value that keeps CPU ONNX Runtime
    available without downloading GPU binaries:
    https://github.com/microsoft/onnxruntime/blob/v1.21.0/js/node/script/install.js
  - A code-quality review caught that npm's unknown CLI config form can warn
    and may stop working in a future npm major, so Docker and CI now use the
    install script's direct environment variable.

Verification:
- `npx vitest run tests/scripts/dockerfile-hardening.test.ts tests/scripts/compose-config.test.ts tests/scripts/public-docs-drift.test.ts`
  (29 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1792 passed, 34 skipped
  across 79 files)
- `git diff --check`

- Hardened CLI direct input validation:
  - `parseCliArgs` now rejects malformed direct argv containers and non-string
    argv entries before command parsing.
  - `runCli` now rejects malformed direct option containers, non-string or
    blank cwd values, and malformed registry containers before command
    dispatch.
  - Omitted options, registry-free commands, and command-specific partial
    registry objects remain supported.
  - A worker subagent implemented the scoped patch; final verification passed
    focused CLI coverage, typecheck, build, audit, and the single-worker full
    suite.

Verification:
- `npx vitest run tests/cli.test.ts` (30 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1790 passed, 34 skipped
  across 79 files)

- Hardened operator server option validation:
  - `createOperatorServer` and `startOperatorServer` now reject malformed
    direct option containers, injected service config shapes, registry
    handles, logger handles, bearer token lists, dependency probes, rate
    limiters, OAuth verifier handles, metrics registries, and background queue
    collectors before reading option fields.
  - OAuth protected-resource metadata validation is now reusable and covers the
    metadata fields serialized by the well-known endpoint.
  - Existing omitted-options env fallback, empty-registry construction,
    auth-disabled warning behavior, metrics rendering, and background worker
    startup paths are preserved.
  - A worker subagent implemented the patch; spec review passed, and
    code-quality review drove fixes for conditional config/OAuth/logger
    validation before final approval.

Verification:
- `npx vitest run tests/app/operator-server-boundary.test.ts tests/app/server.test.ts tests/app/oauth-protected-resource.test.ts`
  (115 passed)
- `npx vitest run tests/app/operator-server-boundary.test.ts tests/app/server.test.ts tests/app/start-operator-server-metrics.test.ts tests/app/start-background-workers-server.test.ts tests/app/metrics.test.ts tests/app/mcp-http.test.ts tests/app/oauth-protected-resource.test.ts`
  (172 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1784 passed, 34 skipped
  across 79 files)
- `git diff --check`

- Hardened JSON HTTP route input validation:
  - `createMemoryRoutes` now rejects malformed direct route contexts, registry
    objects, logger handles, and OAuth metadata handles before route
    construction.
  - `resolveOrganizationId` now rejects malformed direct requests, request
    header maps, and raw-header arrays before organization header resolution.
  - Existing JSON HTTP behavior, organization resolution semantics, and
    partial-registry route construction are preserved.
  - A worker subagent implemented the patch; spec and code-quality reviewers
    passed after an explicit regression test preserved partial-registry route
    construction.
  - The first single-worker full-suite run hit the known timing-sensitive
    backup manifest shell test timeout; the focused backup case passed on
    rerun, and the full single-worker suite passed on rerun.

Verification:
- `npx vitest run tests/app/memory-routes-boundary.test.ts tests/mcp/resolve-org.test.ts tests/app/server.test.ts`
  (98 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run tests/scripts/backup-verify.test.ts -t "rejects existing null manifests before mutation" --maxWorkers=1 --minWorkers=1`
  (1 passed, 59 skipped)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1752 passed, 34 skipped
  across 78 files)
- `git diff --check`

- Hardened MCP HTTP request handler input validation:
  - `handleMcpHttpRequest` now rejects malformed direct options, request
    headers, response handles, registry handles, bearer token lists, OAuth
    verifier handles, rate limiter handles, logger handles, OAuth metadata
    handles, and allowed hostnames before request dispatch.
  - Existing method, host, origin, auth, rate-limit, and MCP transport behavior
    are preserved.
  - A read-only explorer subagent confirmed the minimal boundary gap; separate
    spec and code-quality reviewer subagents passed the final diff.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/mcp-http-boundary.test.ts tests/app/mcp-http.test.ts`
  (30 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1738 passed, 34 skipped
  across 77 files)
- `git diff --check`

- Hardened MCP server construction input validation:
  - `createMcpServer` now rejects malformed direct options, invalid shared
    registry options, malformed injected registry handles, and invalid
    authorizer callbacks before server/registry wiring.
  - `resolveStdioCwd` now rejects malformed env objects, non-string `DMO_CWD`
    values, invalid fallback callbacks, and blank fallback cwd values before
    stdio startup.
  - Existing default server construction, injected registry schema-only tests,
    and valid configured/fallback cwd behavior are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/mcp/mcp-server-construction.test.ts tests/mcp/stdio-cwd.test.ts`
  (15 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1727 passed, 34 skipped
  across 76 files)
- `git diff --check`

- Hardened MCP registry construction input validation:
  - `createToolRegistry` now rejects malformed direct options, invalid cwd and
    default scope/actor text, malformed override repositories/loggers/audit
    handles, and invalid resolver functions before handler wiring.
  - `createToolHandlers` now rejects malformed direct construction input,
    invalid nested registry options, invalid cwd values, and invalid canonical
    service callback handles before destructuring shared MCP fields.
  - Existing default registry construction and MCP server behavior are
    preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/mcp/tool-registry.test.ts` (17 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1716 passed, 34 skipped
  across 75 files)
- `git diff --check`

- Hardened embedding provider factory input validation:
  - `createEmbeddingProvider` now rejects malformed direct input containers,
    malformed config objects, unknown provider names, invalid model/dimensions
    values, and non-string OpenAI API key values before provider construction.
  - The OpenAI provider branch now treats missing and whitespace-only API keys
    as the same documented `OPENAI_API_KEY` configuration error.
  - Existing local provider routing and provider-name helper behavior are
    preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/embedding/embedding-factory.test.ts` (13 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1699 passed, 34 skipped
  across 74 files)
- `git diff --check`

- Hardened local embedding client input validation:
  - `createLocalEmbeddingClient` now rejects malformed direct input containers
    and invalid dimensions before allocating deterministic vectors.
  - `embed` and `embedBatch` now reject malformed direct text input before
    hashing.
  - Existing deterministic vector generation, configured dimensions,
    L2-normalization, empty-batch behavior, and batch ordering are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/embedding/local-embedding.test.ts` (11 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1686 passed, 34 skipped
  across 73 files)
- `git diff --check`

- Hardened transformers embedding client input validation:
  - `createTransformersEmbeddingClient` now rejects malformed direct input
    containers, blank/non-string model values, and invalid injected extractor
    factories before model loading.
  - `embed` and `embedBatch` now reject malformed direct text input before
    loading or calling the extractor.
  - Injected extractor factory results are validated before use, so malformed
    factories fail explicitly instead of being called as functions.
  - Existing extractor memoization, pooling/normalization options, empty-vector
    handling, and number-array conversion behavior are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/embedding/transformers-embedding.test.ts` (12 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1675 passed, 34 skipped
  across 72 files)
- `git diff --check`

- Hardened OpenAI embedding client input validation:
  - `createOpenAiEmbeddingClient` now rejects malformed direct input
    containers, blank/non-string API key or model values, invalid injected
    client factories, and malformed injected client results before embedding
    calls.
  - `embed` and `embedBatch` now reject malformed direct text input before
    calling the injected OpenAI embeddings API client.
  - Injected `createClient` results are validated directly; an injection that
    returns `null` no longer falls back to constructing the real OpenAI SDK.
  - Existing successful single/batch embedding behavior and response-count
    validation are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/embedding/openai-embeddings.test.ts` (16 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1667 passed, 34 skipped
  across 72 files)
- `git diff --check`

- Hardened Qdrant client factory input validation:
  - `createQdrantClient` now rejects malformed direct input containers and
    blank/non-string URL or API key values before constructing the Qdrant SDK
    client.
  - Added unit coverage that mocks `@qdrant/js-client-rest`, so valid
    construction is checked without network compatibility probes or SDK
    warnings.
  - Existing service config expectations and valid SDK construction behavior
    are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/qdrant/client.test.ts` (6 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1657 passed, 34 skipped
  across 72 files)
- `git diff --check`

- Hardened memory chunk repository input validation:
  - `createMemoryChunkRepository` now rejects malformed pool handles before
    returning repository methods.
  - Chunk insert and replace paths now reject malformed direct input
    containers, invalid record IDs, blank organization IDs, invalid chunk
    shapes, invalid offsets, and invalid embedding config before SQL or
    transactions.
  - Point-ID updates, record deletes, list pagination, get-by-record, pending
    ingest replacement, and context-pack run creation now reject invalid direct
    IDs, mappings, scopes, options, dates, selected memory IDs, and text fields
    before query construction.
  - Existing batched insert/update SQL shape, replacement transaction behavior,
    list pagination, context-pack persistence, and pending ingest retry row
    creation are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (47 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1651 passed, 34 skipped
  across 71 files)
- `git diff --check`

- Hardened goal-run repository input validation:
  - `createGoalRunRepository` now rejects malformed pool handles before
    returning repository methods.
  - Start/list/get/close paths now reject malformed direct input containers,
    missing or blank required text, invalid scope/status values, invalid run
    IDs, and invalid optional text before query construction.
  - Iteration recording now rejects malformed direct inputs, invalid run IDs,
    invalid outcomes, blank attempt/optional text, and invalid memory ID arrays
    before opening a transaction.
  - Existing row mapping, active-run conflict behavior, iteration count bumping,
    transaction rollback behavior, and active-run memory pinning behavior are
    preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/goal-run/goal-run-repository.test.ts` (27 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1630 passed, 34 skipped
  across 71 files)
- `git diff --check`

- Hardened DB boundary input validation:
  - `createPgPool` now rejects malformed input containers and blank/non-string
    connection strings before constructing a `pg.Pool`.
  - `readPostgresMigrationSql`, `runMigrations`, and
    `resolveMigrationDatabaseUrl` now reject malformed options, pool handles,
    env objects, and non-string env values before fallback reads or migration
    queries.
  - pgvector integration suites now defer real pool construction until
    `beforeAll` and treat blank `PGVECTOR_TEST_URL` as absent, so skipped
    suites do not fail during test collection.
  - Existing migration SQL fallback behavior, migration URL defaults, and
    pgvector opt-in integration behavior are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/db/connection.test.ts tests/db/migrate.test.ts`
  (21 passed, 8 skipped)
- `npx vitest run tests/db/connection.test.ts tests/db/migrate.test.ts tests/vector/pgvector-index.integration.test.ts`
  (35 passed, 20 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1615 passed, 34 skipped
  across 71 files)
- `git diff --check`

- Hardened memory archive cleanup input validation:
  - `createMemoryArchiveRepository` now rejects malformed pool handles before
    returning repository methods.
  - Qdrant cleanup status, find, claim, unarchive marking, and restored-record
    delete helpers now reject invalid IDs, statuses, error-message types,
    claim input containers, limits, and timestamps before query construction.
  - Existing compaction run creation, archive apply, cleanup claim SQL shape,
    unarchive restore behavior, and scope-lock behavior are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (44 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1603 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened ingest job repository input validation:
  - `createIngestJobRepository` now rejects malformed pool handles before
    returning repository methods.
  - Create/update methods now reject malformed direct inputs, invalid job IDs,
    invalid memory record IDs, invalid attempt counts, and invalid retry dates
    before query construction or failure logging.
  - Retry list/claim methods now validate direct input containers, positive
    limits, and valid timestamps before computing visibility windows or
    querying.
  - Existing claim SQL shape, visibility timeout behavior, error
    serialization, and integration-only persistence behavior are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/jobs/ingest-job-claim.test.ts tests/jobs/serialize-error.test.ts`
  (17 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1592 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened audit repository input validation:
  - `createAuditLogRepository` now rejects malformed pool handles before
    returning repository methods.
  - `record` now rejects malformed direct audit entries, missing/blank required
    text fields, invalid outcome values, invalid optional text fields, and
    negative/non-finite durations before constructing insert queries.
  - `listByOrganization` now rejects malformed direct options objects before
    resolving limits or querying.
  - Existing organization checks, audit limit bounds, error-message truncation,
    audit-list behavior, and best-effort tool-boundary audit handling are
    preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/audit/audit-truncation.test.ts tests/audit/audit-write.test.ts`
  (33 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1582 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened project-ingest input validation:
  - `collectProjectSources` now rejects non-string, blank, missing, and
    non-directory project roots before joining approved source paths or reading
    files.
  - `ingestProjectArtifacts` now rejects malformed direct inputs, blank project
    roots, blank project IDs, missing repository objects, and invalid
    `repository.addMemory` handles before filesystem or persistence work.
  - Existing approved-source filtering and normalized project memory ingestion
    behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/ingest/ingest-project.test.ts` (7 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1568 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened OAuth scope enforcement input validation:
  - `checkOAuthScopes` and `requiredScopeKindForTool` now reject malformed
    direct scope input containers before reading tool arguments such as
    `dryRun`.
  - OAuth token scope lists now must be arrays of strings before scope matching
    runs.
  - `acceptedScopesForKind` now rejects unsupported direct scope kinds with an
    explicit error.
  - Unsupported direct tool names now fail explicitly instead of falling
    through scope-kind switch logic.
  - Existing HTTP route scope enforcement, MCP Streamable HTTP authorization,
    JWT verification, and static-token bypass behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/oauth-token-auth.test.ts` (21 passed)
- `npx vitest run tests/app/oauth-token-auth.test.ts tests/app/mcp-http.test.ts tests/app/server.test.ts`
  (107 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1562 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened dependency health probe input validation:
  - `checkDependencies` now rejects malformed direct probe containers before
    iterating entries or reporting readiness checks.
  - Dependency probe names are constrained to the typed low-cardinality set:
    Postgres, Qdrant, and OpenAI.
  - `buildPostgresProbe` now validates its pool and `query` method before
    returning a probe closure.
  - `buildQdrantProbe` and `buildOpenAiProbe` now reject malformed direct
    inputs, blank URL/API-key values, invalid optional fetch handles, and
    invalid timeout values before returning a probe closure.
  - Existing `/readyz`, `/metrics` dependency gauges, probe failure reporting,
    and provider/backend probe selection behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/health/check-dependencies.test.ts` (23 passed)
- `npx vitest run tests/health/check-dependencies.test.ts tests/app/server.test.ts tests/app/metrics.test.ts`
  (126 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1559 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened metrics-registry boundary validation:
  - `createMetricsRegistry` now rejects malformed direct HTTP request
    observations before normalizing methods or recording samples.
  - Sweeper observations now validate worker/status enums, finite durations,
    and finite known row counts before mutating tick or row counters.
  - Dependency reports now validate report status, check containers, check
    names/statuses, and finite durations before they can be rendered.
  - Background queue backlog snapshots now validate their container shape,
    collection status, rows, and finite counts before label rendering while
    still filtering unknown queue/state strings from output.
  - Existing `/metrics`, `/readyz`, background worker metrics, and collector
    failure behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/metrics.test.ts` (36 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1545 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened worker-process input validation:
  - `runWorkerProcess` now rejects invalid direct options before resolving
    defaults or invoking the background-worker starter.
  - Worker process options now validate optional logger, environment flag
    values, metrics recorder, and injected starter function.
  - Handles returned by injected starters must provide valid worker names and a
    stop function before `startedWorkers` is read or startup/no-worker logging
    runs.
  - Existing fail-fast delegation, no-worker warning, successful handle return,
    and app/server startup behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/worker.test.ts` (18 passed)
- `npx vitest run tests/app/worker.test.ts tests/app/background-workers.test.ts tests/app/start-background-workers-server.test.ts tests/app/start-operator-server-metrics.test.ts tests/app/server.test.ts`
  (110 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1524 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened background-worker coordinator input validation:
  - `startBackgroundWorkers` now rejects non-object direct options before
    reading worker flags, bootstrapping services, or starting sweepers.
  - Coordinator options now validate logger methods, environment flag types,
    fail-fast mode, metrics recorders, service bootstrap, and injected starter
    functions.
  - Bootstrap service results must provide the expected service objects and an
    optional `close` function.
  - Malformed bootstrap service results are rejected in fail-fast mode and
    logged as worker startup failures in default mode without starting sweepers.
  - Existing disabled-worker noop behavior, shared bootstrap, stop handling,
    fail-fast bootstrap errors, server startup resilience, and metrics wiring is
    preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/background-workers.test.ts` (21 passed)
- `npx vitest run tests/app/background-workers.test.ts tests/app/start-background-workers-server.test.ts tests/app/start-operator-server-metrics.test.ts tests/app/worker.test.ts tests/app/server.test.ts`
  (93 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1507 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened sweeper loop input validation:
  - `startBackgroundSweeper` and `startIngestSweeper` now reject non-object
    direct input before reading loop options, scheduling timers, or logging
    startup.
  - Loop logger methods, optional metrics recorders, and interval values are
    validated before any background sweep can be scheduled.
  - `intervalMs` now rejects non-finite, non-integer, and sub-1000 values.
  - Malformed loop input is covered with no-claim assertions for both
    compaction and ingest sweepers.
  - Existing tick scheduling, stop handling, metric recording, error swallowing,
    and environment parsing behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/compact/sweeper-loop.test.ts tests/compact/ingest-sweeper-loop.test.ts`
  (46 passed)
- `npx vitest run tests/compact/sweeper-loop.test.ts tests/compact/ingest-sweeper-loop.test.ts tests/compact/outbox-sweeper.test.ts tests/compact/ingest-sweeper.test.ts tests/app/background-workers.test.ts tests/app/start-background-workers-server.test.ts tests/app/start-operator-server-metrics.test.ts`
  (132 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1489 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened ingest sweeper input validation:
  - `runIngestSweep` now rejects non-object direct input before claiming jobs,
    reading chunks, embedding, deleting old vectors, or upserting new vectors.
  - Sweeper dependencies, logger methods, optional tunables, and injected clock
    results are validated before repository calls.
  - Claimed ingest jobs must provide positive safe-integer job and memory record
    IDs, non-blank organization IDs, and non-negative safe-integer Qdrant
    attempt counts before per-job work starts.
  - Reindexable chunks and embedding vectors are validated before vector
    deletes or upserts.
  - Malformed chunk or embedding data stays in the existing per-job retry/fail
    path while avoiding vector side effects.
  - Existing empty sweep, success, no-chunk completion, retry, give-up, custom
    batch size, and idempotent re-upsert behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/compact/ingest-sweeper.test.ts` (49 passed)
- `npx vitest run tests/compact/ingest-sweeper.test.ts tests/compact/ingest-sweeper-loop.test.ts tests/store/canonical-indexing.test.ts tests/vector/point-builder.test.ts tests/app/background-workers.test.ts tests/app/start-background-workers-server.test.ts tests/app/start-operator-server-metrics.test.ts`
  (117 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1463 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened outbox sweeper input validation:
  - `runOutboxSweep` now rejects non-object direct input before reading tunables,
    claiming rows, or deleting Qdrant points.
  - Sweeper dependencies, logger methods, optional tunables, and injected clock
    results are validated before repository calls.
  - Claimed cleanup rows must provide positive safe-integer archive IDs,
    non-blank organization IDs, non-blank Qdrant point IDs, and non-negative
    safe-integer attempt counts before vector deletion or status updates.
  - Malformed direct input and malformed claimed rows are covered with
    no-side-effect assertions for claims, status updates, and vector deletes.
  - Existing empty sweep, clean, retry, give-up, and custom tunable behavior is
    preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/compact/outbox-sweeper.test.ts` (30 passed)
- `npx vitest run tests/compact/outbox-sweeper.test.ts tests/compact/sweeper-loop.test.ts tests/compact/apply-compaction.test.ts tests/app/background-workers.test.ts tests/app/start-background-workers-server.test.ts tests/app/start-operator-server-metrics.test.ts`
  (88 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1429 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened apply compaction input validation:
  - `applyCompaction` now rejects non-object direct input before generated run
    IDs, semantic embedding, rate-limit checks, archive repository calls, or
    Qdrant deletes.
  - The apply path now reuses compaction-plan input validation before semantic
    embedding can read record content.
  - Apply-specific validation covers organization ID, actor, semantic threshold,
    dependency shape, optional embedding client, optional rate-limit config,
    generated run IDs, and injected clock results.
  - Malformed direct calls are covered with no-side-effect assertions across
    generated IDs, embeddings, archive repository calls, and vector deletes.
  - Existing dry-run, apply, replay, rate-limit, duplicate/decay, semantic
    fallback, Qdrant-pending, and PG-failure behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/compact/apply-compaction.test.ts` (41 passed)
- `npx vitest run tests/compact/apply-compaction.test.ts tests/compact/compact-memory.test.ts tests/compact/semantic-duplicates.test.ts tests/compact/unarchive-compaction.test.ts tests/mcp/server.test.ts tests/app/server.test.ts`
  (323 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1405 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened unarchive compaction input validation:
  - `unarchiveCompaction` now rejects non-object direct inputs before reading
    archive IDs or starting restore work.
  - Archive IDs must be supplied as an array of positive safe integers.
  - Organization ID and actor must be non-blank strings.
  - Malformed direct input is covered with no-side-effect assertions across the
    archive repository, chunk repository, embedding client, and vector index.
  - Existing empty-input, skip, restore, batched embedding, compensation, and
    per-archive failure isolation behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/compact/unarchive-compaction.test.ts` (28 passed)
- `npx vitest run tests/compact/unarchive-compaction.test.ts tests/mcp/server.test.ts tests/app/server.test.ts`
  (226 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1378 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened compaction plan input validation:
  - `buildCompactionPlan` now rejects non-object direct inputs before duplicate,
    decay, semantic-group override, or promotion planning.
  - Plan records must provide positive safe-integer IDs, valid memory/source
    types, string content, string `createdAt`, and finite optional importance.
  - Scope, scope labels, dry-run flag, optional project key, decay parameters,
    injected dates, and semantic duplicate override groups are validated before
    result construction.
  - `shouldPromoteRecord` now rejects malformed direct records before source or
    content inspection.
  - Existing exact duplicate detection, decay defaults, semantic override use,
    promotion candidate selection, and summary output behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/compact/compact-memory.test.ts` (36 passed)
- `npx vitest run tests/compact/compact-memory.test.ts tests/compact/apply-compaction.test.ts tests/compact/detect-duplicates.test.ts tests/compact/decay-score.test.ts tests/mcp/server.test.ts`
  (228 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1363 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened semantic duplicate input validation:
  - `cosineSimilarity` now rejects non-array direct vector inputs before
    reading lengths.
  - `findSemanticDuplicates` now rejects non-array record collections,
    malformed records, non-positive/non-safe record IDs, and non-finite
    importance values before clustering.
  - Embeddings must be supplied through a map-like object, and explicit
    embedding values must be arrays of finite numbers.
  - Missing embeddings still skip records, but malformed embedding values now
    fail before semantic grouping.
  - Existing cosine scoring, default threshold, missing-embedding skip behavior,
    and highest-importance/lowest-id keep rule are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/compact/semantic-duplicates.test.ts` (20 passed)
- `npx vitest run tests/compact/semantic-duplicates.test.ts tests/compact/apply-compaction.test.ts tests/compact/compact-memory.test.ts tests/goal-run/find-repeat-attempts.test.ts`
  (66 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1337 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened OAuth protected-resource helper validation:
  - Bearer challenge builders now reject invalid direct config inputs before
    header formatting.
  - Challenge configs must provide object metadata, string metadata URL, and
    string `scopes_supported` entries.
  - Insufficient-scope challenges now reject non-string direct scope values
    before auth-param escaping.
  - Metadata URL construction now rejects non-string direct resource values
    before `URL` parsing.
  - Metadata path checks now return false for non-string direct inputs.
  - Existing metadata generation, well-known URL derivation, challenge
    formatting, and auth-param escaping behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/oauth-protected-resource.test.ts` (16 passed)
- `npx vitest run tests/app/oauth-protected-resource.test.ts tests/app/oauth-token-auth.test.ts tests/app/mcp-http.test.ts tests/app/server.test.ts`
  (120 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1334 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened MCP utility primitive validation:
  - `formatMemoryIdentifier` now rejects non-object records, blank scope
    fields, and non-positive/non-safe IDs before formatting.
  - `normalizeLimit` now rejects non-number direct limits before integer/range
    checks.
  - `toMemoryType` now rejects non-string direct kinds before supported-kind
    conversion.
  - `summarize` now rejects non-string direct content before slicing.
  - Existing identifier formatting, default limit, supported memory-kind
    conversion, and summary truncation behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/mcp/tool-utils.test.ts` (30 passed)
- `npx vitest run tests/mcp/tool-utils.test.ts tests/mcp/server.test.ts tests/mcp/resolve-org.test.ts`
  (178 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1331 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened user-scope resolver input validation:
  - `resolveUserScopeId` now rejects non-object direct inputs before reading
    explicit/default scope IDs, environment fallback, git config, or local OS
    username fallback.
  - Resolver input must include a non-blank string `cwd`.
  - Explicit and default user scope IDs must be strings when present; existing
    non-blank validation still applies before returning them.
  - Existing explicit/default precedence, environment trimming, git-email hash,
    and local username fallback behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/mcp/tool-utils.test.ts` (17 passed)
- `npx vitest run tests/mcp/tool-utils.test.ts tests/mcp/server.test.ts tests/mcp/resolve-org.test.ts`
  (165 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1318 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened ranking input validation:
  - `rankResults`, `newestUpdatedAtFor`, `rankCandidates`, and
    `scoreSearchResult` now reject invalid direct inputs before metadata
    scoring, timestamp tie-break sorting, or score fusion.
  - Ranked records must provide positive safe-integer IDs, valid project/user
    scope, valid memory type, string content, and valid source type before
    ranking weights are read.
  - Candidate score totals and optional score inputs must be finite numbers,
    and optional candidate source values must be valid.
  - Existing project/user ordering, metadata weights, recency scoring, vector
    and lexical score behavior, and canonical timestamp errors are preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/search/rank-results.test.ts` (22 passed)
- `npx vitest run tests/search/rank-results.test.ts tests/search/retrieve-memory.test.ts tests/search/lexical-score.test.ts tests/mcp/server.test.ts`
  (194 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1307 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened repeat-attempt input validation:
  - `findRepeatAttempts` now rejects non-object direct inputs before reading
    embeddings, prior failures, or threshold values.
  - Candidate embeddings and prior failure embeddings must be arrays of finite
    numbers, and prior embeddings must match the candidate dimensions before
    cosine scoring.
  - Prior failures must provide positive safe-integer iteration indexes and
    string attempts.
  - Thresholds must be finite numbers in `(0, 1]`; invalid numeric and
    non-numeric values now fail explicitly.
  - Existing default threshold, match filtering, and best-first score ordering
    behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/goal-run/find-repeat-attempts.test.ts` (22 passed)
- `npx vitest run tests/goal-run/find-repeat-attempts.test.ts tests/goal-run/goal-run-handlers.test.ts tests/mcp/server.test.ts`
  (177 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1297 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened retrieval input validation:
  - `retrieveMemory` now rejects non-object direct inputs before property
    access.
  - Direct retrieval inputs must provide a query-capable vector index,
    hydration-capable repository, non-empty finite vector, valid optional
    string fields, boolean legacy opt-in, non-blank project/user scope
    identifiers, and positive safe-integer limit.
  - Vector hits with missing, non-numeric, non-positive, fractional, or
    non-finite `memory_record_id` payloads are ignored before Postgres
    hydration or vector-score fusion.
  - Existing organization strictness, legacy anonymous opt-in behavior,
    lexical oversampling, ranking, and hybrid fusion behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/search/retrieve-memory.test.ts` (31 passed)
- `npx vitest run tests/search/retrieve-memory.test.ts tests/search/rank-results.test.ts tests/search/lexical-score.test.ts tests/mcp/server.test.ts`
  (184 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1280 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened context pack record input validation:
  - `buildContextPack` now rejects non-object direct inputs before reading
    `records`.
  - `records` must be an array, and each consumed record must be an object with
    a positive safe-integer `id`, valid project/user scope, string `scopeId`,
    valid memory type, and string content.
  - Consumed source metadata must be an object with a valid source type,
    string/null title, and optional string external ID.
  - Existing section grouping, caps, project-before-user rendering order,
    compact excerpts, and prompt-injection warning behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/context-pack/build-context-pack.test.ts` (23 passed)
- `npx vitest run tests/context-pack/build-context-pack.test.ts tests/goal-run/build-goal-context.test.ts tests/mcp/server.test.ts`
  (178 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1260 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened goal context pack input validation:
  - `buildGoalContextPack` now rejects non-object direct inputs before property
    reads.
  - `goalRun` must be an object with positive safe-integer `id`, string
    `goal` and `status`, non-negative safe-integer `iterationCount`, and
    string/null optional termination criteria.
  - `goalRun.iterations` must be an array, and each rendered iteration must
    have a positive safe-integer index, string attempt/outcome, and string/null
    summary/error fields.
  - `records` must be an array before delegating memory formatting to
    `buildContextPack`.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/goal-run/build-goal-context.test.ts` (24 passed)
- `npx vitest run tests/goal-run/build-goal-context.test.ts tests/goal-run/goal-run-handlers.test.ts tests/context-pack/build-context-pack.test.ts`
  (54 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1243 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened rate limiter input validation:
  - `createTokenBucketLimiter` now rejects non-object direct options before
    reading capacity or window fields.
  - Injected `now` values must be functions when provided.
  - `check(key)` now rejects non-string direct keys before bucket lookup.
  - Injected clocks must return finite numbers before refill math runs.
  - Existing capacity, window, refill, per-key isolation, and environment
    parsing behavior is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/rate-limit.test.ts` (27 passed)
- `npx vitest run tests/app/rate-limit.test.ts tests/app/server.test.ts tests/app/mcp-http.test.ts`
  (113 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1224 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened background queue metrics validation:
  - `collect(now)` now rejects non-Date and invalid `Date` values before
    timestamp serialization or database queries.
  - Missing count rows and null count values still map to zero gauges.
  - Non-finite count values now fail collection instead of being silently
    reported as zero.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/background-queue-metrics.test.ts` (6 passed)
- `npx vitest run tests/app/background-queue-metrics.test.ts tests/app/metrics.test.ts tests/app/server.test.ts tests/app/start-operator-server-metrics.test.ts`
  (89 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1213 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened HTTP metrics method validation:
  - `normalizeHttpMethod` now rejects non-string direct method values before
    uppercase normalization.
  - Known method strings still normalize to their uppercase labels.
  - Unknown method strings and missing methods still bucket as `OTHER`.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/app/metrics.test.ts` (15 passed)
- `npx vitest run tests/app/metrics.test.ts tests/app/server.test.ts tests/app/start-operator-server-metrics.test.ts`
  (83 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1209 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened vector point input validation:
  - `buildVectorPoint` now rejects non-object direct inputs before property
    reads.
  - `chunkId` and `memoryRecordId` must be positive safe integers before vector
    IDs or payload metadata are built.
  - Vectors must be non-empty arrays of finite numbers before upsert payloads
    are constructed.
  - Required payload fields must be strings; `projectKey`, `title`, and
    `summary` must be strings or null where applicable; tags must be string
    arrays.
  - Existing organization-id validation is preserved.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/vector/point-builder.test.ts` (25 passed)
- `npx vitest run tests/vector/point-builder.test.ts tests/vector/organization-id.test.ts tests/vector/qdrant-index.test.ts tests/store/canonical-indexing.test.ts tests/compact/ingest-sweeper.test.ts tests/compact/unarchive-compaction.test.ts`
  (108 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1203 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened secret scrubber input validation:
  - `scanForSecrets` now rejects non-string direct content before regex
    scanning.
  - `assertNoSecrets` uses the same guard before secret-detection error
    construction.
  - Existing detections still return categories only and do not include matched
    values.
  - Full-suite verification used a single worker because the default parallel
    suite is currently timing-sensitive in unrelated server startup and backup
    shell tests under load.

Verification:
- `npx vitest run tests/store/secret-scrub.test.ts` (35 passed)
- `npx vitest run tests/store/secret-scrub.test.ts tests/store/memory-repository.test.ts tests/store/canonical-indexing.test.ts tests/scripts/repo-secret-hygiene.test.ts`
  (141 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1181 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened exact duplicate input validation:
  - `findExactContentDuplicates` now rejects non-array inputs before iteration.
  - Each direct record must be an object with a positive safe-integer `id`,
    string `content`, and finite optional `importance`.
  - Invalid content is rejected before whitespace/case normalization.
  - Invalid ids or importance values are rejected before duplicate candidate
    sorting or compaction apply planning.
  - The apply-compaction invalid-id test now asserts the earlier
    plan-construction boundary while preserving the no-side-effects checks.
  - Default parallel `npm test` twice hit unrelated 5s timeout-sensitive tests
    in server startup and backup shell files; those files passed in isolation,
    and the single-worker full suite passed.

Verification:
- `npx vitest run tests/compact/detect-duplicates.test.ts` (26 passed)
- `npx vitest run tests/compact/detect-duplicates.test.ts tests/compact/compact-memory.test.ts tests/compact/apply-compaction.test.ts`
  (50 passed)
- `npx vitest run tests/app/start-background-workers-server.test.ts tests/app/start-operator-server-metrics.test.ts`
  (4 passed)
- `npx vitest run tests/scripts/backup-verify.test.ts` (60 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run --maxWorkers=1 --minWorkers=1` (1169 passed, 34 skipped
  across 70 files)
- `git diff --check`

- Hardened search-ranking timestamp validation:
  - Ranking now rejects non-canonical `updatedAt` timestamps before recency
    scoring or candidate tie-break sorting.
  - `buildRetrievedMemoryCandidate` and `newestUpdatedAtFor` derive recency
    anchors only from canonical ISO timestamps.
  - `scoreSearchResult` rejects non-finite `newestUpdatedAt` values before
    total-score calculation.
  - `newestUpdatedAtFor` now rejects empty input instead of returning
    `-Infinity`.

Verification:
- `npx vitest run tests/search/rank-results.test.ts tests/search/retrieve-memory.test.ts`
  (23 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1148 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened chunk-text input validation:
  - `chunkText` now rejects non-object inputs before property access.
  - Non-string `text` is rejected before `.matchAll()`.
  - `targetTokens` must be a positive safe integer, and `overlapTokens` must
    be a non-negative safe integer smaller than `targetTokens`.
  - Blank text still returns `[]` after valid settings; deterministic chunk
    offsets are preserved.
  - Review found no behavioral issues.

Verification:
- `npx vitest run tests/chunk/chunk-text.test.ts` (11 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1140 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened decay-score input validation:
  - `decayScore` now rejects non-finite importance, invalid `now`, invalid
    half-life values, and non-canonical `createdAt` timestamps before scoring.
  - `createdAt` must be a string that round-trips exactly through
    `Date#toISOString()`, so impossible dates and non-string direct values are
    rejected.
  - `findDecayCandidates` now rejects non-array records, non-function scoring
    callbacks, non-finite thresholds, and invalid `now` before scoring records.
  - Quality review found permissive `Date.parse` behavior for `createdAt`; a
    strict ISO round-trip parser and tests fixed it.

Verification:
- `npx vitest run tests/compact/decay-score.test.ts` (21 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1131 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened retry backoff attempt validation:
  - `nextRetryDelayMs` now rejects invalid attempt counts before exponential
    delay calculation.
  - Attempt counts must be non-negative safe integers.
  - Existing attempt `0`, doubling, and 5-minute cap behavior are preserved.
  - Review found no behavioral issues; the suggested unsafe-integer test case
    was added.

Verification:
- `npx vitest run tests/compact/ingest-sweeper.test.ts` (15 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1119 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened eval metric input validation:
  - `recallAtK` and `mrrAtK` now reject non-array direct inputs before metric
    calculation.
  - Retrieved and relevant IDs must be positive safe integers, matching the
    record-id contract.
  - `k` must be a positive integer before top-k slicing.
  - `recallAtK` now deduplicates retrieved IDs in the top-k window so duplicate
    retrievals cannot push recall above `1`.
  - Quality review found the duplicate-retrieved recall inflation bug and an
    ID-domain gap; both were fixed and covered.

Verification:
- `npx vitest run tests/eval/metrics.test.ts` (28 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1114 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened semantic duplicate numeric validation:
  - `findSemanticDuplicates` now rejects non-finite thresholds before
    clustering.
  - Present embedding vectors are validated before clustering, including
    singleton or first-record embeddings that would not otherwise be compared.
  - `cosineSimilarity` now rejects non-finite vector values with vector side,
    index, and value in the error.
  - Reviews found a silent singleton malformed-embedding gap and missing
    infinity threshold coverage; both were fixed and covered.

Verification:
- `npx vitest run tests/compact/semantic-duplicates.test.ts` (17 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npx vitest run tests/scripts/backup-verify.test.ts -t "rejects existing array manifests before mutation"`
  (1 passed after an initial full-suite timeout in that shell test)
- `npm test` rerun (1097 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened source-ref parser validation:
  - `parseStoredPostgresSourceRef` now rejects non-string direct values before
    JSON parsing, fallback logging, or metadata return.
  - Invalid JSON strings still fall back to raw source refs with a warning.
  - Valid JSON without `sourceRef`, including JSON primitives like `"null"`,
    now falls back silently to the raw string.
  - Reviews found missing no-log coverage and a JSON primitive warning edge;
    both were fixed and covered.

Verification:
- `npx vitest run tests/store/parse-source-ref.test.ts` (6 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1094 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened direct lexical/entity helper validation:
  - Exported lexical helpers now reject non-string direct query/value inputs
    before lowercasing, trimming, tokenization, or scoring.
  - `scoreLexicalMatch` now rejects malformed direct record inputs before
    reading scoring text fields.
  - Exported entity helpers now reject non-string direct text inputs before
    regex matching or entity overlap work.
  - Quality review found one malformed-record gap in `scoreLexicalMatch`; a
    scoped record/source/text-field guard and tests fixed it.

Verification:
- `npx vitest run tests/search/lexical-score.test.ts tests/entities/entity-extraction.test.ts`
  (15 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1092 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened service-config environment validation:
  - `resolveServiceConfig({ env })` now rejects non-string env values before
    `.trim()`, `.toLowerCase()`, integer parsing, or returning config fields.
  - Existing defaults, whitespace-only string errors, invalid enum strings,
    numeric string parsing, provider branches, and vector-backend branches are
    preserved.
  - Focused tests cover required, optional, provider-specific, inactive
    pgvector Qdrant, and fallback Postgres env values.
  - Spec and quality reviews found no behavioral issues; review noted
    non-number malformed values share the same guarded branch.

Verification:
- `npx vitest run tests/config/service-config.test.ts` (59 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1083 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened logger level validation:
  - `resolveLogLevel` now rejects non-string configured `LOG_LEVEL` values
    before calling `.toLowerCase()`.
  - Existing default, uppercase normalization, supported-level, and
    invalid-string behavior are preserved.
  - The invalid-value formatter safely reports non-string values including
    bigint, symbol, circular object, and non-finite number inputs.
  - Reviews found unsafe `JSON.stringify` and non-finite number reporting
    edges; both were fixed and covered.

Verification:
- `npx vitest run tests/logger.test.ts` (25 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1062 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened direct lifecycle init project-key validation:
  - `writeLifecycleInit` now rejects non-string `projectKey` values before
    calling `.trim()`.
  - Existing whitespace-only lifecycle project-key behavior and CLI parsing are
    unchanged.
  - Focused tests cover non-string and whitespace-only direct lifecycle inputs
    before `.akasha` files are written.
  - Spec and quality reviews found no issues.

Verification:
- `npx vitest run tests/cli.test.ts` (24 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1057 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened vector organization scope validation:
  - Vector organization ID guards now reject non-string values before calling
    `.trim()`.
  - Optional vector organization IDs still allow `undefined` and `""` for
    legacy unscoped mode while rejecting whitespace-only strings.
  - Helper tests cover required/optional validation, and Qdrant/pgvector tests
    cover non-string scoped delete-by-record IDs before backend calls.
  - Review found one pgvector coverage gap; a no-SQL regression test was added
    and follow-up review found no blocking issues.

Verification:
- `npx vitest run tests/vector/organization-id.test.ts tests/vector/qdrant-index.test.ts tests/vector/pgvector-index.integration.test.ts` (43 passed, 12 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1056 passed, 34 skipped across 70 files)
- `git diff --check`

- Hardened direct repository nullable text validation:
  - Repository title/summary normalization now rejects non-string non-null
    values before calling `.trim()`.
  - Existing `null`, whitespace-to-`null`, non-empty string, default summary,
    and secret scanning behavior are preserved.
  - Focused tests cover `addMemory` rejection before pool connection and
    `updateMemoryRecord` rejection after current-row read but before row update,
    with rollback/release.
  - Spec and quality reviews found no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (78 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1050 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened direct repository tag validation:
  - Repository tag normalization now rejects non-string tag entries before
    calling `.trim()`.
  - Existing whitespace-only tag behavior, deduplication, and sorted
    persistence are unchanged.
  - Focused tests cover `updateMemoryRecord` rejecting non-string tags before
    opening a transaction or pool connection.
  - Spec and quality reviews found no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (76 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1048 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened direct repository search query validation:
  - `createMemoryRepository().searchMemory` now rejects non-string `query`
    values before calling `.trim()`.
  - Blank string and whitespace-only queries still return `[]` without SQL.
  - Tests cover non-string direct queries before querying and preserve the
    blank-query fast return before limit validation.
  - Spec review found no issues; quality review found the blank-query/limit
    ordering gap, which was covered and re-reviewed cleanly.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (75 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1047 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened direct scope identifier validation:
  - `requireProjectKey` and `requireUserScopeId` now reject non-string values
    before calling `.trim()`, while preserving existing missing and whitespace
    string behavior.
  - Registry instrumentation validates provided `projectKey` and `userScopeId`
    before logging/audit metadata is emitted, so local scope validation failures
    do not trigger service-backed audit resolution.
  - Direct tests cover retrieval, `add_memory`, governance, goal-run, and
    service-backed audit pre-resolution paths.
  - Review found one service-backed audit edge; follow-up review confirmed the
    whitespace/non-string audit boundary is fixed.

Verification:
- `npx vitest run tests/mcp/server.test.ts tests/goal-run/goal-run-handlers.test.ts tests/mcp/tool-utils.test.ts` (161 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1040 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened shared non-blank text validation:
  - `assertNonBlankText` now rejects non-string values with a field-specific
    string validation error before calling `.trim()`.
  - Existing whitespace-only string behavior and messages are preserved.
  - Direct registry tests cover non-string `add_memory`/`update_memory`
    content and `update_memory`/`tag_memory` tag entries before canonical
    repository, embedding, or vector side effects.
  - Spec review and code-quality review found no issues.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (126 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1034 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened direct optional goal-run note validation:
  - Direct `start_goal_run.terminationCriteria`, `record_iteration.summary`,
    `record_iteration.error`, `complete_goal_run.resolution`, and
    `abandon_goal_run.reason` now reject configured non-string values before
    service dispatch.
  - `null`, `undefined`, and blank values still normalize to `null`; non-empty
    strings still pass through secret scanning and persistence.
  - Focused tests cover all five fields and assert no goal-run service calls.
  - Spec review and code-quality review found no issues.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts` (23 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1032 passed, 34 skipped across 69 files)
- `git diff --check`

## 2026-06-27

- Read project rules, README, contributing guide, architecture/config docs,
  docs index, package scripts, CI, and test layout.
- Confirmed no repo-local `CLAUDE.md` or `.agents/skills/` directory exists.
- Implemented goal-run hardening and documentation refresh in the active branch.
- Added sweeper metrics for compaction and ingest loops.
- Added `/metrics` background queue backlog gauges and partial indexes to avoid
  historical-row scans.
- Added dedicated background worker lifecycle:
  - `src/app/background-workers.ts`
  - `src/app/worker.ts`
  - `npm run dev:worker`
  - `npm run start:worker`
- Fixed review findings:
  - HTTP executable shutdown now awaits worker/probe cleanup via
    `closeOperatorServer()`.
  - Worker startup now happens only after HTTP bind succeeds.
  - Listen failure cleans the probe pool and does not start workers.
- Focused worker tests passed:
  `npm test -- tests/app/background-workers.test.ts tests/app/start-background-workers-server.test.ts tests/app/worker.test.ts tests/app/start-operator-server-metrics.test.ts`.
- Web/GitHub research:
  - Node HTTP docs confirmed `server.close()` handles HTTP close, while
    Akasha-owned worker/pool cleanup needs an app wrapper:
    https://nodejs.org/api/http.html#serverclosecallback
  - Redis `agent-memory-server` uses separate production API and background
    worker processes, matching the dedicated worker topology:
    https://github.com/redis/agent-memory-server
  - Node release data shows Node 20 is EOL as of 2026-04-30; added a backlog
    item to move runtime/CI support to active LTS lines:
    https://github.com/nodejs/release#release-schedule

Next:
- Commit locally.

Verification:
- `npm test -- tests/app/background-workers.test.ts tests/app/start-background-workers-server.test.ts tests/app/worker.test.ts tests/app/start-operator-server-metrics.test.ts`
- `npm test -- tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`62` files passed, `2` skipped; `605` tests passed, `34` skipped)
- `git diff --check`

## 2026-06-29

- Hardened direct numeric array input validation:
  - Direct `record_iteration` registry calls now reject configured non-array
    `memoryIds` before canonical service resolution.
  - `memoryIds: undefined` still preserves the existing no-memory-links
    behavior, and arrays still validate entries as positive safe integers.
  - The shared positive-integer array guard also keeps `unarchive_memory`
    archive-id handling compatible with its existing array check.
  - Spec review and code-quality review found no issues.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts tests/mcp/server.test.ts` (146 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1031 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened direct governance tag input validation:
  - Direct `update_memory` and `tag_memory` registry calls now reject configured
    non-array `tags` before canonical service resolution.
  - `tags: undefined` still preserves the existing no-tag-update behavior for
    `update_memory`, and arrays still validate entries for non-whitespace text.
  - Focused tests cover string `tags` on both direct paths and assert no
    repository, chunk, embedding, or vector work occurs.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (124 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1031 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened MCP Streamable HTTP Host validation:
  - `/mcp` now validates Host headers for loopback-bound operator servers before
    auth, rate limiting, or MCP transport work.
  - The allowed loopback hostnames are `localhost`, `127.0.0.1`, and `[::1]`,
    parsed port-agnostically to match the installed MCP SDK DNS-rebinding
    guidance.
  - Non-loopback deployments keep the previous behavior so reverse-proxy and
    public bind setups are not changed without explicit allowed-host config.
  - English/Korean security docs now describe Host and Origin validation for
    `/mcp`.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/app/mcp-http.test.ts tests/scripts/public-docs-drift.test.ts` (41 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1030 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened backup/restore manifest shape parsing:
  - `scripts/backup-encryption.ts` and `scripts/restore-smoke.ts` now reject
    JSON manifests that parse to `null` or arrays with
    `backup manifest must be a JSON object`.
  - Backup encryption rejects those manifests before random bytes, artifact
    encryption, encrypted artifact creation, or manifest mutation work.
  - Restore smoke rejects those manifests before per-field manifest parsing.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/scripts/backup-encryption.test.ts tests/scripts/restore-smoke.test.ts` (76 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1026 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened backup plaintext retention flag parsing:
  - `BACKUP_ENCRYPTION_KEEP_PLAINTEXT` now accepts only trimmed,
    case-insensitive `true` or `false` values when configured.
  - Unset still defaults to `false`, so plaintext artifacts are removed after
    encrypted artifacts and manifest checksums are written.
  - Invalid values such as empty, whitespace-only, `yes`, `1`, `0`, and
    `maybe` fail before encryption work starts.
  - English/Korean configuration docs state the accepted values and
    fail-closed behavior.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/scripts/backup-encryption.test.ts tests/scripts/public-docs-drift.test.ts` (51 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1022 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened backup target host shell handling:
  - `scripts/backup-postgres.sh`, `scripts/snapshot-qdrant.sh`, and
    `scripts/create-backup.sh` now reject whitespace-only
    `BACKUP_TARGET_HOST` values before any SSH/SCP work.
  - Unset and exact empty `BACKUP_TARGET_HOST` still keep backup creation
    local-only.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (60 passed)
- `sh -n scripts/backup-postgres.sh && sh -n scripts/snapshot-qdrant.sh && sh -n scripts/create-backup.sh`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1011 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened service config backup environment handling:
  - `resolveServiceConfig()` now rejects whitespace-only `BACKUP_DIR`,
    `BACKUP_TARGET_HOST`, and `BACKUP_ENCRYPTION_KEY_FILE` values before
    returning runtime backup config.
  - Unset `BACKUP_DIR` still uses the existing local backup directory default,
    and exact empty `BACKUP_TARGET_HOST` still resolves as local-only.
  - Exact empty `BACKUP_ENCRYPTION_KEY_FILE` remains invalid, matching the
    backup shell entrypoints' configured-key-file behavior.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/config/service-config.test.ts` (38 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1006 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened required backup shell env guards:
  - `scripts/backup-postgres.sh`, `scripts/snapshot-qdrant.sh`, and
    `scripts/create-backup.sh` now reject unset, empty, and whitespace-only
    required env values before filesystem, database, curl, SSH, or scp work.
  - `create-backup.sh` validates `BACKUP_DIR` before invoking child backup
    scripts.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (55 passed)
- `sh -n scripts/backup-postgres.sh && sh -n scripts/snapshot-qdrant.sh && sh -n scripts/create-backup.sh`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (1000 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened bearer token comma-separated config parsing:
  - `MEMORY_API_TOKENS` now rejects leading commas, trailing commas, repeated
    commas, whitespace-only whole values, and whitespace-only list entries
    instead of silently dropping blank entries.
  - Unset and exact whole-empty values still disable static auth for documented
    loopback local development.
  - `.env.example`, `docs/configuration.md`, and `docs/configuration.ko.md`
    document the blank-entry rejection.
  - Worker implementation passed spec review; code-quality review found one
    missing whitespace-only test, which was fixed and re-reviewed cleanly.

Verification:
- `npx vitest run tests/app/bearer-auth.test.ts tests/scripts/public-docs-drift.test.ts` (52 passed)
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (22 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (991 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened OAuth comma-separated config parsing:
  - `MCP_OAUTH_AUTHORIZATION_SERVERS`, `MCP_OAUTH_SCOPES`,
    `MCP_OAUTH_JWKS_URLS`, and `MCP_OAUTH_JWT_ALGORITHMS` now reject explicit
    blank entries instead of silently filtering them out.
  - Unset values still preserve existing disabled/default behavior.
  - `.env.example`, `docs/configuration.md`, and `docs/configuration.ko.md`
    document the blank-entry rejection.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/app/oauth-protected-resource.test.ts tests/app/oauth-token-auth.test.ts` (31 passed)
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (22 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (986 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened Qdrant snapshot response parsing:
  - `scripts/snapshot-qdrant.sh` now rejects missing, non-string, empty, and
    whitespace-only snapshot names before constructing the snapshot download
    URL.
  - Valid string snapshot names are preserved unchanged.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (46 passed)
- `sh -n scripts/snapshot-qdrant.sh`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (983 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened backup manifest writer parsing:
  - `scripts/backup-postgres.sh`, `scripts/snapshot-qdrant.sh`, and
    `scripts/create-backup.sh` now reject existing manifest files that parse to
    `null`, arrays, or other non-object JSON before mutation.
  - Missing manifest files still start from `{}`.
  - Worker implementation passed spec review and code-quality review with no
    findings.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (39 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (976 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened encrypted off-box backup copy manifest parsing:
  - `scripts/create-backup.sh` now validates manifest artifact filenames before
    building the encrypted off-box `scp` list.
  - Qdrant artifact names are required whenever a Qdrant manifest block is
    present or the backend is not `pgvector`.
  - Worker implementation passed spec review and code-quality re-review after
    fixing Qdrant fail-closed consistency gaps.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (37 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (974 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened backup-encryption manifest metadata parsing:
  - Backup encryption now validates manifest metadata before idempotent returns
    or artifact encryption work.
  - Qdrant metadata is required unless the manifest explicitly uses `pgvector`,
    and invalid vector backend values are rejected early.
  - Worker implementation passed spec review and code-quality re-review after
    fixing Qdrant-default and vector-backend consistency gaps.

Verification:
- `npx vitest run tests/scripts/backup-encryption.test.ts` (18 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (971 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened restore-smoke manifest metadata parsing:
  - Restore smoke now rejects whitespace-only manifest artifact metadata before
    restore path construction.
  - Unsupported manifest vector backend values are rejected explicitly.

Verification:
- `npx vitest run tests/scripts/restore-smoke.test.ts` (43 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (958 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened backup manifest metadata parsing:
  - Backup verification now rejects whitespace-only required manifest metadata
    before local or remote artifact checks.
  - Optional Qdrant metadata on pgvector manifests is preserved and verified
    when present.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (34 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (950 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened retrieval eval threshold env parsing:
  - `EVAL_RECALL_THRESHOLD` and `EVAL_MRR_THRESHOLD` now use a strict parser
    instead of raw `Number(...)`.
  - Provided thresholds must be decimal values from `0` to `1`, so whitespace
    no longer silently lowers thresholds to zero and invalid text cannot become
    `NaN`.

Verification:
- `npx vitest run tests/eval/env.test.ts tests/eval/metrics.test.ts tests/eval/fixtures.test.ts tests/eval/retrieval.eval.test.ts` (27 passed, 1 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (944 passed, 34 skipped across 69 files)
- `git diff --check`

- Hardened retrieval limit contract:
  - `search_memory` and `build_context_pack` now reject limits above the
    effective `100` cap instead of silently reducing them.
  - Shared tool schemas, HTTP validation, MCP resource URLs, and the
    `akasha_session_start` prompt now enforce the same maximum.
  - Reviewer subagent caught resource and prompt boundary drift; both were fixed
    and re-review found no issues.

Verification:
- `npx vitest run tests/mcp/server.test.ts tests/app/server.test.ts` (190 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (931 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened direct audit-log limits:
  - Direct `listByOrganization()` audit repository calls now reject invalid
    numeric limits before SQL instead of defaulting, flooring, or clamping them.
  - Omitted limits still default to `100`, and valid boundary limits `1` and
    `1000` pass through unchanged.
  - Reviewer subagent caught missing positive/default coverage; added tests for
    omitted/min/max limits and re-review found no issues.

Verification:
- `npx vitest run tests/audit/audit-truncation.test.ts tests/audit/audit-write.test.ts tests/mcp/server.test.ts` (139 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (927 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened direct repository numeric limits:
  - Direct `searchMemory`, `listMemory`, `listMemoryForGovernance`, and
    `inspectMemoryGraph` calls now reject invalid limits before SQL instead of
    defaulting, flooring, or clamping them.
  - Omitted limits still use existing defaults.
  - `retrieveMemory` now caps lexical oversampling before calling repository
    search, preserving valid public/API limits above 25.
  - Reviewer subagent caught the public-limit regression; added coverage for
    `limit: 26` and re-review found no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts tests/search/retrieve-memory.test.ts tests/mcp/server.test.ts tests/app/server.test.ts` (265 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (919 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened direct repository tag updates:
  - Direct `updateMemoryRecord({ tags })` calls now reject whitespace-only tag
    entries before opening a transaction instead of silently dropping them.
  - Empty tag arrays still clear tags, and valid tags are still trimmed,
    deduplicated, and sorted.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts tests/mcp/server.test.ts` (168 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (898 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened optional OAuth text environment handling:
  - `MCP_OAUTH_RESOURCE_NAME`, `MCP_OAUTH_RESOURCE_DOCUMENTATION_URL`,
    `MCP_OAUTH_ORGANIZATION_CLAIM`, and `MCP_OAUTH_JWT_TYPE` now reject
    explicit whitespace-only values before protected-resource metadata or JWT
    verifier config construction.
  - Unset values still preserve omission/default behavior, and configured
    nonblank values are trimmed before use.
  - Configuration docs and `.env.example` now state that optional OAuth text
    settings must contain non-whitespace text when set.
  - Reviewer subagent caught missing trim-preservation coverage; updated the
    happy-path tests with whitespace-surrounded values and re-review found no
    issues.

Verification:
- `npx vitest run tests/app/oauth-protected-resource.test.ts tests/app/oauth-token-auth.test.ts tests/scripts/public-docs-drift.test.ts` (50 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (897 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened direct memory graph query filtering:
  - Direct `inspectMemoryGraph()` repository calls now reject whitespace-only
    query filters before SQL work instead of widening to an unfiltered graph
    read.
  - Existing API/MCP validation and nonblank direct query behavior are
    preserved.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts tests/mcp/server.test.ts tests/app/server.test.ts` (233 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (893 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened `DEVELOPER_MEMORY_USER_ID` handling:
  - Explicit empty or whitespace-only values now fail before user-scope fallback
    resolution instead of silently deriving from git/OS identity.
  - Unset values still derive from `git config user.email`, then OS username,
    and configured nonblank values are trimmed before use.
  - Configuration docs and `.env.example` now state that configured values must
    contain non-whitespace text.
  - Reviewer subagent caught missing unset fallback coverage and `.env.example`
    drift; added a deterministic temp-git-repo fallback test and re-review found
    no issues.

Verification:
- `npx vitest run tests/mcp/tool-utils.test.ts tests/scripts/public-docs-drift.test.ts` (28 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (892 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened backup encryption key-file handling:
  - `BACKUP_ENCRYPTION_KEY_FILE` now rejects explicit empty or whitespace-only
    values in `loadBackupEncryptionKeyFromEnv()` and the backup shell
    entrypoints before backup artifact or remote-copy work.
  - Unset values still disable backup encryption; configured nonblank paths are
    trimmed before key-file reads.
  - Configuration docs now state that configured key-file values must contain
    non-whitespace text.
  - Reviewer subagent caught a missing positive shell encryption test; added a
    `create-backup.sh` `sh -eu` case that writes a real 32-byte key, verifies
    the encrypted manifest, checks the `.enc` artifact, and confirms plaintext
    removal. Re-review found no issues.

Verification:
- `npx vitest run tests/scripts/backup-encryption.test.ts tests/scripts/backup-verify.test.ts tests/scripts/public-docs-drift.test.ts` (55 passed)
- `sh -n scripts/create-backup.sh && sh -n scripts/backup-postgres.sh && sh -n scripts/snapshot-qdrant.sh`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (889 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened optional restore-smoke user/org environment handling:
  - `RESTORE_SMOKE_USER_SCOPE_ID` and `RESTORE_SMOKE_ORGANIZATION_ID` now
    reject whitespace-only values before Docker or registry work.
  - Unset optional values are still omitted, and configured nonblank values are
    trimmed before use.
  - Configuration docs now state that configured values must contain
    non-whitespace text.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/scripts/restore-smoke.test.ts tests/scripts/public-docs-drift.test.ts` (57 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (880 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened restore-smoke text environment handling:
  - `RESTORE_SMOKE_PROJECT`, `RESTORE_SMOKE_PROJECT_KEY`,
    `RESTORE_SMOKE_SEARCH_QUERY`, and `RESTORE_SMOKE_PACK_TASK` now reject
    whitespace-only values before Docker or registry work.
  - Unset values still use the existing defaults, and configured nonblank values
    are preserved.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/scripts/restore-smoke.test.ts tests/scripts/public-docs-drift.test.ts` (53 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (876 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened restore-smoke app port handling:
  - `resolveRestoreAppPort()` now validates `RESTORE_APP_PORT` before Docker
    startup and health checks.
  - Unset values still default to `18787`; configured values must be plain
    decimal integers in `1..65535`.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/scripts/restore-smoke.test.ts tests/scripts/public-docs-drift.test.ts` (47 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (870 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened Qdrant snapshot collection-name handling:
  - `snapshot-qdrant.sh` now rejects empty or whitespace-only
    `QDRANT_COLLECTION_NAME` values before metadata or curl snapshot work.
  - Unset collection names still default to `memory_chunks_v1`, and valid
    collection names are preserved.
  - Executable tests log curl/SSH/SCP calls and verify invalid collection names
    do no snapshot or remote work.
  - Reviewer subagent found no implementation issues and caught a missing
    curl-log assertion; fixed before final verification.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (22 passed)
- `sh -n scripts/snapshot-qdrant.sh`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (859 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened backup shell-script target directory handling:
  - `backup-postgres.sh`, `snapshot-qdrant.sh`, and `create-backup.sh` now
    reject whitespace-only `BACKUP_TARGET_DIR` values before remote SSH/SCP
    work.
  - Unset `BACKUP_TARGET_DIR` still falls back to `BACKUP_DIR`, and valid
    configured paths are preserved.
  - Executable tests run the shell scripts under `sh` with stubbed `pg_dump`,
    `gzip`, `sha256sum`, `curl`, `ssh`, and `scp`.
  - Reviewer subagent first caught string-only test coverage, then caught
    inherited env leakage in the shell harness; both were fixed before final
    verification.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts` (18 passed)
- `BACKUP_TARGET_DIR=/inherited-target npx vitest run tests/scripts/backup-verify.test.ts` (18 passed)
- `BACKUP_ENCRYPTION_KEY_FILE=/tmp/inherited-key npx vitest run tests/scripts/backup-verify.test.ts` (18 passed)
- `sh -n scripts/create-backup.sh && sh -n scripts/backup-postgres.sh && sh -n scripts/snapshot-qdrant.sh`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (855 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened backup verification target directory resolution:
  - `backup:verify` now rejects whitespace-only `BACKUP_TARGET_DIR` values
    before remote path construction.
  - Unset `BACKUP_TARGET_DIR` still falls back to `BACKUP_DIR`, and valid
    configured remote paths are returned unchanged.
  - Reviewer subagent found no issue and noted the remaining shell-script
    follow-up for `backup:create` path expansion.

Verification:
- `npx vitest run tests/scripts/backup-verify.test.ts tests/scripts/public-docs-drift.test.ts` (29 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (844 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened MCP stdio cwd resolution:
  - `resolveStdioCwd()` now rejects whitespace-only `DMO_CWD` values before
    stdio server startup.
  - Valid configured paths are returned unchanged so paths with spaces keep
    working.
  - Fallback `process.cwd()` lookup remains lazy when `DMO_CWD` is configured.
  - Reviewer subagent caught the initial eager fallback regression; fixed before
    final verification.

Verification:
- `npx vitest run tests/mcp/stdio-cwd.test.ts tests/scripts/public-docs-drift.test.ts` (26 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (841 passed, 34 skipped across 68 files)
- `git diff --check`

- Hardened restore-smoke Qdrant collection resolution:
  - Explicit whitespace-only manifest `qdrant.collectionName` and
    `QDRANT_COLLECTION_NAME` values now fail instead of falling back to another
    collection name.
  - Omitted collection metadata still falls back to env/default for old
    manifests.
  - Pgvector mode remains unaffected and now has explicit regression coverage.
  - Reviewer subagent found no issue and noted the pgvector test gap, which was
    covered before final verification.

Verification:
- `npx vitest run tests/scripts/restore-smoke.test.ts` (14 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (837 passed, 34 skipped across 67 files)
- `git diff --check`

- Hardened restore-smoke tool input construction:
  - `buildRestoreSmokeToolInput()` now rejects whitespace-only `projectKey`,
    `userScopeId`, and `organizationId` values before search/context-pack
    registry dispatch.
  - Undefined optional fields are still omitted for legacy restore-smoke mode.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/scripts/restore-smoke.test.ts` (11 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (834 passed, 34 skipped across 67 files)
- `git diff --check`

- Hardened logger environment validation:
  - `resolveLogLevel()` now validates `LOG_LEVEL` before Pino initialization
    and returns the existing defaults: `info` in production, `debug` otherwise.
  - Supported levels are explicit: `trace`, `debug`, `info`, `warn`, `error`,
    `fatal`, and `silent`.
  - Whitespace-only and unsupported values fail with an Akasha-owned error.
  - Case-insensitive inputs such as `INFO` and `DEBUG` normalize to lowercase
    so existing deployments keep working.
  - Reviewer subagent caught the uppercase compatibility risk; fixed before
    final verification.

Verification:
- `npx vitest run tests/logger.test.ts tests/scripts/public-docs-drift.test.ts` (42 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (831 passed, 34 skipped across 67 files)
- `git diff --check`

- Hardened optional service configuration identifiers:
  - `resolveServiceConfig()` now rejects whitespace-only
    `OPENAI_EMBEDDING_MODEL`, `TRANSFORMERS_EMBEDDING_MODEL`,
    `EMBEDDING_MODEL`, and `QDRANT_COLLECTION_NAME` values.
  - Unset optional values still use their existing defaults.
  - `QDRANT_COLLECTION_NAME` validation also applies in pgvector mode so a
    configured blank identifier cannot persist into service metadata.
  - Reviewer subagent attempt timed out and was closed with no findings
    returned.

Verification:
- `npx vitest run tests/config/service-config.test.ts tests/scripts/public-docs-drift.test.ts` (54 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (811 passed, 34 skipped across 66 files)
- `git diff --check`

- Hardened OAuth verifier numeric env parsing:
  - `MCP_OAUTH_JWT_CLOCK_TOLERANCE_SECONDS` and
    `MCP_OAUTH_JWKS_TIMEOUT_MS` now require plain decimal integer strings
    instead of accepting JavaScript coercions such as whitespace, decimals, or
    exponent notation.
  - `MCP_OAUTH_JWKS_TIMEOUT_MS` now rejects `0` and values above
    `2_147_483_647`, matching Node timer bounds used by the JWKS resolver.
  - Reviewer subagent caught the missing timeout upper bound; fixed before
    final verification.

Verification:
- `npx vitest run tests/app/oauth-token-auth.test.ts` (14 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (806 passed, 34 skipped across 66 files)
- `git diff --check`

- Hardened user-scope resolution:
  - `resolveUserScopeId()` now rejects whitespace-only explicit and default
    user scope IDs instead of returning them to internal callers.
  - New focused coverage verifies explicit/default rejection and preserves the
    trimmed `DEVELOPER_MEMORY_USER_ID` environment fallback.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/mcp/tool-utils.test.ts tests/mcp/server.test.ts tests/goal-run/goal-run-handlers.test.ts` (145 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (805 passed, 34 skipped across 66 files)
- `git diff --check`

- Hardened CLI semantic flag parsing:
  - `pack`, `reindex`, `remember`, and `init` now reject whitespace-only
    project, task, user scope, kind, content, content-file, and out-dir flag
    values during parsing.
  - `--content` still allows leading dashes for summaries that begin with
    command-like text.
  - Coverage verifies parse-time failures, no registry dispatch for blank
    content, and no filesystem reads for blank content-file paths.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/cli.test.ts` (23 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (802 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened direct lifecycle init path inputs:
  - `writeLifecycleInit()` now rejects whitespace-only `repoDir` and optional
    `outDir` values before resolving paths or writing generated files.
  - CLI coverage verifies blank `--out-dir` fails before file writes.
  - Direct coverage verifies whitespace-only `repoDir` and `outDir` fail and
    leave the temp repo empty.
  - Reviewer subagent caught weak no-write assertions; tests now assert the
    temp repo stays empty for invalid lifecycle inputs.

Verification:
- `npx vitest run tests/cli.test.ts` (21 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (800 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened direct lifecycle initialization:
  - `writeLifecycleInit()` now rejects whitespace-only optional
    `organizationId`, `userScopeId`, and `task` values before creating the
    output directory or generated hook/config files.
  - CLI blank `--organization-id` behavior remains covered; new coverage
    verifies direct function callers cannot bypass the guard.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/cli.test.ts` (20 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (799 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened HTTP organization ID resolution:
  - Memory HTTP routes now reject explicitly blank body `organizationId` values
    before dispatch instead of silently treating them as absent.
  - Blank `x-organization-id` headers and duplicate raw `x-organization-id`
    headers now fail before registry dispatch.
  - Existing valid precedence remains unchanged: token-bound org, then single
    header org, then body org; truly absent org values remain legacy-compatible.
  - Resolver coverage now models blank body/header values, repeated normalized
    header arrays, and Node's comma-joined duplicate-header behavior via
    `rawHeaders`.
  - HTTP integration coverage sends duplicate raw headers over a socket to
    exercise Node's real request parser behavior.
  - Reviewer subagent caught the initial duplicate raw-header gap; fixed with
    `rawHeaders` counting and raw HTTP coverage.

Verification:
- `npx vitest run tests/mcp/resolve-org.test.ts tests/app/server.test.ts` (83 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (798 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened migration database environment validation:
  - Migration database URL resolution now rejects whitespace-only `DATABASE_URL`
    and `POSTGRES_*` values.
  - Migration coverage verifies explicit database URLs, default fallback
    behavior, and invalid whitespace env values without requiring live
    Postgres.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/db/migrate.test.ts tests/config/service-config.test.ts` (36 passed, 8 skipped)
- `npx vitest run tests/db/migrate.test.ts tests/config/service-config.test.ts tests/scripts/repo-secret-hygiene.test.ts` (38 passed, 8 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (794 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened required service environment validation:
  - Required service environment variables now reject whitespace-only values.
  - Config coverage verifies direct required values and fallback Postgres env
    values fail before config construction.
  - Reviewer subagent found no issues; added fallback Postgres regressions for
    residual coverage.

Verification:
- `npx vitest run tests/config/service-config.test.ts tests/app/server.test.ts tests/health/check-dependencies.test.ts` (101 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (786 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened OAuth organization claim validation:
  - Present blank or non-string organization claims now reject the token instead
    of silently becoming unbound.
  - OAuth verifier coverage verifies absent organization claims remain unbound
    while malformed present claims reject the JWT.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/app/oauth-token-auth.test.ts tests/app/bearer-auth.test.ts tests/app/mcp-http.test.ts` (53 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (779 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened CLI organization flag validation:
  - `--organization-id` now rejects whitespace-only values before registry
    dispatch or lifecycle file writes.
  - CLI coverage verifies parse rejection, no registry dispatch, and no
    lifecycle output directory creation for invalid organization IDs.
  - Reviewer subagent found no issues; added an init no-write regression for
    residual coverage.

Verification:
- `npx vitest run tests/cli.test.ts` (19 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (776 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened vector upsert point organization validation:
  - Qdrant and pgvector adapters now reject missing, non-string, or
    whitespace-only `payload.organization_id` values before backend upsert
    calls.
  - Vector coverage verifies invalid upsert point organization payloads fail
    before Qdrant or pgvector work.
  - Reviewer subagent found no issues; added missing/non-string regressions for
    residual coverage.

Verification:
- `npx vitest run tests/vector/qdrant-index.test.ts tests/vector/pgvector-index.integration.test.ts tests/vector/point-builder.test.ts` (40 passed, 12 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (773 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened unarchive-compaction organization validation:
  - `unarchiveCompaction` now rejects whitespace-only organization IDs before
    archive lookup, restore, chunking, embedding, vector writes, or mark
    updates.
  - Unarchive-compaction coverage verifies invalid organization IDs fail before
    those side effects.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/compact/unarchive-compaction.test.ts tests/compact/apply-compaction.test.ts tests/compact/ingest-sweeper.test.ts tests/compact/outbox-sweeper.test.ts` (43 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (769 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened apply-compaction organization validation:
  - `applyCompaction` now rejects whitespace-only organization IDs before run ID
    generation, semantic embedding, rate-limit checks, archive writes, or vector
    deletes.
  - Apply-compaction coverage verifies invalid organization IDs fail before
    those side effects.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/compact/apply-compaction.test.ts tests/compact/compact-memory.test.ts tests/compact/semantic-duplicates.test.ts tests/compact/decay-score.test.ts` (47 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (768 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened goal-run repository organization validation:
  - Repository entry points now reject whitespace-only organization IDs before
    SQL queries or transaction opens.
  - Goal-run repository coverage verifies invalid organization IDs fail before
    `pool.query()` or `pool.connect()`.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/goal-run/goal-run-repository.test.ts tests/goal-run/goal-run-handlers.test.ts tests/goal-run/build-goal-context.test.ts tests/goal-run/find-repeat-attempts.test.ts` (44 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (767 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened vector point organization validation:
  - `buildVectorPoint` now rejects whitespace-only required organization IDs
    before producing vector payload metadata.
  - Point-builder coverage verifies invalid organization IDs fail immediately.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/vector/point-builder.test.ts tests/vector/qdrant-index.test.ts tests/vector/pgvector-index.integration.test.ts` (36 passed, 12 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (762 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened vector adapter organization filters:
  - Qdrant and pgvector adapters now reject whitespace-only optional
    organization filters before backend query/delete work.
  - Vector coverage verifies invalid organization filters fail before backend
    calls.
  - Exact empty-string legacy behavior is pinned for query and delete paths.
  - Reviewer subagent found a compatibility coverage gap; added the
    exact-empty-string regressions in response.

Verification:
- `npx vitest run tests/vector/qdrant-index.test.ts tests/vector/pgvector-index.integration.test.ts` (33 passed, 12 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (761 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened ingest job creation organization validation:
  - `create` now rejects whitespace-only organization IDs before inserting
    ingest job rows.
  - Ingest job coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/jobs/ingest-job-claim.test.ts tests/jobs/serialize-error.test.ts` (7 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (750 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened audit repository organization validation:
  - `record` and `listByOrganization` now reject whitespace-only organization
    IDs before writing or reading audit rows.
  - Audit repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer subagent found no issues.

Verification:
- `npx vitest run tests/audit/audit-truncation.test.ts tests/audit/audit-write.test.ts` (11 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (749 passed, 34 skipped across 65 files)
- `git diff --check`

## 2026-06-28

- Hardened canonical reindex organization validation:
  - `reindexCanonicalMemory` now rejects whitespace-only organization IDs
    before chunk listing, embedding, or vector work.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    indexing side effects.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (26 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (747 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened canonical write-path organization validation:
  - `writeCanonicalMemory` now rejects whitespace-only returned record
    organization IDs before ingest job creation or indexing side effects.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    ingest and indexing work.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (25 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (746 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened canonical refresh organization validation:
  - `refreshCanonicalMemoryIndex` now rejects whitespace-only record
    organization IDs before embedding, chunk replacement, or vector work.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    indexing side effects.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (24 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (745 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened canonical chunk replacement organization validation:
  - `replaceChunksForRecord` and `replaceChunksForRecordWithPendingIngest` now
    reject whitespace-only record organization IDs before opening transactions.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    `pool.connect()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (23 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (744 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened canonical chunk insert organization validation:
  - `insertChunks` now rejects whitespace-only record organization IDs before
    inserting canonical chunks.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (21 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (742 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened context-pack run organization validation:
  - `createContextPackRun` now rejects whitespace-only organization IDs before
    inserting context-pack run rows.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (20 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (741 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened canonical chunk list organization validation:
  - `listChunks` now rejects whitespace-only organization IDs before listing
    canonical chunks.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (19 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (740 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened canonical chunk delete organization validation:
  - `deleteChunksForRecord` now rejects whitespace-only organization IDs before
    deleting canonical chunks.
  - Canonical indexing coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/canonical-indexing.test.ts` (18 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (739 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened compaction run scope validation:
  - `createCompactionRun` now rejects whitespace-only scope type and scope ID
    values before inserting compaction run rows.
  - Archive repository coverage verifies invalid compaction run scope inputs
    fail before `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (33 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (738 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened scope-lock key validation:
  - `acquireScopeLock` now rejects whitespace-only scope type and scope ID
    values before advisory lock queries.
  - Archive repository coverage verifies invalid scope-lock key inputs fail
    before `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (31 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (736 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened scope-lock organization validation:
  - `acquireScopeLock` now rejects whitespace-only organization IDs before
    advisory lock queries.
  - Archive repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (29 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (734 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened recent apply-count organization validation:
  - `countRecentApplyRuns` now rejects whitespace-only organization IDs before
    rate-limit count queries.
  - Archive repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (28 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (733 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened restored-record cleanup organization validation:
  - `deleteRestoredCanonicalRecord` now rejects whitespace-only organization
    IDs before cleanup deletes.
  - Archive repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (27 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (732 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened archive restore organization validation:
  - `restoreToCanonical` now rejects whitespace-only organization IDs before
    restoring archived rows into canonical memory.
  - Archive repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (26 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (731 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened archive lookup organization validation:
  - `findArchiveByIds` now rejects whitespace-only organization IDs before
    archive lookup.
  - Archive repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (25 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (730 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened archive run creation organization validation:
  - `createCompactionRun` now rejects whitespace-only organization IDs before
    inserting compaction run rows.
  - Archive repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (24 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (729 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened archive apply organization validation:
  - `applyCompactionRecord` now rejects whitespace-only organization IDs before
    issuing the canonical DELETE/archive INSERT query.
  - Archive repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-archive-repository.test.ts` (23 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (728 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository get-by-id organization validation:
  - `getMemoryRecordById` now rejects whitespace-only organization IDs before
    issuing a Postgres query.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (46 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (727 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened graph inspect organization validation:
  - `inspectMemoryGraph` now rejects whitespace-only organization IDs before
    issuing graph queries.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (45 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (726 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened governance list organization validation:
  - `listMemoryForGovernance` now rejects whitespace-only organization IDs
    before issuing a Postgres query.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (44 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (725 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository search organization validation:
  - `searchMemory` now rejects whitespace-only organization IDs before issuing
    a Postgres query.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (43 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (724 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened shared read organization validation:
  - `assertOrganizationId` now rejects whitespace-only organization IDs even
    when the legacy anonymous read flag is enabled.
  - Store and retrieval coverage verifies `listMemory`,
    `getMemoryRecordsByIds`, and `retrieveMemory` fail before query/vector
    work.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts tests/search/retrieve-memory.test.ts` (52 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (723 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository delete organization validation:
  - `deleteMemoryRecord` now rejects whitespace-only organization IDs before
    issuing a Postgres query.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (40 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (720 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository archive organization validation:
  - `archiveMemoryRecord` now rejects whitespace-only organization IDs before
    issuing a Postgres query.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.query()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (39 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (719 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository update organization validation:
  - `updateMemoryRecord` now rejects whitespace-only organization IDs before
    opening a Postgres transaction.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.connect()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (38 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (718 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository add organization validation:
  - `addMemory` now rejects whitespace-only organization IDs before opening a
    Postgres transaction.
  - Repository coverage verifies invalid organization IDs fail before
    `pool.connect()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (37 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (717 passed, 34 skipped across 65 files)
- `git diff --check`

- Normalized blank repository add metadata:
  - `addMemory` now normalizes explicitly supplied blank title and summary
    values to `null` before persistence.
  - Repository coverage verifies SQL insert parameters and hydrated output use
    `null` instead of whitespace-only metadata.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (36 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (716 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository add secret scrubbing:
  - `addMemory` now rejects secret-shaped content, titles, and summaries before
    opening a Postgres transaction.
  - Repository coverage verifies AWS key, GitHub token, and Stripe key
    detections fail before `pool.connect()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (35 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (715 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository add value validation:
  - `addMemory` now rejects invalid memory kind, durability, and importance
    values before opening a Postgres transaction.
  - Repository coverage verifies invalid enum values and non-Postgres-integer
    importance fail before `pool.connect()`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (32 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (712 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened repository update value validation:
  - `updateMemoryRecord` now rejects invalid memory kind, durability, and
    importance values before issuing SQL updates.
  - Repository coverage verifies invalid enum values and non-Postgres-integer
    importance roll back before `UPDATE memory_records`.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (31 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (711 passed, 34 skipped across 65 files)
- `git diff --check`

- Normalized blank repository metadata patches:
  - `updateMemoryRecord` now normalizes explicitly supplied blank title and
    summary values to `null` before persistence.
  - Repository coverage verifies SQL update parameters and hydrated output use
    `null` instead of whitespace-only metadata.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/store/memory-repository.test.ts` (30 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (710 passed, 34 skipped across 65 files)
- `git diff --check`

- Normalized blank update-memory metadata patches:
  - Direct `update_memory.title` and `summary` preserve omitted fields but
    normalize blank or null patches to `null`.
  - Direct coverage verifies whitespace-only metadata clears before repository
    dispatch instead of persisting whitespace-only strings.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (120 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (709 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened store-memory prompt kind enum validation:
  - `akasha_store_memory.kind` now uses the supported memory-kind enum instead
    of accepting arbitrary nonblank text.
  - Prompt protocol coverage rejects unsupported store-memory kinds before
    rendering instructions.
  - Reviewer skipped after previous reviewer-agent timeouts; self-review found
    no issues.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (119 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (708 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened direct add-memory kind enum validation:
  - Direct `add_memory.kind` now rejects unsupported memory kinds before
    legacy repository resolution or canonical service dispatch.
  - Direct coverage verifies invalid kinds fail before either backing store
    path is resolved.
  - Reviewer `Erdos` timed out twice; self-review found no issues.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (118 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (707 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened direct graph entity-kind enum validation:
  - `inspect_memory_graph.kind` now rejects unsupported entity kinds before
    canonical repository dispatch.
  - MCP schemas reuse the entity module's `ENTITY_KIND_VALUES` tuple so public
    and direct validation share the same source of truth.
  - Subagent reviewer `Ptolemy` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (117 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (706 passed, 34 skipped across 65 files)
- `git diff --check`

- Hardened direct memory scope enum validation:
  - Direct `add_memory`, `compact_memory`, `list_memory`, and
    `inspect_memory_graph` now reject unsupported `scope` values before
    repository or canonical service dispatch.
  - Direct coverage verifies invalid scopes fail before legacy repository
    resolution or canonical repository calls.
  - Subagent reviewer `Einstein` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (116 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (705 passed, 34 skipped across 65 files)
- `git diff --check`

- Added HTTP goal-run enum validation coverage:
  - HTTP `/v1/goal-run/*` coverage verifies invalid scope, status, and outcome
    values reject before registry dispatch.
  - Coverage exercises valid auth/body shape so failures prove route schema
    validation, not auth or body parsing.
  - Subagent reviewer `Dirac` reported no findings.

Verification:
- `npx vitest run tests/app/server.test.ts` (65 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (704 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened goal-run enum validation:
  - Public and direct goal-run scope, iteration outcome, and list status
    validation now share the same allowed-value constants before service
    dispatch.
  - Direct coverage rejects invalid enum values before goal-run service
    dispatch.
  - Subagent reviewer `Noether` reported no findings.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts` (22 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (703 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened memory enum validation:
  - Public and direct `update_memory.kind` and `durability` validation now
    share the same allowed-value constants before repository dispatch.
  - Direct coverage rejects invalid enum values before repository dispatch and
    proves valid enum updates still refresh the index path.
  - Subagent reviewer `Sartre` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (115 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (702 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened memory importance bounds:
  - Public and direct `update_memory.importance` validation now matches the
    Postgres `INTEGER` range before repository dispatch.
  - Direct coverage rejects non-integers, non-finite values, and out-of-range
    integers; public schema coverage accepts/rejects the int32 boundaries.
  - Subagent reviewer `Bohr` caught JavaScript-safe integer drift; after the
    fix, re-review reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (113 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (700 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct compaction threshold validation:
  - Direct `compact_memory.decayThreshold`, `halfLifeDays`, and
    `semanticDedupThreshold` reject schema-invalid values before repository
    dispatch.
  - Direct coverage verifies invalid threshold values fail before service
    dispatch and documented boundaries still reach the compaction path.
  - Subagent reviewer `McClintock` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (110 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (697 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct compaction limit validation:
  - Direct `compact_memory.limit` rejects invalid and over-limit values before
    repository dispatch.
  - Direct coverage verifies invalid limits fail before service dispatch and
    the documented maximum `5000` still reaches the repository.
  - Subagent reviewer `Huygens` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (108 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (695 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct goal-context limit validation:
  - Direct `build_goal_context.limit` rejects invalid and over-limit values
    before goal-run lookup or memory listing.
  - Direct coverage verifies invalid limits fail before service dispatch and
    the documented maximum `200` still reaches the repository.
  - Subagent reviewer `Aquinas` reported no findings.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts` (21 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (693 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct governance list and graph limit validation:
  - Direct `list_memory.limit`, `inspect_memory_graph.limit`, and
    `inspect_memory_graph.relationshipLimit` reject invalid and over-limit
    values before governance repository dispatch.
  - Direct coverage verifies invalid limits fail before repository calls and
    the documented maximum `5000` still reaches the repository.
  - Subagent reviewer `Arendt` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (106 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (691 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct audit log limit validation:
  - Direct `list_audit_log.limit` rejects invalid and over-limit values before
    audit repository dispatch.
  - Direct coverage verifies invalid limits fail before `listByOrganization`
    and the documented maximum `1000` still reaches the repository.
  - Subagent reviewer `Franklin` requested boundary coverage; after the fix,
    re-review reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (104 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (689 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct governance memory ID validation:
  - Direct `update_memory`, `delete_memory`, and `tag_memory` reject invalid
    `memoryId` values before canonical service dispatch.
  - Direct coverage verifies invalid memory IDs fail before repository update
    or archive calls.
  - Subagent reviewer `Banach` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (102 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (687 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened unarchive archive ID validation:
  - `unarchive_memory.archiveIds` now uses the shared positive safe integer
    schema and direct handler guard.
  - Direct coverage verifies invalid archive IDs fail before canonical service
    resolution or archive lookup, while preserving the existing `[]` no-op.
  - HTTP coverage verifies unsafe archive IDs reject before registry dispatch.
  - Explorer `Aristotle` confirmed this was the next smallest validation gap;
    reviewer `Lagrange` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts tests/app/server.test.ts`
  (165 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (686 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened goal-run ID validation:
  - Direct goal-run handlers reject invalid `goalRunId` values before
    `recordIteration`, `get`, `complete`, `abandon`, context, or repeat-check
    service dispatch.
  - Public schemas use a shared positive safe integer schema for goal-run IDs,
    memory governance IDs, and iteration memory links.
  - HTTP coverage verifies unsafe `goalRunId` rejects before registry dispatch.
  - Subagent reviewer `Hume` caught the schema/handler mismatch; re-review by
    `Poincare` reported no findings.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts tests/app/server.test.ts`
  (82 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (684 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct iteration memory-link validation:
  - Direct `record_iteration.memoryIds` now rejects `NaN`, unsafe, non-integer,
    zero, and negative IDs before `goalRuns.recordIteration`.
  - Direct handler coverage verifies invalid memory links fail before iteration
    mutation.
  - Subagent reviewer `Kant` caught unsafe integer acceptance; the guard now
    uses `Number.isSafeInteger()`.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts tests/goal-run/goal-run-repository.test.ts`
  (25 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (682 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened direct retrieval limit validation:
  - `normalizeLimit()` now rejects `NaN`, non-integer, zero, and negative
    limits before retrieval work while preserving the default `10` and cap
    `100`.
  - Direct registry coverage verifies `search_memory` and `build_context_pack`
    reject invalid limits before `retrieveMemory` is called.
  - Subagent reviewer `Dalton` reported no findings.
  - Subagent explorer `Kierkegaard` found the next write-path candidate:
    direct `record_iteration.memoryIds` validation before iteration mutation.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (100 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (681 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened repeat-check threshold validation:
  - Direct `check_repeat_attempt.threshold` rejects `NaN`, values less than or
    equal to zero, and values greater than one before goal-run lookup or
    embedding work.
  - Direct handler coverage verifies invalid thresholds fail without
    `goalRuns.get` or embedding side effects.
  - Subagent reviewer `Copernicus` was unavailable due usage limit; self-review
    covered the small validation change.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts` (17 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (680 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened MCP context optional text validation:
  - `add_memory_interactive.message` and
    `classify_memory_candidate.instruction` now reuse
    `nonBlankTextInputSchema`.
  - Protocol coverage verifies whitespace-only values fail before elicitation
    or sampling side effects.
  - Subagent reviewer `Helmholtz` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (99 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (679 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened governance tag validation:
  - `update_memory.tags` and `tag_memory.tags` now reject whitespace-only tag
    entries in public schemas and direct handlers before repository update or
    vector refresh.
  - Empty tag arrays remain valid for intentional tag clearing.
  - Direct registry, HTTP, and MCP protocol tests cover blank tag rejection;
    direct and HTTP tests cover `tags: []`.
  - Subagent reviewer `Singer` reported no findings and requested the positive
    `tags: []` guard, which was added before commit.

Verification:
- `npx vitest run tests/mcp/server.test.ts tests/app/server.test.ts`
  (160 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (678 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened organization ID validation:
  - MCP service/context input schemas now reject whitespace-only
    `organizationId` values.
  - Direct registry calls reject whitespace-only `organizationId` before
    handler dispatch or audit writes.
  - HTTP routes keep blank string body `organizationId` as absent, but reject
    present non-string body values before token/header organization enrichment.
  - Subagent reviewer `Godel` caught the blank-body HTTP regression;
    `Heisenberg` caught non-string values being omitted; `Cicero` caught the
    token-bound overwrite case. Follow-up review by `Newton` reported no
    issues.

Verification:
- `npx vitest run tests/app/server.test.ts tests/mcp/server.test.ts tests/mcp/resolve-org.test.ts`
  (173 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (677 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened MCP context and prompt nonblank validation:
  - Elicited memory `projectKey`, sampled classification `summary`,
    `akasha_session_start` `organizationId`/`projectKey`, and
    `akasha_store_memory` `projectKey`/`kind` now reuse
    `nonBlankTextInputSchema`.
  - Protocol tests cover blank elicited project keys, blank sampled summaries,
    and blank prompt identifiers before storage or dispatch.
  - Subagent reviewer `Pascal` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (95 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (672 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened scope identifier validation:
  - `projectKey` and `userScopeId` now reject whitespace-only values in public
    schemas and shared direct-handler scope guards.
  - Tests cover HTTP, MCP protocol, direct retrieval, `resolveRepository`
    dispatch, and goal-run scope paths.
  - Subagent reviewer `Curie` caught direct-registry bypasses for
    `resolveRepository` and ignored `userScopeId`; the follow-up guard and
    regression tests closed both. Re-review by `Averroes` reported no issues.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts tests/app/server.test.ts tests/mcp/server.test.ts`
  (167 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (669 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened optional goal-run note normalization:
  - `terminationCriteria`, iteration `summary`/`error`, complete
    `resolution`, and abandon `reason` now normalize blank/whitespace strings
    to `null` at the handler boundary.
  - Direct handler coverage verifies service payloads before persistence.
  - Subagent reviewer `Sagan` reported no findings.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts` (15 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (664 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened goal-run required text validation:
  - `start_goal_run.goal`, `record_iteration.attempt`, and
    `check_repeat_attempt.attempt` now reject whitespace-only text at schema
    and direct registry handler boundaries.
  - Tests cover HTTP, MCP protocol, and direct handler paths before goal-run
    service or embedding dispatch.
  - Subagent reviewer `Ramanujan` reported no findings.

Verification:
- `npx vitest run tests/goal-run/goal-run-handlers.test.ts tests/app/server.test.ts tests/mcp/server.test.ts`
  (161 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (663 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened governance filter validation:
  - `list_memory.tag` and `inspect_memory_graph.query` now reject
    whitespace-only text at schema and direct registry handler boundaries.
  - Tests cover HTTP, MCP protocol, and direct canonical registry paths before
    repository dispatch.
  - Subagent reviewer `Pauli` reported no findings.

Verification:
- `npx vitest run tests/app/server.test.ts tests/mcp/server.test.ts`
  (145 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (658 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened MCP resource parameter validation:
  - MCP resource URL parsing now rejects whitespace-only decoded path
    segments, recent-memory `query`, and optional search params before
    registry dispatch.
  - Protocol tests cover invalid recent-memory and context-pack resource URIs
    before `search_memory` / `build_context_pack` dispatch.
  - Subagent reviewer `Archimedes` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (86 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (655 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened session prompt task validation:
  - `akasha_session_start.task` now rejects whitespace-only text through the
    MCP prompt argument schema.
  - Protocol coverage verifies blank prompt tasks fail before
    `build_context_pack` dispatch.
  - Subagent reviewer `Galileo` reported no findings.

Verification:
- `npx vitest run tests/mcp/server.test.ts` (80 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (649 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened search/context text validation:
  - `search_memory.query` and `build_context_pack.task` now reject
    whitespace-only text at HTTP/MCP schema and direct registry handler
    boundaries.
  - Direct registry guards protect both override-backed retrieval and canonical
    services paths before embedding, vector search, or context-pack run
    persistence.
  - Tests cover HTTP, MCP protocol, direct retrieveMemory override, and
    canonical services paths.
  - Subagent reviewer `Hubble` reported no findings.

Verification:
- `npx vitest run tests/app/server.test.ts tests/mcp/server.test.ts`
  (135 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (648 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened service config integer parsing:
  - `PORT` and `EMBEDDING_DIMENSIONS` now require plain decimal positive
    integer strings instead of accepting every JavaScript `Number(...)`
    integer form.
  - `PORT` still enforces the 1-65535 range.
  - Focused tests cover scientific, hex, binary, signed, fractional,
    whitespace, empty dimension, and out-of-range port inputs.
  - English/Korean configuration docs now state the stricter integer format.
  - Subagent reviewer `Rawls` caught an empty `EMBEDDING_DIMENSIONS` fallback
    bypass; the parser now defaults only when the variable is undefined.
    Re-review reported no findings.

Verification:
- `npx vitest run tests/config/service-config.test.ts tests/scripts/public-docs-drift.test.ts`
  (42 passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (643 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened memory content validation:
  - Memory writes now reject whitespace-only content at HTTP/MCP schema,
    direct registry handler, canonical write, and repository add/update
    boundaries.
  - CLI, HTTP, MCP protocol, direct registry, canonical indexing, and
    repository tests cover blank content rejection before dispatch or
    persistence side effects.
  - Initial review caught that schema-only validation missed direct
    registry/CLI/canonical write paths; the patch was moved to a shared
    store-level invariant and re-tested.
  - Follow-up review requested direct repository and MCP protocol coverage;
    the added tests closed both gaps. Final re-review reported no issues.

Verification:
- `npx vitest run tests/cli.test.ts tests/app/server.test.ts tests/mcp/server.test.ts tests/store/canonical-indexing.test.ts tests/store/memory-repository.test.ts`
  (192 passed, 7 skipped)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (628 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened compaction apply candidate ID parsing:
  - `applyCompaction` now validates archive candidate IDs before creating a
    compaction run.
  - Candidate IDs must be positive safe decimal integers, avoiding `parseInt`
    truncation such as `12abc` or `12.5` to `12`.
  - Regression coverage verifies fractional IDs fail before run creation,
    archive application, or vector deletion.
  - Subagent reviewer `Bacon` reported no findings on the staged patch.

Verification:
- `npx vitest run tests/compact/apply-compaction.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (618 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened HTTP rate-limit configuration:
  - `RATE_LIMIT_PER_MINUTE` now requires a plain positive integer string.
  - Direct token-bucket construction rejects fractional capacities below or
    above 1, preventing buckets that can never accumulate a full request token.
  - Focused tests cover fractional and non-decimal env values (`0.5`,
    `100.5`, `100abc`, `1e2`, `0x64`).
  - English/Korean configuration docs now state the cap is a positive integer.
  - Subagent reviewer `Darwin` timed out twice and was closed before returning
    findings; local verification completed.

Verification:
- `npx vitest run tests/app/rate-limit.test.ts tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (617 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened sweeper interval env parsing:
  - `COMPACTION_SWEEP_INTERVAL_MS` and `INGEST_SWEEP_INTERVAL_MS` now require
    plain decimal integer strings before conversion.
  - Partial numeric strings like `1000abc` fail closed instead of truncating to
    `1000`.
  - Scientific, hex, and binary JS numeric literal forms (`1e3`, `0x3e8`,
    `0b1111101000`) fail closed instead of being accepted by `Number`.
  - Focused tests cover both compaction and ingest sweeper parsers.
  - Subagent reviewer `Euler` caught the JS numeric literal compatibility
    issue; the patch was updated before final verification.

Verification:
- `npx vitest run tests/compact/sweeper-loop.test.ts tests/compact/ingest-sweeper-loop.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (616 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Hardened static bearer-token comparison:
  - `matchBearer` now hashes provided and configured static tokens to
    fixed-width SHA-256 digests before `timingSafeEqual`.
  - The matcher scans every configured static token and returns the first
    matched binding after the scan, avoiding obvious token-length and
    match-position timing differences.
  - Focused tests cover first-token matches, later-token matches, and
    different-length input.
  - Subagent reviewer `Raman` reported no findings on the staged patch.

Verification:
- `npx vitest run tests/app/bearer-auth.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (616 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Refreshed in-range dependency lockfile/install updates:
  - `@modelcontextprotocol/sdk` 1.28.0 -> 1.29.0.
  - `@qdrant/js-client-rest` 1.17.0 -> 1.18.0.
  - `pg` 8.20.0 -> 8.22.0, including its in-range transitive `pg-*`
    packages.
  - Skipped major upgrades reported by `npm outdated` without approval.
  - Checked package metadata: Node engines remain compatible with the Node 22
    floor, licenses are MIT or Apache-2.0, and `npm audit` reported 0
    vulnerabilities after update.

Verification:
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (615 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Updated general operations Qdrant restore examples to use the host-published
  Qdrant port:
  - English/Korean operations docs now call host `curl` against
    `http://127.0.0.1:6333/...` instead of assuming the Qdrant container has
    `curl` installed.
  - Public docs drift coverage now guards against reintroducing
    `docker compose exec qdrant curl -X POST` in the restore example.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (615 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Aligned general operations Qdrant restore examples with collection-name
  configuration:
  - English/Korean operations docs now use `QDRANT_COLLECTION_NAME` for the
    snapshot upload collection instead of hardcoding `memory_chunks_v1`.
  - The upload examples include `priority=snapshot`, matching the self-hosted
    restore-smoke command.
  - Public docs drift coverage now guards both operations and self-hosted
    restore upload paths.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (615 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Fixed architecture docs embedding module filename drift:
  - English/Korean architecture docs now reference the real
    `src/embedding/local-embedding.ts` module instead of the stale pluralized
    path.
  - Public docs drift coverage now verifies all documented embedding provider
    module filenames exist and are listed in both architecture docs.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (615 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Removed stale Transformers dynamic-import TypeScript suppression:
  - `@huggingface/transformers` is a regular dependency and ships declarations.
  - `src/embedding/transformers-embedding.ts` no longer needs the old
    `@ts-ignore` before the dynamic import.

Verification:
- `npx vitest run tests/embedding/transformers-embedding.test.ts tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (614 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Aligned Transformers dependency docs/comments with package metadata:
  - `package.json` installs `@huggingface/transformers` as a regular runtime
    dependency because `EMBEDDING_PROVIDER=transformers` is the default.
  - Code comments and public docs no longer call it an optional dependency.
  - The runtime error now points at a missing/pruned runtime install instead of
    optional dependency installation.
  - Public docs drift coverage now guards the English/Korean docs and source
    comments against reintroducing optional-dependency wording while the package
    remains in `dependencies`.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (614 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Clarified dedicated worker metrics guidance:
  - Operations runbooks now separate in-process HTTP sweeper tick counters from
    dedicated worker mode.
  - Dedicated `npm run start:worker` operators should use worker process logs
    for tick activity and HTTP `/metrics` only for Postgres backlog gauges.
  - API and operations docs now state that the dedicated worker currently has
    no HTTP metrics listener.
  - Public docs drift coverage now guards the English/Korean wording.
- Source rationale:
  - Prometheus `scrape_config` entries define the targets Prometheus scrapes;
    a dedicated worker process without an HTTP listener is not a scrape target:
    https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (0 vulnerabilities)
- `npm test` (613 passed, 34 skipped across 65 files)
- `git diff --check`
- `git diff --cached --check`

- Implemented Node runtime support update:
  - `package.json` and root lock metadata now require Node `>=22`.
  - `@types/node` now targets the Node 22 line so TypeScript cannot silently
    admit Node 24-only APIs while package support starts at Node 22.
  - GitHub Actions CI now runs Node 22 and 24.
  - README badges/quick-start docs, troubleshooting docs, and `install.sh`
    now state/enforce Node.js >= 22.
  - Public docs drift tests now guard package metadata, lock metadata, README
    badges, troubleshooting docs, CI matrix, and installer runtime checks.
- Review gates:
  - Spec compliance passed.
  - Quality review initially caught Node 24 type definitions and missing
    installer drift coverage; both were fixed and re-review approved.
- Implemented repo secret hygiene guard:
  - Added `tests/scripts/repo-secret-hygiene.test.ts` to scan `git ls-files`
    text files with Akasha's existing `scanForSecrets` helper.
  - Failure output is limited to file path and secret category; matched values
    are never reported.
  - Excluded the detector source and scrubber unit test, where regexes and
    examples are intentional.
  - Allowed only exact placeholder DB URL userinfo pairs such as
    `memory:memory`, `user:pass`, `user:pw`, `postgres:test`, `memory:STRONG_PW`,
    and the exact `${POSTGRES_USER:-memory}:${POSTGRES_PASSWORD:-memory}` form;
    other embedded DB credentials still fail.
  - Split synthetic AWS/GitHub secret-shaped literals in non-scrubber store
    tests into runtime string fragments.
  - Review gates:
    - Spec compliance passed.
    - Quality review caught broad DB credential allowlisting and untracked test
      risk; both were fixed before final verification.
- Source rationale:
  - GitHub push protection blocks hardcoded credentials before they reach a
    repository, including test/fixture-shaped tokens:
    https://docs.github.com/en/code-security/concepts/secret-security/push-protection
  - OWASP Secrets Management calls out API keys, database credentials, SSH
    keys, certificates, and similar secrets hardcoded in source/config as a
    common leak source:
    https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts`
- `npx vitest run tests/scripts/repo-secret-hygiene.test.ts`
- `npx vitest run tests/store/secret-scrub.test.ts tests/store/canonical-indexing.test.ts tests/store/memory-repository.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`63` files passed, `2` skipped; `608` tests passed, `34` skipped)
- `git diff --check`

- Reviewed the backup/restore runbooks against the current Qdrant and pgvector
  paths.
  - `scripts/restore-smoke.ts` now passes the backup manifest's
    `qdrant.collectionName` to restore commands as
    `RESTORE_SMOKE_QDRANT_COLLECTION_NAME`, falling back to
    `QDRANT_COLLECTION_NAME` or `memory_chunks_v1` for older manifests.
  - The self-hosted restore examples now upload Qdrant snapshots to the
    manifest-derived collection and use `priority=snapshot`.
  - Public docs drift coverage now pins the restore command away from hardcoded
    `memory_chunks_v1`.
- Source rationale:
  - Qdrant's snapshot API recovers uploaded snapshots through the collection
    scoped `/collections/{collection_name}/snapshots/upload` endpoint and
    supports `priority=snapshot` for snapshot-led recovery:
    https://api.qdrant.tech/api-reference/snapshots/recover-from-uploaded-snapshot

Verification:
- `npx vitest run tests/scripts/restore-smoke.test.ts tests/scripts/public-docs-drift.test.ts`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`63` files passed, `2` skipped; `611` tests passed, `34` skipped)
- `git diff --check`

- Implemented public docs index drift coverage:
  - `tests/scripts/public-docs-drift.test.ts` now discovers tracked public
    markdown under `docs/`, excluding `docs/superpowers/**` and the docs index
    files.
  - The guard checks every English public doc has a `.ko.md` sibling, every
    Korean doc has an English sibling, and both docs indexes contain the pair
    in English-first / Korean-first order.
  - No CI workflow change is needed because CI already runs `npm test`.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`19` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`63` files passed, `2` skipped; `612` tests passed, `34` skipped)
- `git diff --check`

- Fixed Unreleased Node runtime changelog drift after the project moved to
  Node 22+:
  - `CHANGELOG.md` and `CHANGELOG.ko.md` now describe the current README
    landing badge set as Node ≥22 instead of Node ≥20.
  - `tests/scripts/public-docs-drift.test.ts` checks only Unreleased changelog
    sections for stale `Node ≥20`, `node-%3E%3D20`, and `Node 20+22` current
    support wording, while preserving historical 1.0.0 release text.
  - Existing Node runtime decision/source remains `DECISIONS.md` 2026-06-27;
    no new decision was needed.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts` (`25` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`77` files passed, `2` skipped; `1796` tests passed, `34` skipped)
- `git diff --check`

- Fixed stale pre-P17 compaction apply comments:
  - `src/app/server.ts` now describes the current unauthenticated non-loopback
    risk as destructive/admin operations instead of a future P17 apply path.
  - `tests/compact/compact-memory.test.ts` now documents that
    `buildCompactionPlan` is planning/summary-only and the `applyCompaction`
    orchestrator fills actual archived IDs.
  - `tests/scripts/public-docs-drift.test.ts` now guards exact stale
    future-tense phrases only in the touched source/test files.

Verification:
- `npx vitest run tests/scripts/public-docs-drift.test.ts tests/compact/compact-memory.test.ts`
  (`62` tests passed)
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`77` files passed, `2` skipped; `1797` tests passed, `34` skipped)
- `git diff --check` (passed)

- Fixed npm package tarball manifest hygiene:
  - `package.json` now uses an explicit `files` allowlist for `dist/`, runtime
    shell scripts, `.env.example`, public docs, Korean mirror docs, `LICENSE`,
    and `install.sh`.
  - The allowlist excludes source, tests, CI config, internal work-tracking
    docs, and compiled test/config artifacts via omission plus targeted
    negations.
  - `npm run build` now runs a portable Node `fs.rmSync` clean before TypeScript
    emits, and `prepack` runs the build before `npm pack` / publish.
  - Added `tests/scripts/package-manifest.test.ts` so CI can verify the
    manifest contract without invoking `npm pack` or requiring prebuilt `dist`.
- Source rationale:
  - npm package metadata `files` controls package inclusion, while packages
    without an `.npmignore` fall back to `.gitignore` behavior for exclusion.
    That fallback was excluding `dist/` while allowing tracked source, tests,
    CI, and internal planning files into the tarball.
    Official docs: https://docs.npmjs.com/cli/v11/configuring-npm/package-json#files
    and https://docs.npmjs.com/cli/v11/using-npm/developers#keeping-files-out-of-your-package
  - No `DECISIONS.md` entry: this is package hygiene for the existing runtime
    shape, not a durable package UX/API decision.

Verification:
- `npx vitest run tests/scripts/package-manifest.test.ts tests/scripts/public-docs-drift.test.ts`
  (`29` tests passed)
- `npm run build` (passed; runs `clean` before `tsc`)
- `npm pack --dry-run --json` (passed; `prepack` rebuilt first, no
  `.npmignore`/`.gitignore` fallback warning, `116` entries)
  - Included built runtime output under `dist/src/**` and `dist/scripts/**`,
    shell scripts under `scripts/*.sh`, `.env.example`, public docs, mirrored
    root docs, `LICENSE`, and `install.sh`.
  - Excluded root `src/**`, `tests/**`, `.github/**`, `PLAN.md`, `BACKLOG.md`,
    `WORKLOG.md`, and `DECISIONS.md`.
- `npm run typecheck`
- `npm audit --audit-level=moderate` (`0` vulnerabilities)
- `npm test` (`78` files passed, `2` skipped; `1800` tests passed, `34` skipped)
- `git diff --check` (passed)
