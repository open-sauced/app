import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import Card from "../../atoms/Card/card";
import DashboardScatterChart from "components/molecules/DashboardScatterChart/dashboard-scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import humanizeNumber from "lib/utils/humanizeNumber";
import { useEffect, useState } from "react";

export const Dashboard = (): JSX.Element => {
  const { meta, isError } = useRepositoriesList();

  const [itemCountText, setItemCountText] = useState("Loading...");

  const scatterOptions = {
    grid: {
      left: 40,
      top: 10,
      right: 40,
      bottom: 20
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
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ],
        type: "scatter"
      }
    ]
  };

  useEffect(() => {

    if(meta) setItemCountText(`of ${humanizeNumber(meta.itemCount, "comma")}`);
    if(isError) setItemCountText("of unknown...");
  }, [ isError, meta ]);

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
