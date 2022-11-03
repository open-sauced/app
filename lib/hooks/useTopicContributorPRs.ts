import useSWR from "swr";

interface PaginatedContributorPRsResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const useTopicContributorPRs = (contributor: string, topic: string) => {
  const baseEndpoint = `${topic}/${contributor}/prs`;
  const endpointString = `${baseEndpoint}`;

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
