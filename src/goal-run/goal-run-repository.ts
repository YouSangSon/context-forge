import type { PgPool } from "../db/connection.js";
import { requireSingleRow, toIsoString, toNumber } from "../store/db-utils.js";
import type {
  CloseGoalRunInput,
  GoalRun,
  GoalRunIteration,
  GoalRunIterationOutcome,
  GoalRunRepository,
  GoalRunScopeType,
  GoalRunStatus,
  GoalRunWithIterations,
  ListGoalRunsInput,
  RecordIterationInput,
  StartGoalRunInput,
} from "../types.js";
import { assertNonBlankText } from "../store/memory-content.js";

// Thrown when an iteration or close targets a run that does not exist for the
// caller's organization, or that has already been completed/abandoned. Callers
// (tool handlers, HTTP routes) translate this into a not-found / conflict
// response rather than a 500.
export class GoalRunNotActiveError extends Error {
  readonly goalRunId: number;

  constructor(goalRunId: number) {
    super(`Goal run ${goalRunId} is not an active run for this organization`);
    this.name = "GoalRunNotActiveError";
    this.goalRunId = goalRunId;
  }
}

type GoalRunRow = {
  id: number | string;
  organization_id: string;
  scope_type: unknown;
  scope_id: string;
  project_key: string | null;
  goal: string;
  termination_criteria: string | null;
  status: unknown;
  iteration_count: number | string;
  created_at: string | Date;
  updated_at: string | Date;
  closed_at: string | Date | null;
  close_note: string | null;
};

type GoalRunIterationRow = {
  id: number | string;
  goal_run_id: number | string;
  organization_id: string;
  iteration_index: number | string;
  attempt: string;
  outcome: unknown;
  summary: string | null;
  error: string | null;
  created_at: string | Date;
};

const RUN_COLUMNS = `
  id,
  organization_id,
  scope_type,
  scope_id,
  project_key,
  goal,
  termination_criteria,
  status,
  iteration_count,
  created_at,
  updated_at,
  closed_at,
  close_note
`;

const ITERATION_COLUMNS = `
  id,
  goal_run_id,
  organization_id,
  iteration_index,
  attempt,
  outcome,
  summary,
  error,
  created_at
`;

export function createGoalRunRepository(pool: PgPool): GoalRunRepository {
  assertGoalRunPool(pool);

  return {
    async start(input) {
      assertStartInput(input);
      const organizationId = input.organizationId.trim();
      const scopeId = input.scopeId.trim();
      const projectKey =
        input.projectKey === undefined || input.projectKey === null
          ? null
          : input.projectKey.trim();
      const terminationCriteria =
        input.terminationCriteria === undefined ||
        input.terminationCriteria === null
          ? null
          : input.terminationCriteria.trim();

      const result = await pool.query<GoalRunRow>(
        `
          INSERT INTO goal_runs (
            organization_id, scope_type, scope_id, project_key,
            goal, termination_criteria
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING ${RUN_COLUMNS}
        `,
        [
          organizationId,
          input.scopeType,
          scopeId,
          projectKey,
          input.goal.trim(),
          terminationCriteria,
        ],
      );

      return mapRun(requireSingleRow(result.rows[0], "goal run"));
    },

    async recordIteration(input) {
      assertRecordIterationInput(input);
      const organizationId = input.organizationId.trim();
      const summary =
        input.summary === undefined || input.summary === null
          ? null
          : input.summary.trim();
      const error =
        input.error === undefined || input.error === null
          ? null
          : input.error.trim();

      const client = await pool.connect();
      try {
        await client.query("BEGIN");

        // Conditional bump locks the run row and atomically yields the next
        // index. No row back => run missing, wrong org, or already closed.
        const bump = await client.query<{ iteration_count: number | string }>(
          `
            UPDATE goal_runs
            SET iteration_count = iteration_count + 1,
                updated_at = NOW()
            WHERE id = $1
              AND organization_id = $2
              AND status = 'active'
            RETURNING iteration_count
          `,
          [input.goalRunId, organizationId],
        );

        const bumped = bump.rows[0];
        if (!bumped) {
          await client.query("ROLLBACK");
          throw new GoalRunNotActiveError(input.goalRunId);
        }

        const iterationIndex = toPositiveSafeInteger(
          bumped.iteration_count,
          "goal run iteration_count",
        );

        const inserted = await client.query<GoalRunIterationRow>(
          `
            INSERT INTO goal_run_iterations (
              goal_run_id, organization_id, iteration_index,
              attempt, outcome, summary, error
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING ${ITERATION_COLUMNS}
          `,
          [
            input.goalRunId,
            organizationId,
            iterationIndex,
            input.attempt.trim(),
            input.outcome,
            summary,
            error,
          ],
        );

        if (input.memoryIds && input.memoryIds.length > 0) {
          // Link supplied memories to this run so the compaction pin protects
          // them while the run is active. Org-scoped so callers cannot annex
          // another tenant's records.
          await client.query(
            `
              UPDATE memory_records
              SET goal_run_id = $1
              WHERE id = ANY($2::bigint[])
                AND organization_id = $3
            `,
            [input.goalRunId, input.memoryIds, organizationId],
          );
        }

        const iteration = mapIteration(
          requireSingleRow(inserted.rows[0], "iteration"),
        );
        await client.query("COMMIT");
        return iteration;
      } catch (error: unknown) {
        await client.query("ROLLBACK").catch(() => undefined);
        throw error;
      } finally {
        client.release();
      }
    },

    async get(input) {
      assertGetInput(input);

      const runResult = await pool.query<GoalRunRow>(
        `
          SELECT ${RUN_COLUMNS}
          FROM goal_runs
          WHERE id = $1 AND organization_id = $2
        `,
        [input.goalRunId, input.organizationId],
      );

      const runRow = runResult.rows[0];
      if (!runRow) {
        return null;
      }

      const iterationResult = await pool.query<GoalRunIterationRow>(
        `
          SELECT ${ITERATION_COLUMNS}
          FROM goal_run_iterations
          WHERE goal_run_id = $1 AND organization_id = $2
          ORDER BY iteration_index ASC
        `,
        [input.goalRunId, input.organizationId],
      );

      const withIterations: GoalRunWithIterations = {
        ...mapRun(runRow),
        iterations: iterationResult.rows.map(mapIteration),
      };
      return withIterations;
    },

    async list(input) {
      assertListInput(input);

      const params: unknown[] = [
        input.organizationId,
        input.scopeType,
        input.scopeId,
      ];
      let statusFilter = "";
      if (input.status) {
        params.push(input.status);
        statusFilter = `AND status = $${params.length}`;
      }

      const result = await pool.query<GoalRunRow>(
        `
          SELECT ${RUN_COLUMNS}
          FROM goal_runs
          WHERE organization_id = $1
            AND scope_type = $2
            AND scope_id = $3
            ${statusFilter}
          ORDER BY created_at DESC
        `,
        params,
      );

      return result.rows.map(mapRun);
    },

    async complete(input) {
      return closeRun(pool, input, "completed");
    },

    async abandon(input) {
      return closeRun(pool, input, "abandoned");
    },
  };
}

async function closeRun(
  pool: PgPool,
  input: CloseGoalRunInput,
  status: "completed" | "abandoned",
): Promise<GoalRun> {
  assertCloseInput(input);
  const note =
    input.note === undefined || input.note === null ? null : input.note.trim();

  const result = await pool.query<GoalRunRow>(
    `
      UPDATE goal_runs
      SET status = $3,
          close_note = $4,
          closed_at = NOW(),
          updated_at = NOW()
      WHERE id = $1
        AND organization_id = $2
        AND status = 'active'
      RETURNING ${RUN_COLUMNS}
    `,
    [input.goalRunId, input.organizationId, status, note],
  );

  const row = result.rows[0];
  if (!row) {
    throw new GoalRunNotActiveError(input.goalRunId);
  }

  return mapRun(row);
}

function mapRun(row: GoalRunRow): GoalRun {
  return {
    id: toPositiveSafeInteger(row.id, "goal run id"),
    organizationId: mapRequiredText(
      row.organization_id,
      "goal run organization_id",
    ),
    scopeType: toGoalRunScopeType(row.scope_type, "goal run scope_type"),
    scopeId: mapRequiredText(row.scope_id, "goal run scope_id"),
    projectKey: mapNullableNonBlankText(
      row.project_key,
      "goal run project_key",
    ),
    goal: mapRequiredText(row.goal, "goal run goal"),
    terminationCriteria: mapNullableNonBlankText(
      row.termination_criteria,
      "goal run termination_criteria",
    ),
    status: toGoalRunStatus(row.status, "goal run status"),
    iterationCount: toNonNegativeSafeInteger(
      row.iteration_count,
      "goal run iteration_count",
    ),
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at),
    closedAt: row.closed_at === null ? null : toIsoString(row.closed_at),
    closeNote: mapNullableNonBlankText(row.close_note, "goal run close_note"),
  };
}

function mapIteration(row: GoalRunIterationRow): GoalRunIteration {
  return {
    id: toPositiveSafeInteger(row.id, "goal run iteration id"),
    goalRunId: toPositiveSafeInteger(
      row.goal_run_id,
      "goal run iteration goal_run_id",
    ),
    organizationId: mapRequiredText(
      row.organization_id,
      "goal run iteration organization_id",
    ),
    iterationIndex: toPositiveSafeInteger(
      row.iteration_index,
      "goal run iteration_index",
    ),
    attempt: mapRequiredText(row.attempt, "goal run iteration attempt"),
    outcome: toGoalRunIterationOutcome(
      row.outcome,
      "goal run iteration outcome",
    ),
    summary: mapNullableNonBlankText(
      row.summary,
      "goal run iteration summary",
    ),
    error: mapNullableNonBlankText(row.error, "goal run iteration error"),
    createdAt: toIsoString(row.created_at),
  };
}

function toNonNegativeSafeInteger(value: unknown, fieldName: string): number {
  const numberValue = toNumber(value);
  if (!Number.isSafeInteger(numberValue) || numberValue < 0) {
    throw new Error(`${fieldName} must be a non-negative safe integer`);
  }
  return numberValue;
}

function toPositiveSafeInteger(value: unknown, fieldName: string): number {
  const numberValue = toNumber(value);
  assertPositiveSafeInteger(numberValue, fieldName);
  return numberValue;
}

function mapRequiredText(value: unknown, fieldName: string): string {
  assertNonBlankText(value, fieldName);
  return value;
}

function mapNullableNonBlankText(
  value: unknown,
  fieldName: string,
): string | null {
  if (value === null) {
    return null;
  }
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string or null`);
  }
  if (value.trim().length === 0) {
    throw new Error(`${fieldName} must contain non-whitespace text`);
  }
  return value;
}

function toGoalRunScopeType(
  value: unknown,
  fieldName: string,
): GoalRunScopeType {
  assertGoalRunScopeType(value, fieldName);
  return value;
}

function toGoalRunStatus(value: unknown, fieldName: string): GoalRunStatus {
  assertGoalRunStatus(value, fieldName);
  return value;
}

function toGoalRunIterationOutcome(
  value: unknown,
  fieldName: string,
): GoalRunIterationOutcome {
  assertGoalRunIterationOutcome(value, fieldName);
  return value;
}

function assertGoalRunPool(value: unknown): asserts value is PgPool {
  const candidate = assertObject(value, "goal run pool");
  assertFunction(candidate.query, "goal run pool.query");
  assertFunction(candidate.connect, "goal run pool.connect");
}

function assertStartInput(value: unknown): asserts value is StartGoalRunInput {
  const candidate = assertObject(value, "goal run start input");
  assertNonBlankText(candidate.organizationId, "organizationId");
  assertGoalRunScopeType(candidate.scopeType, "scopeType");
  assertNonBlankText(candidate.scopeId, "scopeId");
  assertOptionalNonBlankStringOrNull(candidate.projectKey, "projectKey");
  assertNonBlankText(candidate.goal, "goal");
  assertOptionalNonBlankStringOrNull(
    candidate.terminationCriteria,
    "terminationCriteria",
  );
}

function assertRecordIterationInput(
  value: unknown,
): asserts value is RecordIterationInput {
  const candidate = assertObject(value, "goal run iteration input");
  assertNonBlankText(candidate.organizationId, "organizationId");
  assertPositiveSafeInteger(candidate.goalRunId, "goalRunId");
  assertNonBlankText(candidate.attempt, "attempt");
  assertGoalRunIterationOutcome(candidate.outcome, "outcome");
  assertOptionalNonBlankStringOrNull(candidate.summary, "summary");
  assertOptionalNonBlankStringOrNull(candidate.error, "error");
  assertOptionalPositiveSafeIntegerArray(candidate.memoryIds, "memoryIds");
}

function assertGetInput(
  value: unknown,
): asserts value is { organizationId: string; goalRunId: number } {
  const candidate = assertObject(value, "goal run get input");
  assertNonBlankText(candidate.organizationId, "organizationId");
  assertPositiveSafeInteger(candidate.goalRunId, "goalRunId");
}

function assertListInput(value: unknown): asserts value is ListGoalRunsInput {
  const candidate = assertObject(value, "goal run list input");
  assertNonBlankText(candidate.organizationId, "organizationId");
  assertGoalRunScopeType(candidate.scopeType, "scopeType");
  assertNonBlankText(candidate.scopeId, "scopeId");
  if (candidate.status !== undefined) {
    assertGoalRunStatus(candidate.status, "status");
  }
}

function assertCloseInput(value: unknown): asserts value is CloseGoalRunInput {
  const candidate = assertObject(value, "goal run close input");
  assertNonBlankText(candidate.organizationId, "organizationId");
  assertPositiveSafeInteger(candidate.goalRunId, "goalRunId");
  assertOptionalNonBlankStringOrNull(candidate.note, "note");
}

function assertGoalRunScopeType(
  value: unknown,
  fieldName: string,
): asserts value is GoalRunScopeType {
  if (value !== "project" && value !== "user") {
    throw new Error(`${fieldName} must be "project" or "user"`);
  }
}

function assertGoalRunStatus(
  value: unknown,
  fieldName: string,
): asserts value is GoalRunStatus {
  if (value !== "active" && value !== "completed" && value !== "abandoned") {
    throw new Error(`${fieldName} must be "active", "completed", or "abandoned"`);
  }
}

function assertGoalRunIterationOutcome(
  value: unknown,
  fieldName: string,
): asserts value is GoalRunIterationOutcome {
  if (value !== "success" && value !== "failure" && value !== "partial") {
    throw new Error(`${fieldName} must be "success", "failure", or "partial"`);
  }
}

function assertOptionalNonBlankStringOrNull(
  value: unknown,
  fieldName: string,
): void {
  if (value === undefined || value === null) {
    return;
  }
  assertNonBlankText(value, fieldName);
}

function assertOptionalPositiveSafeIntegerArray(
  value: unknown,
  fieldName: string,
): void {
  if (value === undefined) {
    return;
  }
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
  for (const [index, item] of value.entries()) {
    assertPositiveSafeInteger(item, `${fieldName}[${index}]`);
  }
}

function assertPositiveSafeInteger(
  value: unknown,
  fieldName: string,
): asserts value is number {
  if (!Number.isSafeInteger(value) || (value as number) < 1) {
    throw new Error(`${fieldName} must be a positive safe integer`);
  }
}

function assertObject(
  value: unknown,
  fieldName: string,
): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${fieldName} must be an object`);
  }
  return value as Record<string, unknown>;
}

function assertFunction(value: unknown, fieldName: string): void {
  if (typeof value !== "function") {
    throw new Error(`${fieldName} must be a function`);
  }
}
