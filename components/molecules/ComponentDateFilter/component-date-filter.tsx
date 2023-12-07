import { useState } from "react";

import Tooltip from "components/atoms/Tooltip/tooltip";

interface ComponentDateFilterProps {
  setRangeFilter: (range: number) => void;
  defaultRange?: number;
}

const ComponentDateFilter = ({ setRangeFilter, defaultRange }: ComponentDateFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<number>(defaultRange ?? 30);
  const dates = [7, 30, 90];

  const rangeFormatter = (value: number) => {
    return value === 7 ? "7d" : value === 30 ? "30d" : "3m";
  };
  const handleFilterClick = (range: number) => {
    setActiveFilter(range);

    // Logic to setDateFilter goes herein with the dates value
    setRangeFilter(range);
  };

  return (
    <div className="flex items-center text-sm bg-white rounded-lg shrink-0 w-max">
      {dates.map((range, index) => (
        <Tooltip key={index} content={`${rangeFormatter(range)} from today`} direction="top">
          <button
            onClick={() => handleFilterClick(range)}
            className={`px-4 py-1.5 rounded-lg cursor-pointer transition text-light-slate-9 ${
              activeFilter === range && "border text-light-slate-12 bg-light-slate-5"
            }`}
            key={index}
          >
            {rangeFormatter(range)}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

export default ComponentDateFilter;
