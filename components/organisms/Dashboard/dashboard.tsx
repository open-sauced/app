import HighlightCard from "components/molecules/HighlightCard/highlight-card";

import humanizeNumber from "lib/utils/humanizeNumber";
import { getInsights, useInsights } from "lib/hooks/api/useInsights";

import useContributors from "lib/hooks/api/useContributors";

import Repositories from "../Repositories/repositories";

export type PrStatusFilter = "open" | "closed" | "all";

interface DashboardProps {
  repositories?: number[];
}

const Dashboard = ({ repositories }: DashboardProps): JSX.Element => {
  const { data: insightsData, isLoading } = useInsights(repositories);
  const { data: contributorData, meta: contributorMeta } = useContributors(undefined, repositories);

  const compare1 = getInsights(insightsData, 30);
  const compare2 = getInsights(insightsData, 60);

  return (
    <div className="flex flex-col w-full gap-4">
      <section className="flex flex-wrap items-center max-w-full gap-4 lg:flex-row lg:flex-nowrap">
        <HighlightCard
          label="Contributors"
          icon="contributors"
          metricIncreases={compare1.allPrsTotal - compare2.allPrsTotal >= 0}
          increased={compare1.allPrsTotal - compare2.allPrsTotal >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.allPrsTotal - compare2.allPrsTotal), "abbreviation")}
          value={humanizeNumber(contributorMeta.itemCount, "comma")}
          contributors={contributorData.map((contributor) => ({ host_login: contributor.author_login }))}
          isLoading={isLoading}
        />
        <HighlightCard
          label="Spam"
          icon="spam"
          metricIncreases={compare1.spamTotal - compare2.spamTotal >= 0}
          increased={compare1.spamTotal - compare2.spamTotal >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.spamTotal - compare2.spamTotal), "abbreviation")}
          percentage={compare1.spamPercentage}
          percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
          isLoading={isLoading}
        />
        <HighlightCard
          label="Merged PRs"
          icon="merged-pr"
          metricIncreases={compare1.acceptedTotal - compare2.acceptedTotal >= 0}
          increased={compare1.acceptedTotal - compare2.acceptedTotal >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.acceptedTotal - compare2.acceptedTotal), "abbreviation")}
          percentage={compare1.acceptedPercentage}
          percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
          isLoading={isLoading}
        />
        <HighlightCard
          label="Unlabeled PRs"
          icon="unlabeled-pr"
          metricIncreases={compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal >= 0}
          increased={compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal), "abbreviation")}
          percentage={compare1.unlabeledPercentage}
          percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
          isLoading={isLoading}
        />
      </section>
      <section className="flex flex-col max-w-full gap-4 mb-6 lg:flex-row">
        <div className="flex flex-col w-full mt-5">
          <Repositories repositories={repositories} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
