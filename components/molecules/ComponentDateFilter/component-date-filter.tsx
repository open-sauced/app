import React, { Dispatch, SetStateAction, useState } from "react";

import { GlobalStateInterface } from "interfaces/global-state-types";

interface ComponentDateFilterProps {
  setRangeFilter: Dispatch<SetStateAction<Partial<GlobalStateInterface>>>;
  defaultRange?: number;
}

const ComponentDateFilter = ({ setRangeFilter, defaultRange }: ComponentDateFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<number>(defaultRange || 30);
  const dates = [7, 30, 90];

  const rangeFormatter = (value: number) => {
    return value === 7 ? "7d" : value === 30 ? "30d" : "3m";
  };
  const handleFilterClick = (range: number) => {
    setActiveFilter(range);

    // Logic to setDateFilter goes herein with the dates value
    setRangeFilter((prev) => ({ ...prev, range }));
  };

  return (
    <div className="flex text-sm gap-4 items-center">
      <span>Date filter:</span>
      <div className="flex items-center">
        {dates.map((range, index) => (
          <div
            onClick={() => handleFilterClick(range)}
            className={`px-2 py-1  rounded-lg cursor-pointer transition text-light-slate-9 ${
              activeFilter === range && "border text-light-slate-12 border-light-orange-10"
            }`}
            key={index}
          >
            {rangeFormatter(range)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentDateFilter;
