import useSWR from "swr";

interface PaginatedContributorPRsResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const useTopicContributorPRs = (contributor: string, topic: string, repoIds: number[] = []) => {
  const baseEndpoint = `${topic}/${contributor}/prs`;
  const reposQuery = repoIds.length > 0 ? `repoIds=${repoIds.join(",")}`: "";
  const endpointString = `${baseEndpoint}?${reposQuery}`;

  const { data, error, mutate } = useSWR<PaginatedContributorPRsResponse, Error>(endpointString);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export { useTopicContributorPRs };
