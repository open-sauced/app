import useSWR from "swr";

interface PaginatedRepoPRResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const useRepositoryPRs = (id: string) => {
  const { data, error, mutate } = useSWR<PaginatedRepoPRResponse, Error>(`repos/${id}/prs`);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepositoryPRs};
