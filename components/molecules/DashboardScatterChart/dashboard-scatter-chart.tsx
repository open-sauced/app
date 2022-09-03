import React, { useState } from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";
import ToggleOption from "components/atoms/ToggleOption/toggle-option";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";


interface DashboardScatterChartProps {
    title: string;
    option: Object;
}

const DashboardScatterChart: React.FC<DashboardScatterChartProps> = ({ title, option }) => {
  const [showMembers, setShowMembers] = useState(false);
  const [showBots, setShowBots] = useState(false);
  const handleShowMembers = () => {
    setShowMembers(!showMembers);
    // Additional logic for showing members
  };
  const handleShowBots = () => {
    setShowBots(!showBots);
    // Additional logic for showing bots
  };
  return (
    <div>
      <div className="flex justify-between">
        <Title level={4}>{title}</Title>
        <div className="flex gap-2 pr-10">
          <ToggleOption handleToggle={handleShowBots} checked={showBots} optionText="Show Bots"></ToggleOption>
          <ToggleOption
            handleToggle={handleShowMembers}
            withIcon={true}
            optionText="Show Outside Contributors"
            checked={showMembers}
          ></ToggleOption>
        </div>
      </div>
      <div className="mt-3">
        <Text className="-rotate-90 -left-12 text-light-slate-10 top-[50%] absolute ">Lines of Code Changed</Text>
        <div className="ml-5">
          <EChartWrapper option={option} />
        </div>
      </div>
    </div>
  );
};

export default DashboardScatterChart;
