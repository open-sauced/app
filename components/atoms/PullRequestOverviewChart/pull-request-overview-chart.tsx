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
  const getBarColor = (type: string | undefined) => {
    switch (type) {
      case "open":
        return "bg-light-grass-9";
      case "merged":
        return "bg-purple-600";
      case "closed":
        return "bg-light-red-9";
      case "draft":
        return "bg-light-slate-9";
      default:
        return "";
    }
  };

  return (
    <div
      {...event}
      className={`
        ${getBarColor(type)}
        ${percent === 0 ? "hidden" : "block"}
        transition-all shrink-0 duration-500 ease-in-out rounded-full`}
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
  setOverviewDetails,
}) => {
  const getPercentage = (PullRequestType: number | undefined) => {
    return ((!!PullRequestType ? PullRequestType : 0) * 100) / (!!totalPullRequests ? totalPullRequests : 0);
  };

  return (
    <div className="w-full h-1.5 flex gap-0.5 bg-light-slate-2 rounded-full overflow-hidden">
      {/* Open */}
      {open && open > 0 ? (
        <PullRequestOverviewChartBar
          onMouseOver={() => setOverviewDetails({ type: "open", percent: open })}
          percent={getPercentage(open)}
          type="open"
        />
      ) : null}

      {/* Merged */}
      {merged && merged > 0 ? (
        <PullRequestOverviewChartBar
          onMouseOver={() => setOverviewDetails({ type: "merged", percent: merged })}
          percent={getPercentage(merged)}
          type="merged"
        />
      ) : null}

      {/* Closed */}
      {closed && closed > 0 ? (
        <PullRequestOverviewChartBar
          onMouseOver={() => setOverviewDetails({ type: "closed", percent: closed })}
          percent={getPercentage(closed)}
          type="closed"
        />
      ) : null}

      {/* Draft */}
      {draft && draft > 0 ? (
        <PullRequestOverviewChartBar
          onMouseOver={() => setOverviewDetails({ type: "draft", percent: draft })}
          percent={getPercentage(draft)}
          type="draft"
        />
      ) : null}
    </div>
  );
};

export default PullRequestOverviewChart;
