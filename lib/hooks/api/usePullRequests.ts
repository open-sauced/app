import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

interface PaginatedResponse {
  readonly data: DbRepoPREvents[];
  readonly meta: Meta;
}

interface PullRequestsQuery extends Query {
  repoIds?: number[];
}

const usePullRequests = ({ limit = 1000, repoIds = [], page = 1, range = 30 }: PullRequestsQuery) => {
  const router = useRouter();

  const { pageId, selectedFilter } = router.query;
  const topic = pageId as string;
  const filterQuery = getFilterQuery(selectedFilter);
  const query = new URLSearchParams(filterQuery);

  if (Number.isNaN(Number(topic))) {
    query.set("topic", topic);
  }

  if (page) {
    query.set("page", `${page}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (repoIds?.length > 0) {
    query.delete("topic");
    query.set("repoIds", repoIds.join(","));
  }

  if (query.get("repo")) {
    query.delete("topic");
  }

  query.set("range", `${range}`);

  const baseEndpoint = "prs/search";
  const endpointString = `${baseEndpoint}?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default usePullRequests;
