/* eslint-disable camelcase */
import Card from "../../atoms/Card/card";
import DashboardScatterChart from "components/molecules/DashboardScatterChart/dashboard-scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import humanizeNumber from "lib/utils/humanizeNumber";

import { getInsights, useInsights } from "lib/hooks/useInsights";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { useTopicPRs } from "lib/hooks/useTopicPRs";
import { calcDaysFromToday } from "lib/utils/date-utils";
import roundedImage from "lib/utils/roundedImages";
import { useState } from "react";
import NivoScatterPlot from "components/molecules/NivoScatterChart/nivo-scatter-chart";

type ContributorPrMap = { [contributor: string]: DbRepoPR };

interface DashboardProps {
  repositories?: number[];
}

export const Dashboard = ({ repositories }: DashboardProps): JSX.Element => {
  const { meta: allRepoMeta } = useRepositoriesList(true, repositories);
  const { meta: filterRepoMeta } = useRepositoriesList(false, repositories);
  const { data: insightsData } = useInsights();
  const { data: prData, isError: prError } = useTopicPRs(undefined, repositories);
  const [showBots, setShowBots] = useState(false);

  let scatterChartData: { x: number; y: number; image: string; contributor: string }[] = [];

  const uniqueContributors: ContributorPrMap = prData.reduce((prs, curr) => {
    if (prs[curr.author_login]) {
      prs[curr.author_login].linesCount += curr.linesCount;
    } else {
      prs[curr.author_login] = { ...curr };
      prs[curr.author_login].linesCount = curr.linesCount;
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
    //eslint-disable-next-line
    scatterChartData = prs.map(({ updated_at, linesCount, author_login }) => {
      const author_image = author_login.includes("[bot]") ? "octocat" : author_login;

      const data = {
        x: calcDaysFromToday(new Date(parseInt(updated_at, 10))),
        y: linesCount,
        contributor: author_login,
        image: roundedImage(`https://www.github.com/${author_image}.png?size=60`, process.env.NEXT_PUBLIC_CLOUD_NAME)
      };
      return data;
    });
  }

  const maxFilesModified = scatterChartData.reduce((max, curr) => {
    const { y } = curr;
    if (y > max) {
      return y as number;
    }
    return max;
  }, 0);

  const today = getInsights(insightsData, 0);
  const yesterday = getInsights(insightsData, 1);

  return (
    <div className="flex flex-col w-full gap-4">
      <section className="flex flex-wrap gap-4 items-center lg:flex-row lg:flex-nowrap max-w-full">
        <HighlightCard
          label="Participation"
          icon="participation"
          metricIncreases={today.allReposTotal - yesterday.allReposTotal >= 0}
          increased={today.allReposTotal - yesterday.allReposTotal >= 0}
          numChanged={humanizeNumber(Math.abs(today.allReposTotal - yesterday.allReposTotal), "abbreviation")}
          percentage={
            allRepoMeta.itemCount > 0 ? Math.round((filterRepoMeta.itemCount / allRepoMeta.itemCount) * 100) : 0
          }
          percentageLabel={`of ${humanizeNumber(allRepoMeta.itemCount || 0, "comma")}`}
        />
        <HighlightCard
          label="Spam"
          icon="spam"
          metricIncreases={today.spamTotal - yesterday.spamTotal >= 0}
          increased={today.spamTotal - yesterday.spamTotal >= 0}
          numChanged={humanizeNumber(Math.abs(today.spamTotal - yesterday.spamTotal), "abbreviation")}
          percentage={today.spamPercentage}
          percentageLabel={`of ${humanizeNumber(today.allPrsTotal, "comma")}`}
        />
        <HighlightCard
          label="Accepted PRs"
          icon="accepted-pr"
          metricIncreases={today.acceptedTotal - yesterday.acceptedTotal >= 0}
          increased={today.acceptedTotal - yesterday.acceptedTotal >= 0}
          numChanged={humanizeNumber(Math.abs(today.acceptedTotal - yesterday.acceptedTotal), "abbreviation")}
          percentage={today.acceptedPercentage}
          percentageLabel={`of ${humanizeNumber(today.allPrsTotal, "comma")}`}
        />
        <HighlightCard
          label="Unlabeled PRs"
          icon="unlabeled-pr"
          metricIncreases={today.unlabeledPrsTotal - yesterday.unlabeledPrsTotal >= 0}
          increased={today.unlabeledPrsTotal - yesterday.unlabeledPrsTotal >= 0}
          numChanged={humanizeNumber(Math.abs(today.unlabeledPrsTotal - yesterday.unlabeledPrsTotal), "abbreviation")}
          percentage={today.unlabeledPercentage}
          percentageLabel={`of ${humanizeNumber(today.allPrsTotal, "comma")}`}
        />
      </section>
      <section className="flex flex-col lg:flex-row max-w-full gap-4 mb-6">
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <NivoScatterPlot
              title="Contributor Distribution"
              showBots={showBots}
              setShowBots={setShowBots}
              data={[{ id: "Contributors", data: scatterChartData }]}
              maxFilesModified={maxFilesModified}
            />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
