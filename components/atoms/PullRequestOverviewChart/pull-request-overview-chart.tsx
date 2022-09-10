import React from "react";

interface PullRequestOverviewChartBarProps {
  percent?: number;
  type?: "open" | "merged" | "closed" | "draft";
}

const PullRequestOverviewChartBar: React.FC<PullRequestOverviewChartBarProps> = ({ percent, type }) => {
  return (
    <div 
      className={`
        ${ type === "open" ? "bg-light-grass-9" : type === "merged" ? "bg-purple-600" : type === "closed" ? "bg-light-red-9" : "bg-light-slate-9"}
        transition-all duration-500 ease-in-out rounded-full`}
      style={{width: `${percent}`}}></div>
  );
};

interface PullRequestOverviewChartProps {
  className?: string;
  open?: number;
  merged?: number;
  closed?: number;
  draft?: number;
  totalPullRequests?: number;
}

const PullRequestOverviewChart: React.FC<PullRequestOverviewChartProps> = ({ className, open, merged, closed, draft, totalPullRequests }) => {  
  const getPercentage = (PullRequestType: number) => {
    return (((!!PullRequestType ? PullRequestType : 0) * 100) / (!!totalPullRequests ? totalPullRequests : 0));
  };

  return (
    <div
      className="w-full h-3 flex gap-1 bg-light-slate-2 rounded-full overflow-hidden">
      
      {/* Open */}
      <PullRequestOverviewChartBar percent={`${getPercentage(open)}%`} type="open" />

      {/* Merged */}
      <PullRequestOverviewChartBar percent={`${getPercentage(merged)}%`} type="merged" />

      {/* Closed */}
      <PullRequestOverviewChartBar percent={`${getPercentage(closed)}%`} type="closed" />
      
      {/* Draft */}
      <PullRequestOverviewChartBar percent={`${getPercentage(draft)}%`} type="draft" />
    </div>
  );
};

export default PullRequestOverviewChart;