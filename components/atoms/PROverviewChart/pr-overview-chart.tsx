import React from "react";

interface PROverviewChartProps {
    className?: string;
    open?: number;
    merged?: number;
    closed?: number;
    draft?: number;
}

const PROverviewChart: React.FC<PROverviewChartProps> = ({ className, open, merged, closed, draft }) => {
  const hello ="";
  
  return (
    <div
      className="bg-light-slate-2">
      {/* Open */}
      <div></div>

      {/* Merged */}
      <div></div>

      {/* Closed */}
      <div></div>
    </div>
  );
};

export default PROverviewChart;