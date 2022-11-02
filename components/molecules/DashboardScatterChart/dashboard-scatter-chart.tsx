import React, { useState } from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";
import ToggleOption from "components/atoms/ToggleOption/toggle-option";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";

interface DashboardScatterChartProps {
  title: string;
  option: Object;
  showBots: boolean;
  setShowBots: (toggle: boolean) => void;
}

const DashboardScatterChart: React.FC<DashboardScatterChartProps> = ({ title, option, showBots, setShowBots }) => {
  const [showMembers, setShowMembers] = useState(false);

  let functionTimeout: any;

  const handleShowMembers = () => {
    clearTimeout(functionTimeout);

    functionTimeout = setTimeout(() => {
      setShowMembers(!showMembers);
      // Additional logic for showing members
    }, 50);
  };

  const handleShowBots = () => {
    clearTimeout(functionTimeout);

    functionTimeout = setTimeout(() => {
      setShowBots(!showBots);
      // Additional logic for showing bots
    }, 50);
  };
  return (
    <div>
      <div className="flex justify-between px-1">
        <Title level={4} className="!text-sm !  !text-light-slate-12">
          {title}
        </Title>
        {/* replaced display flex to hidden on show/bots container */}
        <div className="flex flex-col md:flex-row gap-2">
          <ToggleOption handleToggle={handleShowBots} checked={showBots} optionText="Show Bots"></ToggleOption>
          <div className="hidden">
            <ToggleOption
              handleToggle={handleShowMembers}
              withIcon={true}
              optionText="Show Outside Contributors"
              checked={showMembers}
            ></ToggleOption>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Text className="-rotate-90  opacity-0 md:opacity-100 -left-6 text-light-slate-10 top-[50%] absolute ">
          Lines Touched
        </Text>
        <div className="ml-5">
          <EChartWrapper option={option} />
        </div>
      </div>
    </div>
  );
};

export default DashboardScatterChart;
