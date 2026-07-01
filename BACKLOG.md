# BACKLOG

Prioritize in this order unless a core product capability materially changes
the value of Akasha: stability/bugs, testability, scalability, developer
experience, documentation, features.

## P0

- None currently known.

## P1

- None currently known.

## P2

- None currently known.

## Done In This Branch

- CI workflow hygiene coverage now guards the Postgres and pgvector service
  container health checks that integration jobs rely on before connecting.
- CI workflow hygiene coverage now guards the workflow-level concurrency group
  and stale-run cancellation setting.
- CI workflow hygiene coverage now guards that all `actions/setup-node` steps
  keep npm dependency caching enabled.
- CI workflow hygiene coverage now guards that the workflow runs on pushes to
  `main` and pull requests targeting `main`.
- CI workflow hygiene coverage now guards that the main Node matrix stays on
  Node 22 and Node 24 while `setup-node` consumes the matrix value.
- CI workflow hygiene coverage now rejects unguarded `npm ci`, `npm install`,
  and `npm i` commands so future install steps keep the CPU-only onnxruntime
  workaround.
- TypeScript source convention coverage now guards that `tsconfig.json` keeps
  source, scripts, tests, and root Vitest config files in the project include
  set.
- TypeScript source convention coverage now derives its checked file set from
  `tsconfig.json`, avoiding a second hand-maintained TypeScript path list.
- TypeScript source convention coverage now includes root `vitest.config.ts`,
  matching the TypeScript project include set.
- TypeScript source convention coverage now guards that `tsconfig.json` keeps
  strict mode enabled without disabling `noImplicitAny` or unknown catch
  variables.
- TypeScript source convention coverage now rejects file-wide `@ts-nocheck`
  comments in tracked source, script, and test files.
- TypeScript source convention coverage now rejects `@ts-ignore` and
  `@ts-expect-error` suppression comments in tracked source, script, and test
  files.
- Unreleased English/Korean changelogs now record the `/admin/memory` shell
  reliability fixes, guarded by public-docs drift coverage.
- The `/admin/memory` static shell now includes HTTP status details when
  non-JSON error responses fall back to generated status text.
- The `/admin/memory` static shell now sends only finite numeric limit and
  importance values in API payloads, guarded by server shell coverage.
- The `/admin/memory` static shell now catches save/tag/archive action failures
  and reports them through the status error fallback.
- The `/admin/memory` static shell now stringifies caught non-`Error` values
  before writing status text, guarded by server shell coverage.
- Migration SQL comments now avoid internal `P17`/`P19.1` phase labels, with
  public-docs drift coverage guarding the touched migration files.
- Bare TypeScript catch clauses now use explicit `_err: unknown` bindings, and
  source convention coverage rejects missing catch bindings.
- TypeScript source convention coverage now guards tracked source, script, and
  test files against explicit `any` type keywords.
- TypeScript catch binding convention coverage now uses AST traversal instead
  of regex matching, avoiding string/comment false positives.
- TypeScript catch binding convention coverage now spans tracked source,
  script, and test files, with remaining test catch bindings typed as
  `unknown`.
- Package manifest coverage now guards that runtime source files do not import
  the excluded `src/eval/` harness.
- npm package tarballs now exclude the compiled eval harness under
  `dist/src/eval/`, with manifest and changelog drift coverage.
- Source catch bindings now follow the `catch (err: unknown)` convention, with
  script coverage guarding source files against untyped catch bindings.
- Docker build context hygiene now excludes local agent artifacts and internal
  docs from `.dockerignore`, guarded by Docker hardening coverage.
- CI workflow hygiene coverage now guards that all CI install steps use
  `ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm ci`, preserving the CPU-only runner
  workaround for flaky GPU binary downloads.
- Postgres integration CI and Postgres-gated test comments now use
  Postgres-backed suite wording consistently, guarded by CI workflow hygiene
  coverage.
- Semantic dedup MCP server test names now describe current behavior without
  planning-era phase labels, guarded by public-docs drift coverage.
- CI workflow hygiene coverage now asserts backend job section existence and
  ordering before checking focused Postgres/pgvector commands.
- CI workflow hygiene coverage now guards the pgvector integration job's
  focused suite command and required `PGVECTOR_TEST_URL`.
- The Postgres integration CI job now runs only the three Postgres-backed test
  files instead of duplicating the full `npm test` matrix, guarded by CI
  workflow hygiene coverage.
- Contributor, troubleshooting, and CI comments now document both
  Postgres-backed suite skips and `PGVECTOR_TEST_URL`-gated pgvector adapter
  skips, guarded by public-docs and CI workflow hygiene coverage.
- Semantic compaction comments now describe the implemented semantic dedup flow
  without planning-era phase labels, guarded by public-docs drift coverage.
- Compaction cleanup sweeper comments now describe current env-driven retry
  behavior without planning-era phase labels, guarded by public-docs drift
  coverage.
- CONTRIBUTING daily command tables now use the same `npm test` spelling as
  README and PR verification guidance, guarded by public-docs drift coverage.
- README common command lists now include build and moderate-level dependency
  audit commands, guarded by public-docs drift coverage.
- CI now runs `npm run build` in the main Node matrix after typecheck and before
  tests, aligning CI with contributor and PR verification guidance.
- CI jobs now set explicit 30-minute job timeouts instead of relying on the
  GitHub Actions 360-minute default, guarded by workflow hygiene coverage.
- Compaction apply and MCP type comments now describe current apply/unarchive
  behavior without internal phase labels, guarded by public-docs drift
  coverage.
- Memory archive repository comments and direct missing-`source_id` restore
  errors now use current feature/error wording instead of internal phase
  labels; the documented unarchive outcome reason remains stable for client
  compatibility.
- Public architecture data-flow docs no longer expose internal `(P17)`,
  `(P19.1)`, or `pre-P19.1` phase labels, guarded by public-docs drift
  coverage.
- Ingest job retry monitoring comments now describe the implemented
  `claimPendingForRetry` path instead of a future sweeper PR, guarded by
  public-docs drift coverage.
- Contributing docs daily command tables now include build and moderate-level
  dependency audit commands, guarded by public-docs drift coverage.
- Refreshed a stale P17 planning-era comment in `src/compact/compact-memory.ts`
  to describe the current shared planning role, with drift coverage.
- Contributing docs now align local pre-push verification with the PR template:
  typecheck, build, moderate-level npm audit, and tests, guarded by
  public-docs drift coverage.
- PR template test-plan guidance now asks for typecheck, build, moderate-level
  npm audit, and test output, with public-docs drift coverage.
- `MEMORY_API_TOKENS` configuration docs and `.env.example` now document that
  token values cannot contain `:`, with public-docs drift coverage.
- CI now runs `npm audit --audit-level=moderate` before typecheck/test, with
  focused workflow hygiene coverage to keep dependency auditing in the
  pipeline.
- CI workflow `GITHUB_TOKEN` permissions are now restricted to top-level
  `contents: read`, with focused workflow hygiene coverage to prevent broad or
  contents-write grants.
- `.gitignore` now ignores local `.env` variants, `.envrc`, and generated
  `.akasha/` artifacts while keeping `.env.example` tracked, with repo hygiene
  coverage for ignore patterns and tracked-file exclusions.
- Repo hygiene coverage now guards the `.gitignore` patterns for common
  desktop/editor metadata files.
- Removed ignored desktop metadata artifacts from the workspace and broadened
  `.gitignore` plus repo hygiene coverage for common desktop/editor metadata.
- Removed ignored `.github/.DS_Store` workspace metadata and added a repo
  hygiene guard against tracked Finder metadata files.
- Korean setup, embedding, and backup snippets now localize `default`, `stub`,
  and backend-aware labels in public Korean docs, with public-docs drift
  coverage.
- Korean README comparison table now localizes non-code status labels, with
  public-docs drift coverage.
- Korean README comparison copy now uses localized positioning language instead
  of mixed English phrases, with public-docs drift coverage.
- Korean backup guidance now keeps pgvector logical-data-path wording in Korean
  instead of inheriting the English README phrasing, with public-docs drift
  coverage split by language.
- Korean public-doc body links now prefer Korean mirrors where available, with
  focused public-docs drift coverage.
- Feature request scope options now describe vector backend work as Qdrant or
  pgvector, guarded by public-docs drift coverage.
- npm package keywords now include `pgvector`, guarded alongside the package
  description in manifest coverage.
- Bug report templates now include the default `transformers` embedding
  provider option, pgvector-aware custom deployment wording, and
  repository-rooted security links, guarded by public-docs drift coverage.
- npm package metadata now describes Postgres-backed storage with Qdrant or
  pgvector search, and the package manifest test guards that wording.
- Unreleased English/Korean changelog notes now record the npm package tarball
  surface fix, with Unreleased-only drift coverage for package tarball
  inclusion/exclusion markers.
- Source-checkout-only `install.sh` is no longer part of the npm package
  allowlist, keeping tarballs self-contained after Docker/Compose assets were
  excluded.
- npm package tarballs now use an explicit manifest allowlist, build `dist/`
  from a clean slate before pack, and guard the publish surface with a focused
  manifest test.
- Stale pre-P17 compaction-apply source/test comments now describe current
  apply behavior, with focused drift coverage for the touched files.
- Unreleased English/Korean changelog README landing badge wording now reflects
  Node ≥22, with Unreleased-only drift coverage to keep stale Node 20 wording
  out of current-support notes.
- `.env.example` describes Compose environment loading as variable
  substitution, matching `compose.yaml` and the configuration docs.
- Docker, CI, and local installer dependency installs skip onnxruntime-node CUDA
  provider downloads through `ONNXRUNTIME_NODE_INSTALL_CUDA=skip`, avoiding npm
  unknown-config flags.
- Unreleased English/Korean changelog migration-range and ingest outbox wording
  now report `001-015` plus the implemented, opt-in ingest sweeper state, with
  focused Unreleased-only drift coverage.
- Invalid CLI argv containers, argv entries, option containers, cwd values, and
  registry containers are rejected before command parsing or dispatch.
- Invalid operator server construction options, injected config/logger/auth
  handles, metrics handles, and OAuth metadata handles are rejected before HTTP
  server wiring or startup.
- Invalid JSON HTTP route construction contexts and organization-resolution
  request/header inputs are rejected before route dispatch or header access.
- Invalid MCP HTTP request handler options and req/res/auth/rate-limit/logger
  handles are rejected before request dispatch or transport wiring.
- Invalid MCP server construction options and stdio cwd env/fallback inputs are
  rejected before server wiring or stdio startup.
- Invalid MCP registry construction options and direct handler construction
  inputs are rejected before registry/handler wiring.
- Invalid embedding provider factory inputs, provider names, model/dimensions
  values, and OpenAI API key values are rejected before provider construction.
- Invalid local embedding client inputs, dimensions, single text inputs, and
  batch text inputs are rejected before hashing.
- Invalid transformers embedding client inputs, injected extractor factories
  and results, single text inputs, and batch text inputs are rejected before
  model loading or extractor calls.
- Invalid OpenAI embedding client inputs, injected client factories/results,
  single text inputs, and batch text inputs are rejected before API calls.
- Invalid Qdrant client factory inputs and blank/non-string URL or API key
  values are rejected before SDK client construction.
- Invalid memory chunk repository pools, chunk write inputs, point-ID mappings,
  record IDs, list scopes/options, retry dates, and context-pack run inputs are
  rejected before SQL or transaction work.
- Invalid goal-run repository pools, start/list/get/close inputs, iteration
  inputs, scope/status/outcome values, optional text, and memory IDs are
  rejected before SQL or transaction work.
- Invalid DB pool factory inputs, migration helper options, migration env
  values, and migration pool handles are rejected before pool construction,
  fallback reads, or migration queries.
- Invalid memory archive repository pools and Qdrant cleanup inputs are
  rejected before cleanup query construction.
- Invalid ingest job repository pools, create/update inputs, retry query
  inputs, IDs, attempt counts, and retry dates are rejected before queries.
- Invalid audit repository pools, record entries, and list options are rejected
  before insert/select query construction.
- Invalid project-ingest roots, project IDs, and repository handles are
  rejected before approved-source reads or memory persistence.
- Invalid OAuth scope input containers, token scope lists, scope kinds, and
  direct helper tool names are rejected before authorization decisions.
- Invalid dependency health probe containers and probe builder inputs are
  rejected before readiness iteration or probe closure construction.
- Invalid metrics registry observations, dependency reports, and backlog
  snapshots are rejected before telemetry state mutation or label rendering.
- Invalid worker-process options and injected starter handles are rejected
  before worker startup/no-worker logging reads their fields.
- Invalid background-worker coordinator options, env values, metrics, injected
  starters, and bootstrap service results are rejected before worker startup.
- Invalid compaction and ingest sweeper loop inputs, logger methods, metrics,
  and intervals are rejected before timers are scheduled.
- Invalid ingest sweeper inputs, claimed jobs, chunk rows, and embedding
  vectors are rejected before unsafe ingest vector side effects.
- Invalid outbox sweeper inputs, tunables, clock results, and claimed cleanup
  rows are rejected before vector cleanup side effects.
- Invalid apply compaction inputs, dependencies, rate-limit config, generated
  run IDs, and injected times are rejected before apply side effects.
- Invalid unarchive compaction inputs and archive IDs are rejected before
  repository, chunking, embedding, or vector side effects.
- Invalid compaction plan inputs, records, semantic override groups, and
  promotion records are rejected before planning.
- Invalid semantic duplicate records, embedding maps, and vectors are rejected
  before cosine scoring or clustering.
- Invalid OAuth protected-resource helper inputs are rejected before challenge
  header formatting or metadata URL construction.
- Invalid MCP utility primitive inputs are rejected before identifier
  formatting, limit normalization, memory-kind conversion, or summarization.
- Invalid user-scope resolver inputs are rejected before environment, git, or
  OS fallback resolution.
- Invalid ranking records, candidates, and score options are rejected before
  metadata scoring or candidate sorting.
- Invalid repeat-attempt inputs, prior failures, thresholds, and embedding
  dimensions are rejected before cosine scoring.
- Invalid retrieval inputs and corrupt vector hit memory IDs are rejected or
  ignored before repository hydration and ranking.
- Invalid context pack records and source metadata are rejected before section
  selection or markdown rendering.
- Invalid goal context pack inputs and iteration render fields are rejected
  before markdown rendering or last-error extraction.
- Invalid rate limiter options, injected times, and direct keys are rejected
  before token bucket state is read or updated.
- Invalid background queue metrics timestamps and non-finite count values are
  rejected before metrics snapshots are reported.
- Non-string direct HTTP metric methods are rejected before method
  normalization.
- Invalid vector point inputs are rejected before vector ID construction or
  payload metadata assembly.
- Non-string direct secret-scrubber content is rejected before regex scanning
  or secret-detection error construction.
- Invalid exact-duplicate records are rejected before content normalization,
  duplicate grouping, or compaction apply planning.
- Invalid search-ranking timestamps are rejected before recency scoring,
  candidate tie-break sorting, or newest timestamp derivation.
- Invalid chunk-text inputs are rejected before tokenization or chunk offset
  calculation.
- Invalid decay-score inputs are rejected before scoring or candidate
  selection.
- Invalid retry backoff attempt counts are rejected before exponential delay
  calculation.
- Invalid eval metric inputs are rejected before metric calculation, and
  duplicate retrieved IDs cannot inflate recall above `1`.
- Non-finite semantic duplicate thresholds and embedding vectors are rejected
  before clustering or cosine scoring.
- Non-string direct source-ref parser values are rejected before JSON parsing,
  fallback logging, or metadata return.
- Non-string direct lexical/entity helper inputs are rejected before string
  normalization, regex matching, or scoring field access.
- Non-string service config environment values are rejected before string
  normalization, integer parsing, or config field assignment.
- Non-string configured `LOG_LEVEL` values are rejected before log-level
  normalization.
- Non-string direct lifecycle init project keys are rejected before generated
  file writes.
- Non-string vector organization IDs are rejected before Qdrant or pgvector
  backend calls.
- Non-string direct repository title and summary values are rejected before
  memory persistence.
- Non-string direct repository tag entries are rejected before transaction work.
- Non-string direct repository search queries are rejected before lexical SQL
  work while blank queries keep returning no rows.
- Non-string direct scope identifiers are rejected before scope resolution,
  logging, audit, repository, or canonical service work.
- Non-string non-blank text inputs are rejected before `.trim()` across shared
  guards.
- Non-string direct goal-run optional notes are rejected before service
  dispatch.
- Goal-run close notes, scoped start/list behavior, schema validation, and docs.
- Sweeper tick/duration/row Prometheus metrics.
- Background queue backlog gauges with partial indexes.
- Dedicated background worker lifecycle and worker scripts.
- Operator guidance for dedicated worker metrics boundaries.
- Node runtime support moved from Node 20 to Node 22+, with CI on Node 22/24.
- Repo secret hygiene guard for tracked secret-shaped literals.
- Restore smoke Qdrant collection-name and uploaded-snapshot runbook alignment.
- Public docs index drift guard for tracked docs pages and English/Korean pairs.
- Transformers dependency docs/comments aligned with package metadata.
- Stale Transformers dynamic-import `@ts-ignore` removed.
- Architecture docs local embedding module filename drift fixed.
- Operations restore examples use Qdrant collection-name variables.
- Operations restore examples use host Qdrant curl path.
- In-range dependency lockfile/install updates refreshed.
- Static bearer-token comparison scans fixed-width digests across configured
  tokens.
- Sweeper interval env parsing requires plain decimal integer strings.
- Rate-limit env parsing and bucket capacity require positive integers.
- Compaction apply candidate IDs require positive safe decimal integers before
  run creation.
- Whitespace-only memory content is rejected before dispatch or persistence.
- Service config `PORT` and `EMBEDDING_DIMENSIONS` require plain decimal
  positive integer strings.
- Whitespace-only search queries and context-pack tasks are rejected before
  dispatch or retrieval work.
- Whitespace-only restore-smoke text environment values are rejected before
  Docker or registry work.
- Whitespace-only optional restore-smoke user/org environment values are
  rejected before Docker or registry work.
- Whitespace-only session-start prompt tasks are rejected before context-pack
  dispatch.
- Whitespace-only MCP resource path/search parameters are rejected before
  resource dispatch.
- Whitespace-only governance tag/query filters are rejected before repository
  dispatch.
- Whitespace-only direct graph query filters are rejected before repository SQL
  work.
- Whitespace-only required goal-run text is rejected before service or
  embedding dispatch.
- Blank optional goal-run notes normalize to `null` before persistence.
- Whitespace-only project/user scope identifiers are rejected before dispatch.
- Whitespace-only `DEVELOPER_MEMORY_USER_ID` values are rejected before
  user-scope fallback resolution.
- Whitespace-only MCP prompt/context identifiers and sampled summaries are
  rejected before storage or dispatch.
- Whitespace-only organization IDs are rejected on MCP/direct paths, while
  HTTP rejects malformed non-string organization IDs before enrichment.
- Whitespace-only optional OAuth text env values are rejected before metadata
  or verifier config construction.
- Whitespace-only governance tag entries are rejected before tag update or
  vector refresh.
- Whitespace-only direct repository tag entries are rejected before opening an
  update transaction.
- Whitespace-only MCP context optional text is rejected before elicitation or
  sampling side effects.
- Invalid direct repeat-check thresholds are rejected before goal-run lookup or
  embedding work.
- Invalid direct retrieval limits are rejected before search/context-pack
  retrieval work.
- Retrieval limits above the public `100` cap are rejected consistently across
  registry, HTTP, MCP resource, and prompt entry points.
- Invalid retrieval eval threshold environment values are rejected before eval
  assertions are configured.
- Blank backup manifest artifact metadata is rejected before local or off-box
  artifact verification work.
- Blank restore-smoke manifest artifact metadata is rejected before restore
  path construction.
- Blank backup-encryption manifest artifact metadata is rejected before
  idempotent returns or artifact encryption work.
- Blank encrypted off-box backup manifest copy metadata is rejected before
  `scp` invocation.
- Non-object backup manifest writer inputs are rejected before manifest mutation.
- Invalid Qdrant snapshot response names are rejected before snapshot download.
- Blank OAuth comma-separated config list entries are rejected before verifier
  configuration.
- Blank `MEMORY_API_TOKENS` comma-list entries are rejected before server auth
  configuration.
- Blank required backup shell env values are rejected before backup side
  effects.
- Whitespace-only service-config backup env values are rejected before runtime
  config construction.
- Whitespace-only backup shell target hosts are rejected before SSH/SCP work.
- Malformed backup plaintext retention flags are rejected before encryption
  work.
- Non-object backup encryption and restore-smoke manifests are rejected before
  artifact or restore parsing work.
- Loopback-bound MCP Streamable HTTP rejects invalid Host headers before auth,
  rate limiting, or transport work.
- Non-array direct governance tag inputs are rejected before canonical service
  or repository work.
- Non-array direct iteration memory links are rejected before canonical service
  or repository work.
- Invalid direct repository search/list/graph limits are rejected before SQL
  work.
- Invalid direct audit repository limits are rejected before SQL work.
- Invalid direct iteration memory links are rejected before iteration mutation.
- Invalid direct/public goal-run IDs are rejected before service dispatch.
- Invalid direct/public unarchive archive IDs are rejected before archive lookup.
- Invalid direct governance memory IDs are rejected before repository dispatch.
- Invalid direct audit log limits are rejected before audit repository dispatch.
- Invalid direct governance list and graph limits are rejected before repository
  dispatch.
- Invalid direct goal-context limits are rejected before goal-run lookup.
- Invalid direct compaction limits are rejected before repository dispatch.
- Invalid direct compaction thresholds are rejected before repository dispatch.
- Invalid public/direct memory importance values are rejected before repository
  dispatch.
- Invalid direct memory kind and durability updates are rejected before
  repository dispatch.
- Invalid direct goal-run enum values are rejected before service dispatch.
- HTTP goal-run enum validation is covered before registry dispatch.
- Invalid direct memory scope enum values are rejected before repository
  dispatch.
- Invalid direct graph entity-kind enum values are rejected before repository
  dispatch.
- Invalid direct add-memory kind enum values are rejected before repository
  dispatch.
- Invalid store-memory prompt kind enum values are rejected before prompt
  rendering.
- Blank direct update-memory title and summary patches normalize to `null`
  before repository dispatch.
- Blank repository update title and summary patches normalize to `null` before
  persistence.
- Invalid repository update kind, durability, and importance values are
  rejected before persistence.
- Invalid repository add kind, durability, and importance values are rejected
  before persistence.
- Secret-shaped repository add content, titles, and summaries are rejected
  before persistence.
- Blank repository add title and summary values normalize to `null` before
  persistence.
- Whitespace-only repository add organization IDs are rejected before
  persistence.
- Whitespace-only repository update organization IDs are rejected before
  persistence.
- Whitespace-only repository archive organization IDs are rejected before
  persistence.
- Whitespace-only repository delete organization IDs are rejected before
  persistence.
- Whitespace-only read organization IDs are rejected before repository or vector
  work, even with the legacy anonymous read flag enabled.
- Whitespace-only repository search organization IDs are rejected before
  persistence.
- Whitespace-only governance list organization IDs are rejected before
  persistence.
- Whitespace-only graph inspect organization IDs are rejected before
  persistence.
- Whitespace-only repository get-by-id organization IDs are rejected before
  persistence.
- Whitespace-only archive apply organization IDs are rejected before
  persistence.
- Whitespace-only archive run creation organization IDs are rejected before
  persistence.
- Whitespace-only archive lookup organization IDs are rejected before
  persistence.
- Whitespace-only archive restore organization IDs are rejected before
  persistence.
- Whitespace-only restored-record cleanup organization IDs are rejected before
  persistence.
- Whitespace-only recent apply-count organization IDs are rejected before
  persistence.
- Whitespace-only scope-lock organization IDs are rejected before persistence.
- Whitespace-only scope-lock key inputs are rejected before persistence.
- Whitespace-only compaction run scope inputs are rejected before persistence.
- Whitespace-only canonical chunk delete organization IDs are rejected before
  persistence.
- Whitespace-only canonical chunk list organization IDs are rejected before
  persistence.
- Whitespace-only context-pack run organization IDs are rejected before
  persistence.
- Whitespace-only canonical chunk insert organization IDs are rejected before
  persistence.
- Whitespace-only canonical chunk replacement organization IDs are rejected
  before transaction side effects.
- Whitespace-only canonical refresh organization IDs are rejected before
  indexing side effects.
- Whitespace-only canonical write-path organization IDs are rejected before
  ingest and indexing side effects.
- Whitespace-only canonical reindex organization IDs are rejected before
  indexing side effects.
- Whitespace-only audit repository organization IDs are rejected before
  persistence.
- Whitespace-only ingest job creation organization IDs are rejected before
  persistence.
- Whitespace-only vector organization filters are rejected before backend
  query/delete work, while exact empty-string legacy behavior remains covered.
- Whitespace-only vector point organization IDs are rejected before payload
  construction.
- Whitespace-only goal-run repository organization IDs are rejected before SQL
  or transaction side effects.
- Whitespace-only apply-compaction organization IDs are rejected before
  embedding, rate-limit, archive, or vector side effects.
- Whitespace-only unarchive-compaction organization IDs are rejected before
  archive, restore, chunk, embedding, vector, or mark side effects.
- Missing, non-string, or whitespace-only vector upsert point organization
  payloads are rejected before backend calls.
- Whitespace-only CLI organization flags are rejected before registry dispatch
  or lifecycle file writes.
- Blank or non-string OAuth organization claims reject the token instead of
  silently becoming unbound.
- Whitespace-only required service environment variables are rejected before
  config construction.
- Whitespace-only migration database environment variables are rejected before
  pool construction.
- Blank or repeated HTTP organization headers and blank body organization IDs
  are rejected before registry dispatch.
- Whitespace-only direct lifecycle init organization, user scope, and task
  inputs are rejected before writing generated files.
- Whitespace-only direct lifecycle init repo/output path inputs are rejected
  before resolving paths or writing generated files.
- Whitespace-only CLI project, task, user scope, kind, content, content-file,
  and output-directory flags are rejected before dispatch or filesystem reads.
- Whitespace-only explicit/default user scope resolver inputs are rejected
  before internal callers can receive them.
- Invalid OAuth verifier numeric environment values are rejected before JWKS
  verifier construction, including timeout values outside Node timer bounds.
- Whitespace-only optional service configuration identifiers are rejected
  before embedding or vector adapter construction.
- Invalid log-level environment values are rejected before logger construction
  while preserving case-insensitive supported level names.
- Whitespace-only restore-smoke tool identifiers are rejected before registry
  dispatch.
- Whitespace-only restore-smoke Qdrant collection identifiers are rejected
  before restore command environment construction.
- Whitespace-only MCP stdio `DMO_CWD` values are rejected before server
  startup while preserving lazy fallback cwd resolution.
- Whitespace-only `backup:verify` target directory values are rejected before
  remote path construction.
- Whitespace-only backup shell-script target directory values are rejected in
  remote-copy branches before SSH/SCP work.
- Whitespace-only backup encryption key-file values are rejected before backup
  artifact or remote-copy work.
- Empty or whitespace-only Qdrant snapshot collection names are rejected before
  metadata or curl snapshot work.
- Invalid restore-smoke app ports are rejected before Docker startup or health
  checks.
