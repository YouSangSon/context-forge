import type {
  CanonicalMemoryRepository,
  MemoryRepository,
} from "../types.js";
import type {
  CreateToolRegistryOptions,
  MaybePromise,
  WithCanonicalServices,
} from "./types.js";
import {
  assertProvidedScopeIdentifiers,
  requireUserScopeId,
  resolveUserScopeId,
} from "./tool-utils.js";

export function createRepositoryAccess(input: {
  cwd: string;
  options: CreateToolRegistryOptions;
  withCanonicalServices: WithCanonicalServices;
}) {
  const { cwd, options, withCanonicalServices } = input;

  return {
    async withRepositories<T>(
      repositoryInput: {
        projectKey?: string;
        userScopeId?: string;
        includeUser?: boolean;
      },
      callback: (repositories: {
        projectRepository?: MemoryRepository;
        userRepository?: MemoryRepository;
        userScopeId?: string;
      }) => MaybePromise<T>,
    ): Promise<T> {
      assertProvidedScopeIdentifiers(repositoryInput);
      const userScopeId = requireUserScopeId(
        resolveUserScopeId({
          cwd,
          explicitUserScopeId: repositoryInput.userScopeId,
          defaultUserScopeId: options.defaultUserScopeId,
        }),
      );

      if (options.projectRepository || options.userRepository) {
        return await callback({
          projectRepository: options.projectRepository,
          userRepository:
            repositoryInput.includeUser === false
              ? undefined
              : options.userRepository,
          userScopeId,
        });
      }

      if (options.resolveRepository && repositoryInput.projectKey) {
        const resolved = options.resolveRepository(repositoryInput.projectKey);

        return await callback({
          projectRepository: resolved,
          userScopeId,
        });
      }

      if (options.repository) {
        return await callback({
          projectRepository: options.repository,
          userScopeId,
        });
      }

      throw new Error("repository fallback not configured");
    },

    async withCanonicalRepository<T>(
      callback: (repository: CanonicalMemoryRepository) => Promise<T>,
    ): Promise<T> {
      return withCanonicalServices((services) => callback(services.repository));
    },
  };
}
