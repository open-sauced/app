import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

interface PaginatedResponse {
  readonly data: DbRepoPREvents[];
  readonly meta: Meta;
}

const useRepositoryPullRequests = ({
  fullName,
  limit = 10,
  range = 30,
  distinctAuthors = false,
}: {
  fullName: string;
  limit?: number;
  range?: number;
  distinctAuthors?: boolean;
}) => {
  const router = useRouter();
  const { pageId, selectedFilter } = router.query;
  const topic = pageId as string;
  const filterQuery = getFilterQuery(selectedFilter);
  const query = new URLSearchParams(filterQuery);

  if (topic && Number.isNaN(Number(topic))) {
    query.set("topic", topic);
  }

  if (!query.get("repo") && fullName) {
    query.set("repo", fullName);
  }

  if (query.get("repo")) {
    query.delete("topic");
    query.delete("filter");
  }

  query.set("page", "1");
  query.set("limit", `${limit}`);
  query.set("range", `${range}`);
  query.set("distinctAuthors", `${distinctAuthors}`);

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
