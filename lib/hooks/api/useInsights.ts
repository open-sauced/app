import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import getFilterQuery from "lib/utils/get-filter-query";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface Insight {
  allReposTotal: number;
  allPrsTotal: number;
  spamTotal: number;
  acceptedTotal: number;
  unlabeledPrsTotal: number;
  spamPercentage: number;
  acceptedPercentage: number;
  unlabeledPercentage: number;
  allContributors: number;
  spamContributors: number;
  acceptedContributors: number;
}

const getInsights = (insights: DbInsight[], intervalDay = 0): Insight => {
  const currentInsights = insights.find((insight) => insight.interval === intervalDay) as DbInsight;

  if (!currentInsights) {
    return {
      allPrsTotal: 0,
      allReposTotal: 0,
      spamTotal: 0,
      acceptedTotal: 0,
      spamPercentage: 0,
      acceptedPercentage: 0,
      unlabeledPrsTotal: 0,
      unlabeledPercentage: 0,
      allContributors: 0,
      spamContributors: 0,
      acceptedContributors: 0,
    };
  }

  const spam =
    (currentInsights.all_prs || 0) > 0 ? Math.round((currentInsights.spam_prs / currentInsights.all_prs) * 100) : 0;
  const accepted =
    (currentInsights.all_prs || 0) > 0 ? Math.round((currentInsights.accepted_prs / currentInsights.all_prs) * 100) : 0;
  const unlabeledPrsTotal = currentInsights.all_prs - (currentInsights.spam_prs + currentInsights.accepted_prs);
  const unlabeled = Math.max(
    0,
    (currentInsights.all_prs || 0) > 0 ? Math.round((unlabeledPrsTotal / currentInsights.all_prs) * 100) : 0
  );

  return {
    allReposTotal: currentInsights.all_repo_total,
    allPrsTotal: currentInsights.all_prs,
    spamTotal: currentInsights.spam_prs,
    acceptedTotal: currentInsights.accepted_prs,
    unlabeledPrsTotal,
    spamPercentage: spam,
    acceptedPercentage: accepted,
    unlabeledPercentage: unlabeled,
    allContributors: currentInsights.all_contributors,
    spamContributors: currentInsights.spam_contributors,
    acceptedContributors: currentInsights.accepted_contributors,
  };
};

const useInsights = (repoIds: number[] = []) => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const filterQuery = getFilterQuery(selectedFilter);
  const query = new URLSearchParams(filterQuery);

  if (topic && Number.isNaN(Number(topic))) {
    query.set("topic", topic);
  }

  if (repoIds?.length > 0) {
    query.delete("topic");
    query.set("repoIds", repoIds.join(","));
  }

  if (query.get("repo")) {
    query.delete("topic");
  }

  const baseEndpoint = "prs/insights";
  const endpointString = `${baseEndpoint}?${query}`;

  const { data, error, mutate } = useSWR<DbInsight[], Error>(
    topic ? endpointString : null,
    publicApiFetcher as Fetcher<DbInsight[], Error>
  );

  return {
    data: data || [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useInsights, getInsights };
