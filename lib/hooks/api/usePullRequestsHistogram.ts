import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { expPublicApiFetcher } from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

const usePullRequestsHistogram = (repoIds: number[] = [], range = 30) => {
  const router = useRouter();
  const { pageId, selectedFilter } = router.query;
  const topic = pageId as string;
  const filterQuery = getFilterQuery(selectedFilter);
  const query = new URLSearchParams(filterQuery);

  if (Number.isNaN(Number(topic))) {
    query.set("topic", topic);
  }

  if (repoIds?.length > 0) {
    query.delete("topic");
    query.set("repoIds", repoIds.join(","));
  }

  if (query.get("repo")) {
    query.delete("topic");
  }

  query.set("range", `${range}`);
  query.set("width", "30");

  const baseEndpoint = "histogram/pull-requests";
  const endpointString = `${baseEndpoint}?${query.toString()}`;

  const { data, error, mutate } = useSWR<DbPullRequestGitHubEventsHistogram[], Error>(
    endpointString,
    expPublicApiFetcher as Fetcher<DbPullRequestGitHubEventsHistogram[], Error>
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default usePullRequestsHistogram;
