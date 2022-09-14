import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import Card from "../../atoms/Card/card";
import DashboardScatterChart from "components/molecules/DashboardScatterChart/dashboard-scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import humanizeNumber from "lib/utils/humanizeNumber";
import { useEffect, useState } from "react";
import { useContributionsList } from "lib/hooks/useContributionsList";
import { calcDaysFromToday } from "lib/utils/date-utils";

export const Dashboard = (): JSX.Element => {
  // This is mock data for the dashboard. Not intended to be the final implementation.
  const { data: contributorData, isError: contributorError } = useContributionsList("35");

  const { meta: repoMetaData, isError: repoError } = useRepositoriesList();
  const [itemCountText, setItemCountText] = useState("Loading...");

  const conAvatarObject: { [key: string]: string } = {};

  const scatterChartData = contributorError ? [] :
    //eslint-disable-next-line
    contributorData.map(({ last_commit_time, files_modified }) => {
      const timeOverTouched = [
        calcDaysFromToday(new Date(parseInt(last_commit_time))),
        //eslint-disable-next-line
        files_modified !== null ? files_modified : 0
      ];

      // conAvatarObject[`${timeOverTouched[0]}${timeOverTouched[1]}`] = `https://avatars.githubusercontent.com/u/${add user name here}`;

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
      scale: true,
      minInterval: 7,
      maxInterval: 7,
      min: 0,
      max: 35,
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
    series: [
      {
        symbolSize: 40,
        symbol: (value: number[]) => "image://https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" /* `image://${conAvatarObject[`${value[0]}${value[1]}`]}` */,
        data: scatterChartData,
        type: "scatter"
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
          url="/hacktoberfest/people"
          label="Participation"
          icon="participation"
          metricIncreases={true}
          increased={true}
          numChanged={38}
          percentage={40}
          percentageLabel={itemCountText}
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Spam"
          icon="spam"
          metricIncreases={false}
          increased={true}
          numChanged={98}
          percentage={80}
          percentageLabel={itemCountText}
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Accepted PRs"
          icon="accepted-pr"
          metricIncreases={true}
          increased={false}
          numChanged={38}
          percentage={37}
          percentageLabel={itemCountText}
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
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
