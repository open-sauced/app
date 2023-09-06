import { getInsights } from "lib/hooks/api/useInsights";
import humanizeNumber from "lib/utils/humanizeNumber";
import HighlightCard from "../HighlightCard/highlight-card";

interface FreemiumStatsProps {
  insights: DbInsight[];
  contributorMeta: Meta;
  contributors: DbPRContributor[];
  loading?: boolean;
}

const FreemiumStats = ({ insights, contributorMeta, contributors, loading }: FreemiumStatsProps) => {
  const compare1 = getInsights(insights, 30);
  const compare2 = getInsights(insights, 60);
  return (
    <section className="flex flex-wrap items-center max-w-full gap-4 lg:flex-row lg:flex-nowrap">
      <HighlightCard
        label="Contributors"
        icon="contributors"
        metricIncreases={compare1.allPrsTotal - compare2.allPrsTotal >= 0}
        increased={compare1.allPrsTotal - compare2.allPrsTotal >= 0}
        numChanged={humanizeNumber(Math.abs(compare1.allPrsTotal - compare2.allPrsTotal), "abbreviation")}
        value={humanizeNumber(contributorMeta.itemCount, "comma")}
        contributors={contributors.map((contributor) => ({ host_login: contributor.author_login }))}
        isLoading={loading}
      />
      <HighlightCard
        label="Spam"
        icon="spam"
        metricIncreases={compare1.spamTotal - compare2.spamTotal >= 0}
        increased={compare1.spamTotal - compare2.spamTotal >= 0}
        numChanged={humanizeNumber(Math.abs(compare1.spamTotal - compare2.spamTotal), "abbreviation")}
        percentage={compare1.spamPercentage}
        percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
        isLoading={loading}
      />
      <HighlightCard
        label="Accepted PRs"
        icon="accepted-pr"
        metricIncreases={compare1.acceptedTotal - compare2.acceptedTotal >= 0}
        increased={compare1.acceptedTotal - compare2.acceptedTotal >= 0}
        numChanged={humanizeNumber(Math.abs(compare1.acceptedTotal - compare2.acceptedTotal), "abbreviation")}
        percentage={compare1.acceptedPercentage}
        percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
        isLoading={loading}
      />
      <HighlightCard
        label="Unlabeled PRs"
        icon="unlabeled-pr"
        metricIncreases={compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal >= 0}
        increased={compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal >= 0}
        numChanged={humanizeNumber(Math.abs(compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal), "abbreviation")}
        percentage={compare1.unlabeledPercentage}
        percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
        isLoading={loading}
      />
    </section>
  );
};

export default FreemiumStats;
