import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import Card from "../../atoms/Card/card";
import ScatterChart from "components/molecules/ScatterChart/scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import humanizeNumber from "lib/utils/humanizeNumber";
import { useEffect, useState } from "react";

export const Dashboard = (): JSX.Element => {
  const { meta, isLoading } = useRepositoriesList();
  const [itemCount, setItemCount] = useState("");
  
  const scatterOptions = {
    xAxis: {},
    yAxis: {},
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
    if(!isLoading && meta) setItemCount(humanizeNumber(meta.itemCount));
  }, [isLoading, meta]);

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
          percentageLabel={isLoading ? "Loading..." : `of ${itemCount}`}
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Spam"
          icon="spam"
          metricIncreases={false}
          increased={true}
          numChanged={98}
          percentage={80}
          percentageLabel={isLoading ? "Loading..." : `of ${itemCount}`}
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Accepted PRs"
          icon="accepted-pr"
          metricIncreases={true}
          increased={false}
          numChanged={38}
          percentage={37}
          percentageLabel={isLoading ? "Loading..." : `of ${itemCount}`}
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Unlabeled PRs"
          icon="unlabeled-pr"
          metricIncreases={false}
          increased={false}
          numChanged={85}
          percentage={77}
          percentageLabel={isLoading ? "Loading..." : `of ${itemCount}`}
        />
      </section>
      <section className="flex flex-col lg:flex-row max-w-full gap-4 mb-6">
        <div className="flex flex-col w-full gap-4">
          <Card className="w-full p-5">
            <ScatterChart title="Test Title" option={scatterOptions} />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
