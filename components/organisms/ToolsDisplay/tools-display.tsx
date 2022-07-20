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
          <div className="flex flex-wrap justify-between items-center lg:flex-row lg:flex-nowrap max-w-full mb-10">
            <HighlightCard
              className="mb-4 lg:mb-0 gap-2 lg:min-w-[24.3%]"
              label="Participation"
              icon="participation"
              metricIncreases={true}
              increased={true}
              numChanged={38}
              percentage={40}
              percentageLabel="of 49,999"
            />
            <HighlightCard
              className="mb-4 lg:mb-0 lg:min-w-[24.3%]"
              label="Spam"
              icon="spam"
              metricIncreases={false}
              increased={true}
              numChanged={98}
              percentage={80}
              percentageLabel="of 49,999"
            />
            <HighlightCard
              className="mb-4 lg:mb-0 lg:min-w-[24.3%]"
              label="Accepted PRs"
              icon="accepted-pr"
              metricIncreases={true}
              increased={false}
              numChanged={38}
              percentage={37}
              percentageLabel="of 49,999"
            />
            <HighlightCard
              className="mb-4 lg:mb-0 lg:min-w-[24.3%]"
              label="Unlabeled PRs"
              icon="unlabeled-pr"
              metricIncreases={false}
              increased={false}
              numChanged={85}
              percentage={77}
              percentageLabel="of 49,999"
            />
          </div>
          <div className="flex flex-col lg:flex-row max-w-full mb-10">
            <div className="flex flex-col w-full lg:w-[50%] xl:!w-[60%] mr-10">
              <Card className="w-full mb-10 p-5">
                <ScatterChart title="Test Title" option={testOptions} />
              </Card>
              <Card className="w-full mb-10 p-5">
                <ScatterChart title="Test Title" option={testOptions} />
              </Card>
              <div className="flex flex-col justify-between 2xl:flex-row w-full h-full">
                <Card className="w-full mb-10 2xl:mb-0 2xl:w-[49%] xl:mr-4 h-full px-1 md:px-5 py-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
                <Card className="w-full mb-10 2xl:mb-0 2xl:w-[49%] h-full px-1 md:px-5 py-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
              </div>
            </div>
            <Card className="w-full lg:w-[50%] xl:!w-[40%] px-1 md:px-5 py-5">
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