import { useRouter } from "next/router";
import useSWR from "swr";
import getFilterQuery from "lib/utils/get-filter-query";

interface PaginatedPRsResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const useTopicPRs = (limit = 500, repoIds: number[] = []) => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const baseEndpoint = `${topic}/recent-prs`;
  const filterQuery = getFilterQuery(selectedFilter);
  const limitQuery = `${filterQuery ? "&": ""}limit=${limit}`;
  const reposQuery = repoIds.length > 0 ? `&repoIds=${repoIds.join(",")}`: "";
  const endpointString = `${baseEndpoint}?${filterQuery}${limitQuery}${reposQuery}`;

  const { data, error, mutate } = useSWR<PaginatedPRsResponse, Error>(endpointString);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export { useTopicPRs };
