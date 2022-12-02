import { useState } from "react";

/* eslint-disable camelcase */
import Card from "components/atoms/Card/card";
import NivoScatterPlot from "components/molecules/NivoScatterChart/nivo-scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import { ScatterChartDataItems } from "components/molecules/NivoScatterChart/nivo-scatter-chart";

import humanizeNumber from "lib/utils/humanizeNumber";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { getInsights, useInsights } from "lib/hooks/useInsights";
import { useTopicPRs } from "lib/hooks/useTopicPRs";
import { calcDaysFromToday } from "lib/utils/date-utils";
import roundedImage from "lib/utils/roundedImages";


type ContributorPrMap = { [contributor: string]: DbRepoPR };

interface DashboardProps {
  repositories?: number[];
}

export const Dashboard = ({ repositories }: DashboardProps): JSX.Element => {
  const { data: insightsData } = useInsights(repositories);
  const { data: prData, isError: prError } = useTopicPRs(undefined, repositories);
  const [showBots, setShowBots] = useState(false);
  const isMobile = useMediaQuery("(max-width:720px)");

  let scatterChartData: ScatterChartDataItems[] = [];

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

  const compare1 = getInsights(insightsData, 30);
  const compare2 = getInsights(insightsData, 60);

  return (
    <div className="flex flex-col w-full gap-4">
      <section className="flex flex-wrap gap-4 items-center lg:flex-row lg:flex-nowrap max-w-full">
        <HighlightCard

          label="Contributors"
          icon="contributors"
          metricIncreases={compare1.allContributors - compare2.allContributors >= 0}
          increased={compare1.allContributors - compare2.allContributors >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.allContributors - compare2.allContributors), "abbreviation")}
          value={humanizeNumber(compare1.allContributors, "comma")}
        />
        <HighlightCard
          label="Spam"
          icon="spam"
          metricIncreases={compare1.spamTotal - compare2.spamTotal >= 0}
          increased={compare1.spamTotal - compare2.spamTotal >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.spamTotal - compare2.spamTotal), "abbreviation")}
          percentage={compare1.spamPercentage}
          percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
        />
        <HighlightCard
          label="Accepted PRs"
          icon="accepted-pr"
          metricIncreases={compare1.acceptedTotal - compare2.acceptedTotal >= 0}
          increased={compare1.acceptedTotal - compare2.acceptedTotal >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.acceptedTotal - compare2.acceptedTotal), "abbreviation")}
          percentage={compare1.acceptedPercentage}
          percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
        />
        <HighlightCard
          label="Unlabeled PRs"
          icon="unlabeled-pr"
          metricIncreases={compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal >= 0}
          increased={compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal >= 0}
          numChanged={humanizeNumber(Math.abs(compare1.unlabeledPrsTotal - compare2.unlabeledPrsTotal), "abbreviation")}
          percentage={compare1.unlabeledPercentage}
          percentageLabel={`of ${humanizeNumber(compare1.allPrsTotal, "comma")}`}
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
              isMobile={isMobile}
            />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
