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

- Canonical chunk row mapping now trims stored metadata text while preserving
  raw chunk content for offset correctness.
- Goal-run row mapping now trims stored run and iteration text before returning
  API results.
- Ingest job error persistence and row mapping now trim stored error text and
  normalize blank persisted errors to `null`.
- Audit log row mapping now trims stored text values before returning API
  results and normalizes blank stored error messages to `null`.
- Audit log writes now trim direct organization, actor, tool, project key,
  request ID, and error-message text before SQL writes and list filters.
- Memory archive Qdrant status and compaction-run completion now trim optional
  error messages before SQL writes while preserving blank-to-null behavior.
- Memory archive record apply now trims direct organization IDs before the
  destructive delete/archive CTE.
- Memory archive run creation now trims direct run metadata before SQL insert
  and replay lookup parameters.
- Compaction apply now trims direct organization IDs once before rate-limit,
  compaction-run, archive, and vector-delete side effects.
- MCP HTTP bound-token organization checks now trim direct organization IDs
  before comparing them with the token binding.
- `add_memory_interactive` now trims direct organization, project, and user
  scope identifiers before registry dispatch and structured response echoes.
- `add_memory` now trims direct project keys before legacy repository
  resolution and repository write input construction.
- `compact_memory` now trims direct project keys once and reuses the
  normalized value for repository resolution, compaction planning, and apply
  results.
- `list_memory` tag filters and `inspect_memory_graph` query filters now trim
  direct text before canonical repository calls.
- `build_context_pack` now trims direct task text before retrieval, markdown
  rendering, and context-pack run persistence.
- Goal-run handlers now trim direct goal and attempt text before service and
  embedding dispatch.
- MCP handler tests now guard against raw direct organization ID pass-through
  and raw defaulting patterns at handler boundaries.
- Remaining raw direct organization ID handler pass-throughs were removed from
  search and unarchive boundaries.
- `search_memory` record resolution now trims direct organization identifiers
  before retrieve overrides, legacy collection, and canonical retrieval.
- `add_memory` now trims direct organization identifiers before repository
  input construction for legacy and service-backed write paths.
- `compact_memory` now trims direct organization identifiers once and reuses
  the normalized value for memory listing and compaction apply calls.
- Goal context and repeat-check handlers now trim direct organization
  identifiers before loading goal runs and scoped memories.
- Goal-run service dispatch handlers now trim direct organization identifiers
  before start, iteration, get, list, complete, and abandon calls.
- `list_audit_log` now trims direct organization identifiers before audit log
  listing calls and response echoing.
- `update_memory`, `delete_memory`, and `tag_memory` now trim direct
  organization identifiers before canonical mutation repository and vector
  cleanup calls.
- `inspect_memory_graph` now trims direct organization identifiers before
  canonical graph inspection repository calls.
- MCP governance handlers now trim direct organization identifiers before
  reindexing and governance listing calls.
- `build_context_pack` now trims direct organization identifiers before
  service-backed retrieval and context pack run persistence.
- MCP tool audit instrumentation now trims direct organization identifiers
  before writing success or error audit rows.
- Context pack run persistence now trims direct organization identifiers before
  writing run rows.
- Canonical chunk listing now trims direct organization identifiers before
  building scoped reindex query parameters.
- Canonical chunk replacement now trims direct record organization identifiers
  before transaction deletes and pending ingest job writes.
- Canonical chunk insertion now trims direct record organization identifiers
  before writing chunk rows.
- Canonical chunk deletion now trims direct organization identifiers before
  deleting chunks for a memory record.
- Memory archive recent-apply counting now trims direct organization
  identifiers before rate-limit SQL queries.
- Operator server worker/metrics tests now inject worker and probe-pool
  dependencies directly instead of using module-level mocks that can interfere
  during parallel full-suite runs.
- Unarchive compaction now trims direct organization identifiers before archive
  lookup, canonical restore, chunk insertion, vector upsert, and compensation
  paths.
- Memory archive restore and restored-record compensation delete now trim
  direct organization identifiers before ownership checks and SQL writes.
- Memory archive lookup now trims direct organization identifiers before
  querying archive rows by ID.
- Lifecycle init now trims direct project keys and task text before rendering
  generated hooks and README output.
- Lifecycle init now trims direct user scope identifiers before rendering
  generated hook output.
- Lifecycle init now trims direct organization identifiers before rendering
  generated hooks and README output.
- PGVector queries and deletes now trim direct organization identifiers before
  building SQL filters.
- Qdrant vector queries and deletes now trim direct organization identifiers
  before building backend filters.
- Retrieval now trims direct organization identifiers before vector, lexical,
  and hydration calls.
- Ingest job creation now trims direct organization identifiers before
  insertion.
- Canonical reindex now trims direct organization identifiers before chunk
  paging and vector cleanup calls.
- Memory archive now trims direct organization identifiers before querying.
- Memory deletion now trims direct organization identifiers before querying.
- Single memory record lookup now trims direct organization identifiers before
  querying.
- Memory updates now trim direct organization identifiers before transaction
  reads, writes, tag replacement, and graph refresh.
- Memory creation now trims direct organization identifiers before source and
  memory writes.
- Memory graph inspection now trims direct organization identifiers before
  entity and relationship queries.
- Governance memory listing now trims direct organization identifiers before
  building query parameters.
- Memory ID lookup now trims direct organization identifiers before building
  query parameters.
- Memory listing now trims direct organization identifiers before building
  query parameters.
- Memory lexical search now trims direct organization identifiers before
  building query parameters.
- Goal-run close operations now trim direct organization identifiers before
  updating completed or abandoned runs.
- Goal-run list now trims direct organization and scope identifiers before
  querying.
- Goal-run get now trims direct organization identifiers before run and
  iteration queries.
- Goal-run iteration recording now trims direct organization identifiers before
  run updates, iteration inserts, and memory linking.
- Goal-run start now trims direct organization, scope, and project identifiers
  before insertion.
- Goal-run close operations now trim direct completion/abandonment notes before
  updating.
- Goal-run iteration recording now trims direct attempt, summary, and error
  text before insertion.
- Goal-run start now trims direct goal and termination criteria text before
  insertion.
- Governance memory listing now validates and trims direct tag filters before
  querying.
- Store nullable text normalization now trims nonblank title/summary values
  while preserving blank-to-null behavior.
- Shared MCP optional text normalization now trims nonblank values while
  preserving blank-to-null behavior.
- MCP scope identifier utilities now return trimmed project and user scope IDs
  after nonblank validation.
- `search_memory` handler now trims direct query values before resolving
  records and echoes the normalized query in responses.
- `retrieveMemory` now trims direct lexical queries and skips lexical
  repository search for whitespace-only direct queries.
- Pg pool construction now trims direct connection strings before
  instantiating the node-postgres pool.
- Qdrant client construction now validates direct URLs as absolute HTTP(S)
  URLs and trims URL/API key values before SDK construction.
- Metrics registry now rejects blank direct HTTP route labels and dependency
  check names before rendering Prometheus output.
- OAuth protected-resource challenge helpers now reject blank direct metadata,
  resource, authorization server, and scope strings.
- Operator server direct `ServiceConfig` now validates port and Postgres pool
  numeric fields before construction/startup while preserving `port: 0`.
- Rate limiter decisions now validate `allowed`, `remaining`, and
  `retryAfterMs` before HTTP/MCP handlers write rate-limit responses.
- OAuth verifier fallback results now validate token strings, optional
  organization bindings, and optional scopes before authentication succeeds.
- MCP HTTP direct `bearerTokens` options now validate token entry objects,
  token strings, and optional organization bindings before authentication.
- Operator server direct `bearerTokens` options now reject blank token strings
  and blank organization bindings before server construction/startup.
- Goal-run row mapping now rejects malformed returned run and iteration scalar
  metadata before exposing goal state.
- Audit log row mapping now rejects malformed returned organization, actor,
  tool, nullable project/request IDs, and error message types before exposing
  audit entries.
- Ingest job row mapping now rejects malformed returned organization IDs and
  nullable ingest/qdrant error strings before exposing job state.
- Canonical memory chunk row mapping now rejects malformed returned content,
  embedding version, organization/scope metadata, nullable text fields, and
  tags before exposing stored or reindexable chunk results.
- Memory repository graph row mapping now rejects malformed returned scalar
  metadata and entity kind values before exposing graph inspection results.
- Memory repository hydrated row mapping now rejects malformed returned
  organization, scope, content, and nullable scalar metadata before exposing
  search/list records.
- Memory repository governance archive entrypoint now rejects malformed direct
  memory IDs before querying Postgres.
- Memory repository governance archive result mapping now rejects malformed
  returned status booleans and qdrant point ID arrays.
- Memory repository hydrated row mapping now rejects malformed returned tag
  arrays before exposing search/list records.
- Memory archive repository apply result mapping now rejects malformed returned
  qdrant point ID arrays before exposing cleanup payloads.
- Memory archive repository archive lookup row mapping now rejects malformed
  returned organization, scope, content, and nullable text metadata.
- Memory archive repository compaction run row mapping now rejects malformed
  returned organization IDs before exposing run metadata.
- Memory archive repository pending qdrant cleanup row mapping now rejects
  malformed returned organization IDs and qdrant point ID arrays.
- Memory archive repository compaction command entrypoints now reject malformed
  direct create/apply/complete input objects before querying Postgres.
- Memory archive repository advisory lock acquisition now rejects malformed
  direct lock inputs before querying Postgres.
- Memory archive repository restore now rejects malformed direct archive
  objects before inserting canonical memory rows.
- Memory archive repository compaction run lookup now rejects malformed direct
  idempotency keys before querying run rows.
- Memory archive repository recent-apply counting now rejects malformed direct
  window durations before querying compaction run rows.
- Memory archive repository archive lookup now rejects malformed direct archive
  id lists before querying archive rows.
- Memory archive repository run creation now rejects malformed direct run
  metadata before inserting compaction run rows.
- Memory archive repository apply now rejects malformed direct record-apply
  inputs before the destructive delete/archive CTE.
- Memory archive repository completion now rejects malformed direct run
  completion inputs before updating compaction run rows.
- Unarchive restore now rejects malformed archive scope/kind/durability enum
  values before canonical restore, chunking, embedding, or vector upsert side
  effects run.
- Canonical memory chunk row mapping now rejects malformed stored
  scope/kind/durability enum values before returning reindexable chunk results.
- Memory archive row mapping now rejects malformed stored compaction/archive
  enum values before returning repository results.
- Ingest job row mapping now rejects malformed stored job/qdrant status values
  before returning repository results.
- Goal-run row mapping now rejects malformed stored scope/status/outcome enum
  values before returning repository results.
- Memory hydrated row mapping now rejects malformed stored enum fields before
  returning list/search results.
- Audit log list row mapping now rejects malformed stored `outcome` values
  before returning repository results.
- Shared DB timestamp mapping now rejects malformed timestamp values and
  canonicalizes valid timestamp strings before repository results expose them.
- MCP HTTP per-request cleanup now wraps transport and server close calls before
  settlement, so synchronous transport cleanup failures still allow MCP server
  cleanup to run.
- Operator server cleanup now wraps probe-pool and worker-stop shutdown calls
  before settlement, so synchronous cleanup failures still allow remaining
  cleanup tasks to run and surface as rejected cleanup promises.
- Background worker shutdown now closes canonical services even when one worker
  `stop()` throws synchronously, matching the existing async rejection cleanup
  behavior.
- Background worker startup now validates returned sweeper handles before
  recording workers as started, so malformed injected starters fail through the
  existing startup-failure path instead of breaking later cleanup.
- Background-worker operator server tests now clear module cache and relevant
  mocks before each test, reducing transient full-suite failures from stale
  `vi.doMock` imports.
- MCP session-start prompt limits now reject non-decimal numeric strings before
  schema dispatch, so malformed values like `0x10` cannot be coerced to a valid
  context-pack limit.
- Background queue metrics now reject non-decimal count strings before
  coercion, so malformed values like `0x10` cannot become valid backlog
  gauges.
- Shared DB number mapping now rejects non-decimal numeric strings before
  coercion, so repository row mappers cannot accept malformed values like
  `0x10` as finite database numbers.
- Pgvector query row mapping now rejects non-decimal `score` strings before
  numeric coercion, so malformed values like `0x10` cannot map to valid vector
  scores.
- Pgvector query row mapping now rejects non-decimal `memory_record_id` strings
  before numeric coercion, so malformed values like `0x10` cannot map to valid
  memory record IDs.
- Qdrant and pgvector queries now validate `filter.scopes` is non-empty before
  building backend filters, so empty scope lists cannot widen vector queries.
- Qdrant and pgvector queries now validate the filter is an object before
  reading filter fields, so null filter inputs fail with a clear boundary error
  instead of incidental property access failures.
- Qdrant and pgvector upserts now validate each point vector is an array before
  reading `point.vector.length`, so null point vector inputs fail with a clear
  boundary error instead of incidental property access failures.
- Qdrant and pgvector queries now validate the query vector is an array before
  reading `vector.length`, so null query vector inputs fail with a clear
  boundary error instead of incidental property access failures.
- Qdrant and pgvector `deleteByRecordIds` now validate the record-ID list is an
  array before reading `recordIds.length`, so null delete-by-record inputs fail
  with a clear boundary error instead of incidental property access failures.
- Qdrant and pgvector deletes now validate the point-ID list is an array before
  reading `ids.length`, so null delete inputs fail with a clear boundary error
  instead of incidental property access failures.
- Qdrant and pgvector upserts now validate the point list is an array before
  reading `points.length`, so null point-list inputs fail with a clear boundary
  error instead of incidental property access failures.
- Qdrant and pgvector upserts now validate each `VectorPoint` entry is an
  object before reading payload metadata, so null point entries fail with a
  clear boundary error instead of incidental property access failures.
- Qdrant and pgvector upserts now validate `VectorPoint.payload` is an object
  before reading organization metadata, so null payloads fail with a clear
  boundary error instead of incidental property access failures.
- Qdrant and pgvector upserts now validate `payload.kind` as a non-empty
  string before calling storage clients, so malformed memory kinds cannot reach
  Qdrant or SQL.
- Qdrant and pgvector upserts now validate `payload.project_key` as
  string-or-null before calling storage clients, preserving `null` while
  rejecting missing, non-string, and blank project keys.
- Qdrant and pgvector upserts now validate `payload.scope_type` as a
  non-empty string before calling storage clients, so malformed scope types
  cannot reach Qdrant or SQL.
- Qdrant and pgvector upserts now validate `payload.memory_record_id` as a
  positive safe integer before calling storage clients, so malformed record ids
  cannot reach Qdrant or SQL.
- `buildVectorPoint` now validates required payload metadata fields as
  non-empty strings before producing vector payloads, rejecting blank `kind`,
  `durability`, `updatedAt`, and `embeddingVersion` values.
- `buildVectorPoint` now validates scope metadata fields as non-empty strings
  before producing vector payloads, preserving nullable `projectKey` while
  rejecting blank scoping values.
- Qdrant and pgvector queries now validate optional `filter.projectKey` values
  before calling storage clients, preserving `null`/`undefined` fallback while
  rejecting non-string and blank project keys.
- Qdrant and pgvector queries now validate each `filter.scopes` entry has
  non-empty `scopeType` and `scopeId` strings before calling storage clients.
- Qdrant and pgvector queries now validate `filter.scopes` is an array before
  calling storage clients, replacing incidental iterable/client-path failures
  with clear adapter boundary errors.
- Qdrant and pgvector collection bootstrap now validates dimensions are
  positive safe integers before calling storage clients, so malformed dimensions
  cannot reach Qdrant or SQL.
- Qdrant and pgvector deletes now validate point IDs are non-empty strings
  before calling storage clients, so malformed delete IDs cannot reach Qdrant
  or SQL.
- Qdrant upsert now validates point IDs are non-empty strings before calling
  the Qdrant client, matching the pgvector adapter's point ID boundary guard.
- Pgvector upsert now validates point IDs are non-empty strings before opening
  a database client, so malformed `VectorPoint.id` values cannot reach SQL.
- Pgvector `deleteByRecordIds` now validates record IDs are positive safe
  integers before sending SQL, matching the Qdrant adapter's record ID boundary
  guard.
- Qdrant `deleteByRecordIds` now validates record IDs are positive safe
  integers before building delete filters, so malformed IDs cannot reach the
  Qdrant client.
- Qdrant upsert now validates vector arrays are non-empty and finite before
  calling the Qdrant client, matching the pgvector adapter's upsert-vector
  boundary guard.
- Qdrant query now validates `limit` values are positive safe integers before
  calling the Qdrant client, matching the pgvector adapter's query-limit
  boundary guard.
- Qdrant query now validates query vectors are non-empty and finite before
  calling the Qdrant client, matching the pgvector adapter's query-vector
  boundary guard.
- Pgvector query now validates `limit` values are positive safe integers before
  opening a database client, so invalid SQL `LIMIT` values do not reach
  pgvector queries.
- Pgvector query now validates query vectors are non-empty and finite before
  opening a database client, so invalid query vector literals do not reach
  pgvector SQL.
- Pgvector upsert now validates vector components are finite numbers before
  opening a database client, so invalid `[NaN]`/`[Infinity]` vector literals do
  not reach pgvector SQL.
- Pgvector query result mapping now validates nullable string payload fields
  before returning vector hits, so malformed scalar metadata cannot leak from
  adapter rows into `VectorHit.payload`.
- Pgvector query result mapping now validates returned `organization_id` values
  before returning vector-hit payloads, keeping read-side org metadata aligned
  with the existing write-side org-id guard.
- Pgvector query result mapping now validates returned `tags` values before
  returning vector-hit payloads, preserving the null-to-empty-array fallback
  while rejecting malformed non-array or non-string tag rows.
- Pgvector query result mapping now validates returned `point_id` values before
  returning `VectorHit.id`, so malformed adapter rows cannot leak null or blank
  hit ids.
- Pgvector query result mapping now validates each returned row object before
  reading vector-hit fields, replacing incidental field-access failures with a
  clear adapter boundary error.
- Pgvector query result mapping now validates returned `rows` before mapping
  vector hits, replacing incidental `.map` failures with a clear adapter
  boundary error.
- Qdrant collection bootstrap now validates `collectionExists` responses before
  create/no-create decisions, so malformed non-boolean `exists` values cannot
  silently skip collection creation.
- Qdrant vector query response mapping now validates each point object before
  reading `id`, `score`, or `payload`, replacing incidental field-access
  failures with a clear adapter boundary error.
- Qdrant vector query response mapping now rejects malformed non-object query
  responses before reading `points`, replacing incidental property-access
  failures with a clear adapter boundary error.
- Qdrant vector query response mapping now rejects non-array `points` results
  before mapping hits, replacing incidental `.map` failures with a clear
  adapter boundary error.
- Qdrant vector query row mapping now avoids returning array values as
  `VectorHit.payload` records, preserving the existing empty-payload fallback
  for malformed response payloads.
- `scoreLexicalMatch` now rejects array values for lexical records and source
  objects instead of accepting arrays as plain objects.
- `retrieveMemory` now rejects non-array hydration and lexical repository
  results before ranking, giving repository implementations clear boundary
  errors instead of incidental spread/type failures.
- `retrieveMemory` now rejects non-array `VectorIndex.query` results before
  hydration, giving custom vector-index implementations a clear boundary error
  instead of an incidental spread/type failure.
- `retrieveMemory` now validates vector hit scores as finite numbers before
  ranking hydrated records, so malformed vector-index implementations cannot
  hide invalid scores behind ranking clamps.
- `rankCandidates` now validates candidate `source` and `reasons` fields before
  sorting, rejecting malformed candidate shape instead of returning invalid
  ranking metadata.
- `rankCandidates` now validates candidate score components before sorting,
  rejecting malformed required or optional score values instead of returning
  candidates with invalid score details.
- Ranking now rejects normalized vector and lexical score options outside the
  `0..1` range instead of silently clamping invalid internal scoring inputs.
- Qdrant vector query row mapping now validates returned point IDs before
  returning `VectorHit[]`, preserving numeric-ID coercion while rejecting
  malformed missing or invalid IDs.
- Qdrant vector query row mapping now validates returned scores as finite
  numbers before returning `VectorHit[]`, matching the pgvector adapter's
  fail-closed score boundary.
- Dependency readiness probe durations now use monotonic `hrtime` deltas
  instead of wall-clock `Date.now()` differences, keeping `/readyz` metrics
  non-negative during clock adjustments.
- Metrics registry duration observations now validate HTTP, sweeper, and
  dependency durations as non-negative finite numbers instead of clamping
  negative values to zero.
- Metrics registry HTTP request observations now validate status codes as
  safe integers in the `100..599` range before using them as metric labels.
- Metrics registry sweeper row counters now validate known row outcomes as
  non-negative safe integers instead of clamping negative counts or accepting
  fractional values.
- Metrics registry rendering now validates background queue backlog snapshot
  counts as non-negative safe integers instead of clamping or truncating bad
  collector output.
- Pgvector query row mapping now validates payload `memory_record_id` as a
  positive safe integer while preserving finite-float score mapping.
- Background queue metrics now reject malformed `COUNT(*)` rows instead of
  truncating fractional values or clamping negatives to zero.
- Memory archive repository lookup row mapping now validates archived
  `importance` as a Postgres integer before returning archive rows.
- Memory archive repository run row mapping now validates compaction run ids
  and outcome counters before returning create/find run records.
- Memory archive repository restore row mapping now validates restored
  `memory_records.id` values before returning unarchive results.
- Memory archive repository row mapping now validates Qdrant cleanup attempt
  counters before returning pending or claimed cleanup records.
- Memory archive repository row mapping now validates archive ids and archived
  source id references before returning compaction, cleanup, claim, or
  unarchive rows.
- Audit log repository row mapping now validates audit ids and duration
  counters before returning listed audit entries.
- Goal run repository row mapping now validates run and iteration ids before
  returning mapped goal run records.
- Ingest job repository row mapping now validates job and memory-record ids
  before returning mapped ingest jobs.
- Pending ingest job row mapping now validates returned job id and Qdrant
  attempt counters before committing chunk replacement transactions.
- Memory chunk row mapping now validates chunk and memory-record ids before
  returning stored or reindexable chunks.
- Memory graph relationship row mapping now validates confidence values before
  returning graph relationships.
- Memory graph entity row mapping now validates graph entity ids before
  returning graph entities.
- Add-memory write path now validates returned source and memory record ids
  before using them in follow-up inserts or entity graph persistence.
- Entity mention write-path row mapping now validates returned entity ids before
  inserting mention or relationship rows.
- Memory search result row mapping now validates hydrated memory/source ids
  before returning search/list result records.
- Memory graph relationship row mapping now validates relationship ids and
  entity/evidence record id references before returning graph relationships.
- Memory graph entity row mapping now validates `mention_count` and
  `memory_ids` before returning graph entities or querying relationships.
- Goal run repository row mapping now validates `iteration_count` and
  `iteration_index` counter rows before returning runs or iterations.
- Memory repository row mapping now validates `memory_records.importance` from
  hydrated DB rows before returning search/list results or rebuilding entity
  graph inputs.
- Memory chunk row mapping now validates `chunk_index`, `start_offset`, and
  `end_offset` from `memory_chunks` DB rows before returning stored or
  reindexable chunks.
- Ingest job repository row mapping now validates `attempts` and
  `qdrant_attempts` as non-negative safe integers from DB row values, with
  mock-pool coverage for string and malformed counter rows.
- Memory archive repository row mapping now handles node-postgres string
  `BIGSERIAL`/`BIGINT` values for archive/run/cleanup/restore IDs.
- Compaction recent-apply count mapping now rejects malformed `COUNT(*)` rows
  instead of accepting `Number.parseInt` partial numeric strings.
- Pgvector query row mapping now rejects malformed `score` and
  `memory_record_id` values before returning vector hits.
- Audit log listing now reuses shared DB row helpers for numeric and timestamp
  mapping, so malformed audit row numeric values fail consistently.
- Shared DB number mapping now rejects non-number/string runtime values before
  JavaScript coercion can turn `null`, booleans, or arrays into numeric values.
- Shared DB number mapping now rejects malformed finite-number values before
  repository row mapping can silently propagate `NaN`.
- Code-quality audit triage notes now record current-branch resolution evidence
  for addressed CQ findings without force-adding ignored audit snapshots.
- `rankResults` now parses canonical `updatedAt` timestamps once per record and
  reuses them through recency scoring and tie-break sorting.
- `runOutboxSweep` now batches pending Qdrant cleanup deletes by organization,
  reducing vector backend delete calls while preserving row-level status
  accounting.
- Bearer auth unit coverage now directly guards `authenticateBearer` static
  token precedence, OAuth fallback, and null-result behavior on the active API.
- Bearer auth no longer exports the unused `matchBearerFromRequest` request
  wrapper; active HTTP and MCP callers pass authorization header strings
  directly to `authenticateBearer`.
- Bearer auth no longer exports the unused `checkBearer` and
  `checkBearerFromRequest` boolean compatibility wrappers; tests now focus on
  the active token-loading and token-matching API.
- `updateMemoryRecord` now reuses parsed source metadata while rebuilding entity
  graph provenance, avoiding duplicate `source_ref` JSON parsing and duplicate
  malformed-source warnings.
- Public docs drift coverage now keeps README, architecture, and API reference
  secret scrubber summaries aligned with the implemented provider-key,
  bearer/JWT, PEM, and credentialed database URL categories.
- MCP type exports no longer include the unused
  `CompactMemoryToolInput_v2Extension` and `_AuditLogEntryRef` aliases.
- Shared DB row helpers now centralize `requireSingleRow`, `toNumber`, and
  `toIsoString` for repository modules that previously duplicated them.
- Tool registry audit writes now keep their best-effort non-blocking behavior
  while logging `warn` events when audit persistence fails.
- TypeScript source convention coverage now rejects unsafe `any` and `never`
  type-erasure assertions in runtime and script sources while leaving test-only
  malformed-input casts available.
- `chunkText` now consumes regex token matches into a bounded overlap window
  instead of materializing all match objects upfront, with tests guarding exact
  target-boundary and final partial overlap behavior.
- Postgres pool configuration now supports documented `PG_POOL_MAX`,
  `PG_IDLE_TIMEOUT_MS`, and `PG_CONNECT_TIMEOUT_MS` tuning, with config parsing,
  pool construction, runtime startup, migrations, and focused tests using the
  validated values.
- Qdrant vector query coverage now guards payload projection, and the Qdrant
  adapter requests only `memory_record_id` plus no vectors for search
  hydration, avoiding unnecessary response payload transfer.
- Rate limiter coverage now guards stale in-memory bucket eviction, and the
  token-bucket limiter drops buckets idle for a full refill window so rotated
  tokens or future wider key spaces do not accumulate forever.
- Public docs drift coverage now guards that rate-limit docs describe
  `RATE_LIMIT_PER_MINUTE` as process-local in-memory state, with multi-replica
  deployments requiring a shared proxy or edge limiter for strict
  deployment-wide quotas.
- CI workflow hygiene coverage now guards that individual jobs do not override
  the workflow-level `contents: read` token permissions, keeping CI token
  access centralized and read-only unless reviewed.
- Package manifest coverage now guards that the package-lock root descriptor
  does not declare `bin` executable metadata, keeping npm-installed executable
  entrypoint surface absent unless reviewed.
- Package manifest coverage now guards that the package-lock root descriptor
  does not declare `os`, `cpu`, or `libc` platform restriction metadata, keeping
  the self-hosted npm install surface platform-neutral unless reviewed.
- Package manifest coverage now guards that direct development dependencies
  exist in lockfile package descriptors without `optional` or `devOptional`
  flags, while keeping the current direct dev-only lockfile package set
  explicit for review.
- Package manifest coverage now guards that direct runtime dependencies exist
  in lockfile package descriptors without `dev`, `optional`, or `devOptional`
  flags so runtime packages cannot drift into dev-only or optional install
  paths without review.
- Package manifest coverage now guards that non-root lockfile package
  descriptors resolve from `https://registry.npmjs.org/` and carry `sha512-`
  integrity metadata so git, file, link, local tarball, or non-registry HTTP
  package sources cannot appear without review.
- Package manifest coverage now guards that lockfile package descriptors do not
  declare `hasShrinkwrap` metadata so nested package-scoped shrinkwrap
  lockfiles cannot appear without review.
- Package manifest coverage now guards that lockfile package descriptors do not
  declare `inBundle` or `link` metadata so bundled dependency extraction or
  local/symlink package resolution cannot appear without review.
- Package manifest coverage now guards the lockfile package descriptors that
  declare `hasInstallScript: true` so dependency tree drift cannot add new
  preinstall/install/postinstall package scripts without review.
- Package manifest coverage now guards that package `types` and `typings`
  metadata stay absent so TypeScript declaration entrypoints cannot appear
  without an explicit public API packaging decision.
- Package manifest coverage now guards that package `man` and `directories`
  metadata stay absent so npm-installed manual page or directory-derived
  bin/man surfaces cannot appear without an explicit packaging decision.
- Package manifest coverage now guards that package `gypfile` metadata and
  tracked root `binding.gyp` stay absent so native addon build behavior cannot
  appear without an explicit packaging decision.
- Package manifest coverage now guards that package `browser` stays absent so
  client-side entrypoint metadata cannot appear without an explicit packaging
  decision for this Node-oriented MCP server.
- Package manifest coverage now guards that package `config` stays absent in
  package and lockfile root metadata so npm package script configuration cannot
  appear without an explicit tooling policy decision.
- Package manifest coverage now guards that package `devEngines` stays absent
  in package and lockfile root metadata so npm-managed dev-time gates cannot
  appear without an explicit tooling policy decision.
- Package manifest coverage now guards that package `peerDependencies` and
  `peerDependenciesMeta` stay absent in package and lockfile root metadata so
  host/plugin dependency contracts cannot drift in silently.
- Package manifest coverage now guards that package `optionalDependencies`
  stays absent in package and lockfile root metadata so runtime dependency
  failure semantics cannot drift silently.
- Package manifest coverage now guards that package `workspaces` stays absent
  so workspace install/symlink behavior cannot appear without an explicit repo
  architecture decision.
- Package manifest coverage now guards that package `bundleDependencies` and
  `bundledDependencies` stay absent so npm tarballs cannot silently bundle
  dependency contents.
- Package manifest coverage now guards that package `publishConfig` stays absent
  so publish-time registry, tag, and access behavior cannot drift silently.
- Package manifest coverage now guards that package `os`, `cpu`, and `libc`
  platform restrictions stay absent for the self-hosted npm install surface.
- Package manifest coverage now guards that npm install/publish lifecycle
  scripts stay absent except for the existing `prepack` build hook.
- Package manifest coverage now guards that tracked `npm-shrinkwrap.json` stays
  absent so `package-lock.json` remains the active npm lockfile.
- Package manifest coverage now guards that the npm package is not marked
  `private: true`, avoiding accidental publish refusal.
- Package manifest coverage now guards stable npm package identity metadata for
  package name and SPDX license without pinning normal release version changes.
- Package manifest coverage now guards that the package does not add a
  top-level `main` entrypoint alongside the existing `bin` and `exports`
  absence checks.
- Package manifest coverage now guards npm package support metadata for
  homepage, repository, issue tracker, and author.
- Package manifest coverage now guards that the current `esbuild` npm override
  is reflected in lockfile package resolution.
- Package manifest coverage now guards top-level `type: "module"` metadata
  for generated `.js` ESM module resolution.
- Package manifest coverage now guards the current npm override for `esbuild`
  build tooling metadata.
- Package manifest coverage now guards the intended runtime dependency set
  separately from development-only tooling.
- Package manifest coverage now guards documented backup creation scripts for
  backend-aware, forced-Qdrant, and forced-pgvector backup paths.
- Package manifest coverage now guards documented development watch scripts
  for HTTP, worker, MCP, CLI, and Vitest watch mode.
- Package manifest coverage now guards documented operator package scripts that
  run built server, worker, migration, lifecycle, backup, and restore artifacts.
- Package manifest coverage now guards the contributor-facing `typecheck` and
  `test` package scripts used by local verification guidance.
- Package manifest coverage now guards that `package-lock.json` top-level
  identity and v3 format stay aligned with the current package manifest.
- Package manifest coverage now guards that `package-lock.json` root package
  identity and dependency metadata stays aligned with `package.json`.
- Package manifest coverage now guards that `package-lock.json` root runtime
  metadata stays aligned with `package.json`.
- Package manifest coverage now guards that the package stays on the supported
  Node 22 runtime line and matching root `@types/node` line.
- CI workflow hygiene coverage now guards that every CI job installs
  dependencies after setting up Node.
- CI workflow hygiene coverage now guards that every CI job checks out the
  repository before setting up Node.
- CI workflow hygiene coverage now guards that Postgres and pgvector integration
  jobs run on the minimum supported Node 22 runtime.
- CI workflow hygiene coverage now guards that the Node matrix keeps
  `fail-fast: false` so one runtime failure does not cancel the sibling runtime.
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
