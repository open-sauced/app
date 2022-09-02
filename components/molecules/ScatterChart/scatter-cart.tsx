import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";
import ToggleOption from "components/atoms/ToggleOption/toggle-option";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import React, { useState } from "react";

interface ScatterChartProps {
  option: Object;
  title: string
}

const ScatterChart = ({ option, title }: ScatterChartProps): JSX.Element => {
  const [showMembers, setShowMembers] = useState(false);
  const [showBots, setShowBots] = useState(false);
  const handleShowMembers = () => {
    setShowMembers(!showMembers);
  };
  const handleShowBots = () => {
    setShowBots(!showBots);
  };
  return (
    <div>
      <div className="flex justify-between">
        <Title level={4}>{title}</Title>
        <div className="flex gap-2">
          <ToggleOption handleToggle={handleShowBots} checked={showBots} optionText="Show Bots"></ToggleOption>
          <ToggleOption
            handleToggle={handleShowMembers}
            withIcon={true}
            optionText="Show Member Contributions"
            checked={showMembers}
          ></ToggleOption>
        </div>
      </div>
      <div className="">
        <Text className="-rotate-90 -left-12 text-light-slate-10 top-[50%] absolute ">Lines of Code Changed</Text>
        <div className="">
          <EChartWrapper option={option} />
        </div>
      </div>
    </div>
  );
};

export default ScatterChart;
