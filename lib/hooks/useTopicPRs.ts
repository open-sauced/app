import { useRouter } from "next/router";
import useSWR from "swr";

interface PaginatedPRsResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const useTopicPRs = () => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const filter = selectedFilter as string;
  const baseEndpoint = `${topic}/recent-prs`;
  const limitQuery = "limit=35";
  const filterQuery = filter ? `&filter=${filter}` : "";
  const endpointString = `${baseEndpoint}?${filterQuery}${limitQuery}`;

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
