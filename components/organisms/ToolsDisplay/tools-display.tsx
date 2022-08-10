import React from "react";
import Card from "../../atoms/Card/card";
import SelectableTable from "components/molecules/SelectableTable/selectable-table";
import ScatterChart from "components/molecules/ScatterChart/scatter-chart";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import { testRows, extendedTestRows, testOptions } from "./fake-data";

interface ToolProps {
  tool?: string;
}

const Tool: React.FC<ToolProps> = ({ tool }) => {    
  return (
    <div className="flex flex-col w-full gap-4">
      {!tool ?
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
            <div className="flex flex-col w-full lg:w-[calc(50%-(1rem/2))] xl:!w-[calc(60%-(1rem/2))] gap-4">
              <Card className="w-full p-5">
                <ScatterChart title="Test Title" option={testOptions} />
              </Card>
              <Card className="w-full p-5">
                <ScatterChart title="Test Title" option={testOptions} />
              </Card>
              <div className="flex flex-col 2xl:flex-row w-full h-full gap-4">
                <Card className="w-full 2xl:w-[calc(50%-(1rem/2))] h-full px-1 xs:px-5 py-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
                <Card className="w-full 2xl:w-[calc(50%-(1rem/2))] h-full px-1 xs:px-5 py-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
              </div>
            </div>
            <Card className="w-full lg:w-[calc(50%-(1rem/2))] xl:!w-[calc(40%-(1rem/2))] px-1 xs:px-5 py-5">
              <SelectableTable rows={extendedTestRows} title="Test Title" tableType="participants" />
            </Card>
          </section>
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