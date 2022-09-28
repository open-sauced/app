import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import Card from "../../atoms/Card/card";
import DashboardScatterChart from "components/molecules/DashboardScatterChart/dashboard-scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import humanizeNumber from "lib/utils/humanizeNumber";
import { useEffect, useState } from "react";
import { useContributionsList } from "lib/hooks/useContributionsList";
import { calcDaysFromToday } from "lib/utils/date-utils";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

export const Dashboard = (): JSX.Element => {
  // This is mock data for the dashboard. Not intended to be the final implementation.
  const { data: contributorData, isError: contributorError } = useContributionsList("769", "35");

  const { meta: repoMetaData, isError: repoError } = useRepositoriesList();
  const [itemCountText, setItemCountText] = useState("Loading...");
  const isNotMobile = useMediaQuery("(min-width: 768px)");

  const conAvatarObject: { [key: string]: {[key: string]: string} } = {};

  const fakeDataSet = [
    33,
    400,
    12,
    5049,
    0,
    840,
    3603,
    400,
    220,
    5,
    1284,
    7000,
    1060,
    64,
    8099,
    6400,
    1234,
    123,
    802,
    6000,
    100,
    1206,
    2084,
    786,
    876,
    954,
    305,
    1087,
    2803,
    55,
    2,
    103,
    2,
    902,
    500,
    702
  ];

  const scatterChartData = contributorError ? [] :
    //eslint-disable-next-line
    contributorData.map(({ last_commit_time, files_modified, host_login }, index) => {
      const timeOverTouched: (string | number)[] = [
        calcDaysFromToday(new Date(parseInt(last_commit_time))),
        //eslint-disable-next-line
        files_modified !== null ? files_modified : fakeDataSet[index]
      ];

      //eslint-disable-next-line
      conAvatarObject[`${timeOverTouched[0]}${timeOverTouched[1]}`] = { login: host_login, image: `https://www.github.com/${host_login}.png?size=60` };

      return timeOverTouched;
    });

  const scatterOptions = {
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
      max: 10000,
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

  useEffect(() => {
    if (repoMetaData) setItemCountText(`of ${humanizeNumber(repoMetaData.itemCount, "comma")}`);
    if (repoError) setItemCountText("of unknown...");
  }, [repoError, repoMetaData]);

  return (
    <div className="flex flex-col w-full gap-4">
      <section className="flex flex-wrap gap-4 items-center lg:flex-row lg:flex-nowrap max-w-full">
        <HighlightCard
 
          label="Participation"
          icon="participation"
          metricIncreases={true}
          increased={true}
          numChanged={38}
          percentage={40}
          percentageLabel={itemCountText}
        />
        <HighlightCard
         
          label="Spam"
          icon="spam"
          metricIncreases={false}
          increased={true}
          numChanged={98}
          percentage={80}
          percentageLabel={itemCountText}
        />
        <HighlightCard
         
          label="Accepted PRs"
          icon="accepted-pr"
          metricIncreases={true}
          increased={false}
          numChanged={38}
          percentage={37}
          percentageLabel={itemCountText}
        />
        <HighlightCard
         
          label="Unlabeled PRs"
          icon="unlabeled-pr"
          metricIncreases={false}
          increased={false}
          numChanged={85}
          percentage={77}
          percentageLabel={itemCountText}
        />
      </section>
      <section className="flex flex-col lg:flex-row max-w-full gap-4 mb-6">
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <DashboardScatterChart title="Contributor Distribution" option={scatterOptions} />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
