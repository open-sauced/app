import React from "react";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import IconButton from "components/atoms/IconButton/icon-button";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";

interface ScatterChartProps {
    title: string;
    option: Object;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ title, option }) => {
  return (
    <Card>
      <>
        <div className="w-full flex justify-between">
          <div>
            <Text className="!text-light-slate-12 font-medium">
              {title}
            </Text>
          </div>
          <div>
            <IconButton />
          </div>
        </div>
        <EChartWrapper option={option} />
      </>
    </Card>
  );
};

export default ScatterChart;