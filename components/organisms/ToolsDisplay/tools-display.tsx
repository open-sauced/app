import { useRouter } from "next/router";
import React from "react";
import Card from "../../atoms/Card/card";
import SelectableTable from "components/molecules/SelectableTable/selectable-table";
import ScatterChart from "components/molecules/ScatterChart/scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import { testRows, extendedTestRows, testOptions } from "./fake-data";

const Tool: React.FC = () => {
  const router = useRouter();

  const { tool } = router.query;
    
  return (
    <div className="flex flex-col w-full">
      {tool === "Dashboard" ?
        <>
          <div className="flex flex-col md:flex-row max-w-full mb-10">
            <HighlightCard
              className="mb-4 md:mb-0 md:mr-3 md:min-w-[24.3%]"
              label="Participation"
              icon="participation"
              metricIncreases={true}
              increased={true}
              numChanged={38}
              percentage={40}
              percentageLabel="of 49,999"
            />
            <HighlightCard
              className="mb-4 md:mb-0 md:mr-3 md:min-w-[24.3%]"
              label="Spam"
              icon="spam"
              metricIncreases={false}
              increased={true}
              numChanged={98}
              percentage={80}
              percentageLabel="of 49,999"
            />
            <HighlightCard
              className="mb-4 md:mb-0 md:mr-3 md:min-w-[24.3%]"
              label="Accepted PRs"
              icon="accepted-pr"
              metricIncreases={true}
              increased={false}
              numChanged={38}
              percentage={37}
              percentageLabel="of 49,999"
            />
            <HighlightCard
              className="mb-4 md:mb-0 md:min-w-[24.3%]"
              label="Unlabeled PRs"
              icon="unlabeled-pr"
              metricIncreases={false}
              increased={false}
              numChanged={85}
              percentage={77}
              percentageLabel="of 49,999"
            />
          </div>
          <div className="flex max-w-full mb-10">
            <div className="flex flex-col w-[60%] mr-10">
              <Card className="w-full mb-10 p-5">
                <ScatterChart title="Test Title" option={testOptions} />
              </Card>
              <Card className="w-full mb-10 p-5">
                <ScatterChart title="Test Title" option={testOptions} />
              </Card>
              <div className="flex w-full h-auto">
                <Card className="w-[50%] xl:mr-2 2xl:mr-10 h-full p-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
                <Card className="w-[50%] h-full p-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
              </div>
            </div>
            <Card className="w-[40%] p-5">
              <SelectableTable rows={extendedTestRows} title="Test Title" tableType="participants" />
            </Card>
          </div>
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