// Qdrant adapter implementing the VectorIndex port.
//
// All Qdrant-specific concerns live here:
//   - The VectorFilter → { must: [{key, match}] } dialect translation
//   - The empty-list guard (Qdrant rejects empty point deletes in some versions)
//
// Nothing outside this file should reference QdrantClient or Qdrant filter
// syntax. This is the single place to swap for a pgvector adapter.

import type { QdrantClient, Schemas } from "@qdrant/js-client-rest";
import type {
  VectorDeleteOptions,
  VectorFilter,
  VectorHit,
  VectorIndex,
  VectorPoint,
} from "./vector-index.js";
import {
  assertVectorPointOrganizationIds,
  normalizeOptionalVectorOrganizationId,
} from "./organization-id.js";

type QdrantFilterClause = {
  key: string;
  match: { value: string };
};

type QdrantQueryPoint = {
  id: unknown;
  score: unknown;
  payload?: unknown;
};

type QdrantQueryResponse = {
  points: unknown;
};

type QdrantCollectionExistsResponse = {
  exists: boolean;
};

function buildQdrantMust(filter: unknown): QdrantFilterClause[] {
  assertQdrantFilter(filter);
  const organizationId =
    normalizeOptionalVectorOrganizationId(filter.organizationId);
  const scopes = normalizeQdrantFilterScopes(filter.scopes);
  const projectKey = normalizeQdrantOptionalProjectKey(filter.projectKey);

  const must: QdrantFilterClause[] = [];

  if (organizationId) {
    must.push({ key: "organization_id", match: { value: organizationId } });
  }

  for (const scope of scopes) {
    must.push({ key: "scope_type", match: { value: scope.scopeType } });

    if (scope.scopeType === "project" && projectKey != null) {
      must.push({ key: "project_key", match: { value: projectKey } });
    } else {
      must.push({ key: "scope_id", match: { value: scope.scopeId } });
    }
  }

  return must;
}

export function createQdrantVectorIndex(
  client: QdrantClient,
  collectionName: string,
): VectorIndex {
  return {
    // Non-destructive: creates the collection only when absent.
    // MUST NOT drop an existing collection — a live collection with data
    // must pass through unchanged. The pgvector adapter's ensureCollection
    // will follow the same create-if-not-exists contract.
    async ensureCollection(dimensions: number): Promise<void> {
      assertQdrantPositiveSafeInteger(dimensions, "dimensions");
      const response: unknown = await client.collectionExists(collectionName);
      assertQdrantCollectionExistsResponse(response);
      if (!response.exists) {
        await client.createCollection(collectionName, {
          vectors: { size: dimensions, distance: "Cosine" },
        });
      }
    },

    async upsert(points: VectorPoint[]): Promise<void> {
      assertVectorPointOrganizationIds(points);
      if (points.length === 0) return;

      for (const point of points) {
        assertQdrantPointId(point);
        assertQdrantPointVector(point);
        assertQdrantPointMemoryRecordId(point);
        assertQdrantPointScopeType(point);
        assertQdrantPointScopeId(point);
        assertQdrantPointProjectKey(point);
        assertQdrantPointKind(point);
      }

      await client.upsert(collectionName, { points });
    },

    async query(vector: number[], filter: VectorFilter, limit: number): Promise<VectorHit[]> {
      assertQdrantQueryVector(vector);
      assertQdrantPositiveSafeInteger(limit, "limit");
      const must = buildQdrantMust(filter);
      const response: unknown = await client.query(collectionName, {
        query: vector,
        limit,
        filter: { must },
        with_payload: ["memory_record_id"],
        with_vector: false,
      });
      assertQdrantQueryResponse(response);

      const points: unknown = response.points;
      assertQdrantPoints(points);

      return points.map((point) => ({
        id: toQdrantPointId(point.id, "id"),
        score: toQdrantFiniteNumber(point.score, "score"),
        payload: point.payload && typeof point.payload === "object" && !Array.isArray(point.payload)
          ? (point.payload as Record<string, unknown>)
          : {},
      }));
    },

    async delete(ids: string[], options: VectorDeleteOptions = {}): Promise<void> {
      const organizationId =
        normalizeOptionalVectorOrganizationId(options.organizationId);

      // Guard: Qdrant rejects empty point lists with 400 in some versions.
      assertQdrantPointIds(ids);
      if (ids.length === 0) return;
      const selector: Schemas["PointsSelector"] = organizationId
        ? {
            filter: {
              must: [
                { has_id: ids },
                {
                  key: "organization_id",
                  match: { value: organizationId },
                },
              ],
            },
          }
        : { points: ids };

      await client.delete(collectionName, selector);
    },

    async deleteByRecordIds(
      recordIds: number[],
      options: VectorDeleteOptions = {},
    ): Promise<void> {
      const organizationId =
        normalizeOptionalVectorOrganizationId(options.organizationId);

      // Guard: an empty/null filter would delete the entire collection.
      assertQdrantRecordIds(recordIds);
      if (recordIds.length === 0) return;
      const recordIdFilter = {
        should: recordIds.map((id) => ({
          key: "memory_record_id",
          match: { value: id },
        })),
      };
      const selector: Schemas["PointsSelector"] = organizationId
        ? {
            filter: {
              must: [
                recordIdFilter,
                {
                  key: "organization_id",
                  match: { value: organizationId },
                },
              ],
            },
          }
        : { filter: recordIdFilter };

      await client.delete(collectionName, selector);
    },
  };
}

function assertQdrantQueryVector(vector: unknown): asserts vector is readonly number[] {
  if (!Array.isArray(vector)) {
    throw new Error("query vector must be an array");
  }

  if (vector.length === 0) {
    throw new Error("query vector must be a non-empty array");
  }

  assertQdrantFiniteVectorComponents(vector, "query vector");
}

function assertQdrantPointVector(point: VectorPoint): void {
  if (!Array.isArray(point.vector)) {
    throw new Error(`upsert: point "${point.id}" vector must be an array`);
  }

  if (point.vector.length === 0) {
    throw new Error(
      `upsert: point "${point.id}" has an empty embedding vector. ` +
      "Ensure the embedding step produced a valid vector before calling upsert.",
    );
  }

  assertQdrantFiniteVectorComponents(point.vector, "vector");
}

function assertQdrantPointId(point: VectorPoint): void {
  assertQdrantNonEmptyString(point.id, "point.id");
}

function assertQdrantPointIds(ids: unknown): asserts ids is readonly string[] {
  if (!Array.isArray(ids)) {
    throw new Error("delete: ids must be an array");
  }

  for (const [index, id] of ids.entries()) {
    assertQdrantNonEmptyString(id, `ids[${index}]`);
  }
}

function assertQdrantPointMemoryRecordId(point: VectorPoint): void {
  assertQdrantPositiveSafeInteger(
    point.payload.memory_record_id,
    "point.payload.memory_record_id",
  );
}

function assertQdrantPointScopeType(point: VectorPoint): void {
  assertQdrantNonEmptyString(
    point.payload.scope_type,
    "point.payload.scope_type",
  );
  if (
    point.payload.scope_type !== "user" &&
    point.payload.scope_type !== "project"
  ) {
    throw new Error(
      "point.payload.scope_type must be one of: user, project",
    );
  }
}

function assertQdrantPointScopeId(point: VectorPoint): void {
  if (point.payload.scope_type !== "user") {
    return;
  }
  assertQdrantNonEmptyString(
    point.payload.scope_id,
    "point.payload.scope_id",
  );
}

function assertQdrantPointProjectKey(point: VectorPoint): void {
  const projectKey = point.payload.project_key;
  if (projectKey === null) {
    return;
  }
  if (typeof projectKey !== "string") {
    throw new Error("point.payload.project_key must be a string or null");
  }
  assertQdrantNonEmptyString(projectKey, "point.payload.project_key");
}

function assertQdrantPointKind(point: VectorPoint): void {
  assertQdrantNonEmptyString(
    point.payload.kind,
    "point.payload.kind",
  );
}

function assertQdrantNonEmptyString(
  value: unknown,
  fieldName: string,
): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
}

function normalizeQdrantOptionalProjectKey(
  value: unknown,
): string | null | undefined {
  if (value == null) {
    return value;
  }
  if (typeof value !== "string") {
    throw new Error("filter.projectKey must be a string or null");
  }
  assertQdrantNonEmptyString(value, "filter.projectKey");
  return value.trim();
}

function assertQdrantFilter(filter: unknown): asserts filter is VectorFilter {
  if (typeof filter !== "object" || filter === null || Array.isArray(filter)) {
    throw new Error("filter must be an object");
  }
}

function assertQdrantFiniteVectorComponents(
  vector: readonly unknown[],
  fieldName: string,
): void {
  for (const [index, component] of vector.entries()) {
    if (typeof component !== "number" || !Number.isFinite(component)) {
      throw new Error(`${fieldName}[${index}] must be a finite number`);
    }
  }
}

function assertQdrantPositiveSafeInteger(
  value: unknown,
  fieldName: string,
): void {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value <= 0
  ) {
    throw new Error(`${fieldName} must be a positive safe integer`);
  }
}

function assertQdrantRecordIds(recordIds: unknown): asserts recordIds is readonly number[] {
  if (!Array.isArray(recordIds)) {
    throw new Error("deleteByRecordIds: recordIds must be an array");
  }

  for (const [index, recordId] of recordIds.entries()) {
    assertQdrantPositiveSafeInteger(recordId, `recordIds[${index}]`);
  }
}

function normalizeQdrantFilterScopes(
  scopes: unknown,
): VectorFilter["scopes"] {
  if (!Array.isArray(scopes)) {
    throw new Error("filter.scopes must be an array");
  }
  if (scopes.length === 0) {
    throw new Error("filter.scopes must be a non-empty array");
  }

  return scopes.map((scope, index) => {
    if (typeof scope !== "object" || scope === null || Array.isArray(scope)) {
      throw new Error(`filter.scopes[${index}] must be an object`);
    }

    const candidate = scope as Record<string, unknown>;
    const scopeType = normalizeQdrantScopeType(
      candidate.scopeType,
      `filter.scopes[${index}].scopeType`,
    );
    const scopeId = normalizeQdrantNonEmptyString(
      candidate.scopeId,
      `filter.scopes[${index}].scopeId`,
    );
    return { scopeType, scopeId };
  });
}

function normalizeQdrantNonEmptyString(
  value: unknown,
  fieldName: string,
): string {
  assertQdrantNonEmptyString(value, fieldName);
  return value.trim();
}

function normalizeQdrantScopeType(value: unknown, fieldName: string): string {
  const scopeType = normalizeQdrantNonEmptyString(value, fieldName);
  if (scopeType === "user" || scopeType === "project") {
    return scopeType;
  }
  throw new Error(`${fieldName} must be one of: user, project`);
}

function assertQdrantQueryResponse(value: unknown): asserts value is QdrantQueryResponse {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("query response must be an object");
  }
}

function assertQdrantCollectionExistsResponse(
  value: unknown,
): asserts value is QdrantCollectionExistsResponse {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("collectionExists response must be an object");
  }
  if (typeof (value as Record<string, unknown>).exists !== "boolean") {
    throw new Error("collectionExists.exists must be a boolean");
  }
}

function assertQdrantPoints(value: unknown): asserts value is QdrantQueryPoint[] {
  if (!Array.isArray(value)) {
    throw new Error("points must be an array");
  }
  value.forEach((point, index) => {
    if (typeof point !== "object" || point === null || Array.isArray(point)) {
      throw new Error(`points[${index}] must be an object`);
    }
  });
}

function toQdrantPointId(value: unknown, fieldName: string): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }
  if (typeof value === "number" && Number.isSafeInteger(value) && value >= 0) {
    return String(value);
  }
  throw new Error(`${fieldName} must be a non-empty string or non-negative safe integer`);
}

function toQdrantFiniteNumber(value: unknown, fieldName: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${fieldName} must be a finite number`);
  }
  return value;
}
