import React from "react";

interface PROverviewChartProps {
    className?: string;
    open?: number;
    merged?: number;
    closed?: number;
    draft?: number;
}

interface PROverviewChartBarProps {
  percent?: number;
  type?: "open" | "merged" | "closed" | "draft";
}

const PROverviewChartBar: React.FC<PROverviewChartBarProps> = ({ percent, type }) => {
  return (
    <div 
      className={`
        ${ type === "open" ? "bg-light-grass-9" : type === "merged" ? "bg-purple-600" : type === "closed" ? "bg-light-red-9" : "bg-light-slate-9"}
        transition-all duration-500 ease-in-out rounded-full`}
      style={{width: `${percent}`}}></div>
  );
};


const PROverviewChart: React.FC<PROverviewChartProps> = ({ className, open = 0, merged = 20, closed = 1, draft = 3 }) => {  
  const totalPRs = open + merged + closed + draft;
  const getPercentage = (PRType: number) => {
    return ((PRType * 100) / totalPRs);
  };

  return (
    <div
      className="w-full h-3 flex gap-1 bg-light-slate-2 rounded-full overflow-hidden">
      
      {/* Open */}
      <PROverviewChartBar percent={`${getPercentage(open)}%`} type="open" />

      {/* Merged */}
      <PROverviewChartBar percent={`${getPercentage(merged)}%`} type="merged" />

      {/* Closed */}
      <PROverviewChartBar percent={`${getPercentage(closed)}%`} type="closed" />
      
      {/* Draft */}
      <PROverviewChartBar percent={`${getPercentage(draft)}%`} type="draft" />
    </div>
  );
};

export default PROverviewChart;