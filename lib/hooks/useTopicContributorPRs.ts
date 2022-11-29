import getFilterQuery from "lib/utils/get-filter-query";
import { useRouter } from "next/router";
import useSWR from "swr";

interface PaginatedContributorPRsResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const useTopicContributorPRs = (contributor: string, topic: string, repoIds: number[] = []) => {
  const router = useRouter();
  const { selectedFilter } = router.query;
  const baseEndpoint = `${topic}/${contributor}/prs`;
  const filterQuery = getFilterQuery(selectedFilter);
  const reposQuery = repoIds.length > 0 ? `&repoIds=${repoIds.join(",")}`: "";
  const endpointString = `${baseEndpoint}?limit=8${filterQuery}${reposQuery}`;

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
