export const useWorkspacesRepoStats = (workspaceId: string) => {
  const mockData = {
    pull_requests: {
      opened: 10,
      merged: 5,
      velocity: 2,
    },
    issues: {
      opened: 10,
      closed: 5,
      velocity: 2,
    },
    repos: {
      stars: 4530,
      forks: 87,
      health: 7,
    },
  } as const;

  type WorkspacesReposStats = typeof mockData;

  const endpointString = `workspaces${workspaceId}/stats`;

  // const { data, error, mutate } = useSWR<WorkspacesReposStats, Error>(
  //   endpointString,
  //   publicApiFetcher as Fetcher<WorkspacesReposStats, Error>
  // );

  return {
    data: { data: mockData },
    isLoading: false, // !error && !data,
    isError: false, // !!error,
  };
};
