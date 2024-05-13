import { useRouter } from "next/router";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";

import humanizeNumber from "lib/utils/humanizeNumber";

import useContributors from "lib/hooks/api/useContributors";

import { usePullRequestsHistogram, getInsights } from "lib/hooks/api/usePullRequestsHistogram";
import Repositories from "../Repositories/repositories";

export type PrStatusFilter = "open" | "closed" | "all";

interface DashboardProps {
  repoIds?: number[];
  repositories?: string[];
}

const Dashboard = ({ repoIds, repositories }: DashboardProps): JSX.Element => {
  const { data: insightsData, isLoading } = usePullRequestsHistogram({ repositories });
  const { data: contributorData, meta: contributorMeta } = useContributors(undefined, repositories);
  const router = useRouter();
  const { range = 30 } = router.query;

  const todaysInsights = getInsights(insightsData, 0);
  const yesterdaysInsights = getInsights(insightsData, 1);

  return (
    <div className="flex flex-col w-full gap-4">
      <aside
        aria-label="pull request highlights"
        className="flex flex-wrap items-center max-w-full gap-4 lg:flex-row lg:flex-nowrap"
      >
        <HighlightCard
          label="Contributors"
          tooltip={`People who have made pull requests to the selected repositories over the last ${range} days.`}
          icon="contributors"
          metricIncreases={todaysInsights.allPrsTotal - yesterdaysInsights.allPrsTotal >= 0}
          increased={todaysInsights.allPrsTotal - yesterdaysInsights.allPrsTotal >= 0}
          numChanged={humanizeNumber(
            Math.abs(todaysInsights.allPrsTotal - yesterdaysInsights.allPrsTotal),
            "abbreviation"
          )}
          value={humanizeNumber(contributorMeta.itemCount, "comma")}
          contributors={contributorData.map((contributor) => ({ host_login: contributor.author_login }))}
          isLoading={isLoading}
        />
        <HighlightCard
          label="Spam"
          icon="spam"
          tooltip={`An issue or pull request labeled as spam on the selected repositories over the last ${range} days.`}
          metricIncreases={todaysInsights.spamTotal - yesterdaysInsights.spamTotal >= 0}
          increased={todaysInsights.spamTotal - yesterdaysInsights.spamTotal >= 0}
          numChanged={humanizeNumber(Math.abs(todaysInsights.spamTotal - yesterdaysInsights.spamTotal), "abbreviation")}
          percentage={todaysInsights.spamPercentage}
          percentageLabel={`of ${humanizeNumber(todaysInsights.allPrsTotal, "comma")}`}
          isLoading={isLoading}
        />
        <HighlightCard
          label="Merged PRs"
          icon="merged-pr"
          tooltip={`Pull requests that have been successfully merged into the codebase in the last ${range} days.`}
          metricIncreases={todaysInsights.acceptedTotal - yesterdaysInsights.acceptedTotal >= 0}
          increased={todaysInsights.acceptedTotal - yesterdaysInsights.acceptedTotal >= 0}
          numChanged={humanizeNumber(
            Math.abs(todaysInsights.acceptedTotal - yesterdaysInsights.acceptedTotal),
            "abbreviation"
          )}
          percentage={todaysInsights.acceptedPercentage}
          percentageLabel={`of ${humanizeNumber(todaysInsights.allPrsTotal, "comma")}`}
          isLoading={isLoading}
        />
        <HighlightCard
          label="Unlabeled PRs"
          icon="unlabeled-pr"
          tooltip={`The number of open or closed PRs that have not been labeled in the last ${range} days.`}
          metricIncreases={todaysInsights.unlabeledPrsTotal - yesterdaysInsights.unlabeledPrsTotal >= 0}
          increased={todaysInsights.unlabeledPrsTotal - yesterdaysInsights.unlabeledPrsTotal >= 0}
          numChanged={humanizeNumber(
            Math.abs(todaysInsights.unlabeledPrsTotal - yesterdaysInsights.unlabeledPrsTotal),
            "abbreviation"
          )}
          percentage={todaysInsights.unlabeledPercentage}
          percentageLabel={`of ${humanizeNumber(todaysInsights.allPrsTotal, "comma")}`}
          isLoading={isLoading}
        />
      </aside>

      <section className="flex flex-col max-w-full gap-4 my-6">
        <Repositories repositories={repoIds} />
      </section>
    </div>
  );
};

export default Dashboard;
