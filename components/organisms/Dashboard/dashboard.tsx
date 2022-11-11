/* eslint-disable camelcase */
import Card from "../../atoms/Card/card";
import DashboardScatterChart from "components/molecules/DashboardScatterChart/dashboard-scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import humanizeNumber from "lib/utils/humanizeNumber";

import { getInsights, useInsights } from "lib/hooks/useInsights";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { useTopicPRs } from "lib/hooks/useTopicPRs";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { calcDaysFromToday } from "lib/utils/date-utils";
import roundedImage from "lib/utils/roundedImages";
import { useState } from "react";

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
  const isNotMobile = useMediaQuery("(min-width: 768px)");

  const conAvatarObject: { [key: string]: {[key: string]: string} } = {};
  let scatterChartData: (string | number)[][] = [];

  // useEffect(() => {
  const uniqueContributors: ContributorPrMap = prData.reduce((prs, curr) => {
    if (prs[curr.author_login]) {
      prs[curr.author_login].linesCount += curr.linesCount;
    } else {
      prs[curr.author_login] = {...curr};
      prs[curr.author_login].linesCount = curr.linesCount;
    }

    return prs;
  }, {} as ContributorPrMap);
    
  const prs = Object.keys(uniqueContributors)
    .filter(key => {
      if (showBots) {
        return true;
      }

      return !key.includes("[bot]");
    })
    .map(key => uniqueContributors[key]);

  if (prError) {
    scatterChartData = [];
  } else {
    //eslint-disable-next-line
      scatterChartData = prs.map(({ updated_at, linesCount, author_login }) => {
      const timeOverTouched: (string | number)[] = [
        calcDaysFromToday(new Date(parseInt(updated_at, 10))),
        //eslint-disable-next-line
          linesCount
      ];
  
      const author_image = author_login.includes("[bot]") ? "octocat" : author_login;
  
      //eslint-disable-next-line
        conAvatarObject[`${timeOverTouched[0]}${timeOverTouched[1]}`] = {
        login: `${author_login} - ${linesCount}`,
        image: roundedImage(`https://www.github.com/${author_image}.png?size=60`, process.env.NEXT_PUBLIC_CLOUD_NAME)
      };
  
      return timeOverTouched;
    });
  }

  const maxFilesModified = scatterChartData.reduce((max, curr) => {
    const [, files] = curr;
    if (files > max) {
      return files as number;
    }
    return max;
  }, 0);    

  const scatterChartOptions = {
    grid: {
      left: 40,
      top: 10,
      right: 40,
      bottom: 40
    },
    xAxis: {
      boundaryGap: false,
      inverse: true,
      scale: true,
      minInterval: isNotMobile ? 7 : 2,
      maxInterval: 7,
      min: 0,
      max: isNotMobile ? 35 : 7,
      axisLabel: {
        formatter: (value: number, index: number) =>
          value === 0 ? "Today" : value === 35 ? "35+ days ago" : `${value} days ago`
      },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    yAxis: {
      min: 0,
      max: Math.max(Math.round(maxFilesModified * 2), 10),
      splitNumber: 6,
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        showMinLabel: true,
        formatter: (value: number) => value >= 1000 ? humanizeNumber(value,null) : value
      },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    tooltip: {
      trigger: "item",
      formatter: (args: any) => `${conAvatarObject[`${args.value[0]}${args.value[1]}`].login}`
    },
    series: [
      {
        symbolSize: 40,
        symbol: (value: number[]) => `image://${conAvatarObject[`${value[0]}${value[1]}`].image}`,
        symbolOffset: [0, "-50%"],
        data: scatterChartData,
        type: "scatter",
        itemStyle: {
          opacity: 1
        }
      }
    ]
  };

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
          percentage={allRepoMeta.itemCount > 0 ? Math.round((filterRepoMeta.itemCount / allRepoMeta.itemCount) * 100) : 0}
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
            <DashboardScatterChart title="Contributor Distribution" option={scatterChartOptions} showBots={showBots} setShowBots={setShowBots} />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
