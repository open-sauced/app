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

export { usePullRequestsHistogram, getInsights };
