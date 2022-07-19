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
          <div className="flex justify-between max-w-full mb-10">
            <HighlightCard 
              label="Participation"
              icon="participation"
              metricIncreases={true}
              increased={true}
              numChanged={38}
              percentage={42}
              percentageLabel="of 49,999"
            />
            <HighlightCard 
              label="Spam"
              icon="spam"
              metricIncreases={false}
              increased={true}
              numChanged={98}
              percentage={80}
              percentageLabel="of 49,999"
            />
            <HighlightCard 
              label="Accepted PRs"
              icon="accepted-pr"
              metricIncreases={true}
              increased={false}
              numChanged={38}
              percentage={42}
              percentageLabel="of 49,999"
            />
            <HighlightCard 
              label="Unlabeled PRs"
              icon="unlabeled-pr"
              metricIncreases={false}
              increased={false}
              numChanged={98}
              percentage={80}
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
              <div className="flex w-full h-[500px]">
                <Card className="w-[50%] mr-10 h-full p-5">
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