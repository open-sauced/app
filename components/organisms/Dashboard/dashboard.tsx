import { useState } from "react";

/* eslint-disable camelcase */
import Card from "components/atoms/Card/card";
import NivoScatterPlot, { ScatterChartMetadata } from "components/molecules/NivoScatterChart/nivo-scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import { ScatterChartDataItems } from "components/molecules/NivoScatterChart/nivo-scatter-chart";

import humanizeNumber from "lib/utils/humanizeNumber";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { getInsights, useInsights } from "lib/hooks/api/useInsights";
import { calcDaysFromToday } from "lib/utils/date-utils";
import usePullRequests from "lib/hooks/api/usePullRequests";
import useContributors from "lib/hooks/api/useContributors";
import { getAvatarByUsername } from "lib/utils/github";

type ContributorPrMap = { [contributor: string]: DbRepoPR };
export type PrStatusFilter = "open" | "closed" | "all";

interface DashboardProps {
  repositories?: number[];
}

const Dashboard = ({ repositories }: DashboardProps): JSX.Element => {
  const { data: insightsData, isLoading } = useInsights(repositories);
  const { data: prData, isError: prError } = usePullRequests(undefined, repositories);
  const { data: contributorData, meta: contributorMeta } = useContributors(undefined, repositories);
  const [showBots, setShowBots] = useState(false);
  const isMobile = useMediaQuery("(max-width:720px)");
  const [prStateFilter, setPrStateFilter] = useState<PrStatusFilter>("all");

  const handleSetPrFilter = (state: PrStatusFilter) => {
    setPrStateFilter(state);
  };

  let scatterChartData: ScatterChartDataItems[] = [];
  let metadata: ScatterChartMetadata = {
    allPrs: prData.length,
    openPrs: prData.filter((pr) => pr.state.toLowerCase() === "open").length,
    closedPrs: prData.filter((pr) => pr.state.toLowerCase() === "closed" || pr.state.toLowerCase() === "merged").length,
  };

  const uniqueContributors: ContributorPrMap = prData.reduce((prs, curr) => {
    if (curr.state.toLowerCase() !== prStateFilter && prStateFilter !== "all") return prs;

    if (prs[curr.author_login]) {
      prs[curr.author_login].linesCount += Math.abs(curr.additions - curr.deletions);
    } else {
      prs[curr.author_login] = { ...curr };
      prs[curr.author_login].linesCount = Math.abs(curr.additions - curr.deletions);
    }

    return prs;
  }, {} as ContributorPrMap);

  const prs = Object.keys(uniqueContributors)
    .filter((key) => {
      if (showBots) {
        return true;
      }

      return !key.includes("[bot]");
    })
    .map((key) => uniqueContributors[key]);

  if (prError) {
    scatterChartData = [];
  } else {
    scatterChartData = prs.map(({ updated_at, linesCount, author_login }) => {
      const author_image = author_login.includes("[bot]") ? "octocat" : author_login;

      const data = {
        x: calcDaysFromToday(new Date(updated_at)),
        y: linesCount,
        contributor: author_login,
        image: getAvatarByUsername(author_image, 40),
      };
      return data;
    });
  }

  const maxFilesModified = scatterChartData.reduce((max, curr) => {
    const { y } = curr;
    if (Number(y) > max) {
      return y as number;
    }
    return max;
  }, 0);

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
          label="Accepted PRs"
          icon="accepted-pr"
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
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <NivoScatterPlot
              title="Contributor Distribution"
              showBots={showBots}
              setShowBots={setShowBots}
              data={[{ id: "Contributors", data: scatterChartData }]}
              maxFilesModified={maxFilesModified}
              isMobile={isMobile}
              repositories={repositories}
              metadata={metadata}
              handleSetPrFilter={handleSetPrFilter}
            />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
