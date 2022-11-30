import React, { useState } from "react";

interface ComponentDateFilterProps {
  setDateFilter: (value: number) => void;
}
type FilterState = {
  name: string;
  value: number;
};
const ComponentDateFilter = () => {
  const [activeFilter, setActiveFilter] = useState<FilterState>();
  const dates = [
    { name: "7d", value: 7 },
    { name: "30d", value: 30 },
    { name: "3m", value: 90 }
  ];

  const handleFilterClick = (date: FilterState) => {
    setActiveFilter(date);

    // Logic to setDateFilter goes herein with the dates value
  };

  return (
    <div className="flex text-sm gap-4 items-center">
      <span>Date filter:</span>
      <div className="flex items-center">
        {dates.map(({ name, value }, index) => (
          <div
            onClick={() => handleFilterClick({ name, value })}
            className={`px-2 py-1.5  rounded-lg cursor-pointer transition text-light-slate-9 ${
              activeFilter?.value === value && "border text-light-slate-12 border-light-orange-10"
            }`}
            key={index}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentDateFilter;
