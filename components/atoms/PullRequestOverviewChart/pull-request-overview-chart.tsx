import React, { Dispatch, SetStateAction } from "react";

interface PullRequestOverviewChartBarProps {
  percent?: number;
  type?: "open" | "merged" | "closed" | "draft";
}

const PullRequestOverviewChartBar: React.FC<PullRequestOverviewChartBarProps & React.DOMAttributes<HTMLElement>> = ({
  percent,
  type,
  ...event
}) => {
  return (
    <div
      {...event}
      className={`
        ${
    type === "open"
      ? "bg-light-grass-9"
      : type === "merged"
        ? "bg-purple-600"
        : type === "closed"
          ? "bg-light-red-9"
          : "bg-light-slate-9"
    }
        transition-all duration-500 ease-in-out rounded-full`}
      style={{ width: `${percent}%` }}
    ></div>
  );
};

interface PullRequestOverviewChartProps {
  className?: string;
  open?: number;
  merged?: number;
  closed?: number;
  draft?: number;
  totalPullRequests?: number;
  setOverviewDetails: Dispatch<SetStateAction<{ type: string; percent: number | undefined }>>;
}

const PullRequestOverviewChart: React.FC<PullRequestOverviewChartProps> = ({
  className,
  open,
  merged,
  closed,
  draft,
  totalPullRequests,
  setOverviewDetails
}) => {
  const getPercentage = (PullRequestType: number | undefined) => {
    return ((!!PullRequestType ? PullRequestType : 0) * 100) / (!!totalPullRequests ? totalPullRequests : 0);
  };

  return (
    <div className="w-full h-1.5 flex gap-0.5 bg-light-slate-2 rounded-full overflow-hidden">
      {/* Open */}
      {open && open > 0 && <PullRequestOverviewChartBar onMouseOver={()=> setOverviewDetails({type: "open", percent: open})} percent={getPercentage(open)} type="open" />}

      {/* Merged */}
      {merged && merged > 0 && <PullRequestOverviewChartBar onMouseOver={()=> setOverviewDetails({type: "merged", percent: merged})} percent={getPercentage(merged)} type="merged" />}

      {/* Closed */}
      {closed && closed > 0 && <PullRequestOverviewChartBar onMouseOver={()=> setOverviewDetails({type: "closed", percent: closed})} percent={getPercentage(closed)} type="closed" />}

      {/* Draft */}
      {draft && draft > 0 && <PullRequestOverviewChartBar percent={getPercentage(draft)} type="draft" />}
    </div>
  );
};

export default PullRequestOverviewChart;
