import useSWR from "swr";

interface PaginatedRepoCommitResponse {
  readonly data: DbRepoCommit[];
  readonly meta: Meta;
}

const useRepositoryCommits = (id: string) => {
  const { data, error, mutate } = useSWR<PaginatedRepoCommitResponse, Error>(`repos/${id}/commits`);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepositoryCommits};
