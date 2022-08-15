import React from "react";
import Card from "../../atoms/Card/card";
import SelectableTable from "components/molecules/SelectableTable/selectable-table";
import ScatterChart from "components/molecules/ScatterChart/scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import useDashBoardData from "lib/hooks/useDashboardData";
import {useRepoList} from "lib/hooks/useRepos";

interface ToolProps {
  tool?: string;
}

const Tool: React.FC<ToolProps> = ({ tool }) => {

  const { scatterOptions } = useDashBoardData();
  const { repoList } = useRepoList();

  console.log(repoList);
  return (
    <div className="flex flex-col w-full gap-4">
      {tool === "Dashboard" ?
        <>
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
        </>
        : tool === "Repositories" ?
          <>
            <Card className="w-full lg:w-[calc(50%-(1rem/2))] xl:!w-[calc(40%-(1rem/2))] px-1 xs:px-5 py-5">
              {repoList && <SelectableTable rows={repoList.data} title="Repositories" tableType="participants" />}
            </Card>
          </>
          :
          <>
            {tool ? `${tool}` : "Test"} Tool Page
          </>
      }
    </div>
  );
};

export default Tool;
