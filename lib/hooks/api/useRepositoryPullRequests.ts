import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import publicApiFetcher from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const useRepositoryPullRequests = (fullName: string, limit = 10, range = 30) => {
  const router = useRouter();
  const { filterName } = router.query;
  const topic = filterName as string;
  const query = new URLSearchParams();

  if (topic && Number.isNaN(Number(topic))) {
    query.set("topic", topic);
  }

  query.set("repo", fullName);
  query.set("page", "1");
  query.set("limit", `${limit}`);
  query.set("range", `${range}`);

  const baseEndpoint = "prs/search";
  const endpointString = `${baseEndpoint}?${query.toString()}`;

  const { data, error } = useSWR<PaginatedResponse, Error>(
    fullName ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useRepositoryPullRequests;
