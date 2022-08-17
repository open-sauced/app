import useDashBoardData from "lib/hooks/useDashboardData";
import Card from "../../atoms/Card/card";
import ScatterChart from "components/molecules/ScatterChart/scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";

export const Dashboard = (): JSX.Element => {
  const { scatterOptions } = useDashBoardData();

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
          percentageLabel="of 49,999"
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Spam"
          icon="spam"
          metricIncreases={false}
          increased={true}
          numChanged={98}
          percentage={80}
          percentageLabel="of 49,999"
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Accepted PRs"
          icon="accepted-pr"
          metricIncreases={true}
          increased={false}
          numChanged={38}
          percentage={37}
          percentageLabel="of 49,999"
        />
        <HighlightCard
          url="/hacktoberfest/pull%20requests"
          label="Unlabeled PRs"
          icon="unlabeled-pr"
          metricIncreases={false}
          increased={false}
          numChanged={85}
          percentage={77}
          percentageLabel="of 49,999"
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
