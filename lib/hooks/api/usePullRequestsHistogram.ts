import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { expPublicApiFetcher } from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

interface Insight {
  allPrsTotal: number;
  spamTotal: number;
  acceptedTotal: number;
  unlabeledPrsTotal: number;
  spamPercentage: number;
  acceptedPercentage: number;
  unlabeledPercentage: number;
}

const getInsights = (insights: DbPullRequestGitHubEventsHistogram[], intervalDay = 0): Insight => {
  const currentInsights = insights[intervalDay];

  if (!currentInsights) {
    return {
      allPrsTotal: 0,
      spamTotal: 0,
      acceptedTotal: 0,
      spamPercentage: 0,
      acceptedPercentage: 0,
      unlabeledPrsTotal: 0,
      unlabeledPercentage: 0,
    };
  }

  const spam =
    currentInsights.prs_count > 0 ? Math.round((currentInsights.spam_prs / currentInsights.prs_count) * 100) : 0;
  const accepted =
    currentInsights.prs_count > 0 ? Math.round((currentInsights.accepted_prs / currentInsights.prs_count) * 100) : 0;
  const unlabeledPrsTotal = currentInsights.prs_count - (currentInsights.spam_prs + currentInsights.accepted_prs);
  const unlabeled = Math.max(
    0,
    currentInsights.prs_count > 0 ? Math.round((unlabeledPrsTotal / currentInsights.prs_count) * 100) : 0
  );

  return {
    allPrsTotal: currentInsights.prs_count,
    spamTotal: currentInsights.spam_prs,
    acceptedTotal: currentInsights.accepted_prs,
    unlabeledPrsTotal,
    spamPercentage: spam,
    acceptedPercentage: accepted,
    unlabeledPercentage: unlabeled,
  };
};

const usePullRequestsHistogram = ({
  repoIds = [],
  range = 30,
  width = 30,
  contributor = "",
  direction = "ASC",
  repo,
}: {
  repoIds?: number[];
  range?: number;
  width?: number;
  contributor?: string;
  direction?: string;
  repo?: string;
}) => {
  const router = useRouter();
  const { pageId, selectedFilter } = router.query;
  const topic = pageId as string;
  const filterQuery = getFilterQuery(selectedFilter || repo?.split("/"));
  const query = new URLSearchParams(filterQuery);

  if (Number.isNaN(Number(topic)) && topic !== undefined) {
    query.set("topic", topic);
  }

  if (repoIds?.length > 0) {
    query.delete("topic");
    query.set("repoIds", repoIds.join(","));
    query.delete("filter");
  }

  if (query.get("repo")) {
    query.delete("topic");
    query.delete("filter");
  }

  if (contributor) {
    query.set("contributor", contributor);
    query.delete("topic");
    query.delete("filter");
  }

  if (direction) {
    query.set("orderDirection", direction);
  }

  query.set("range", `${range}`);
  query.set("width", `${width}`);

  const baseEndpoint = "histogram/pull-requests";
  const endpointString = `${baseEndpoint}?${query.toString()}`;
  const makeRequest = query.get("topic") || query.get("repo") || query.get("contributor") || repoIds?.length > 0;

  const { data, error, mutate } = useSWR<DbPullRequestGitHubEventsHistogram[], Error>(
    makeRequest ? endpointString : null,
    expPublicApiFetcher as Fetcher<DbPullRequestGitHubEventsHistogram[], Error>
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { usePullRequestsHistogram, getInsights };
