import React from "react";
import PullRequestOverviewChart from "../../atoms/PullRequestOverviewChart/pull-request-overview-chart";

interface PullRequestOverviewProps {
  className?: string;
  open?: number;
  merged?: number;
  closed?: number;
  draft?: number;
  churn?: number;
  chrunDirection?: "up" | "down";
}

const PullRequestOverview: React.FC<PullRequestOverviewProps> = ({ className, open, merged, closed, draft, churn, chrunDirection }) => {
  const totalPullRequests = (!!open ? open : 0) + (!!merged ? merged : 0) + (!!closed ? closed : 0) + (!!draft ? draft : 0);

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full flex justify-between gap-1">
        
        {/* Total Number of Pull Requests */}
        <div className="font-medium text-base text-light-slate-11 tracking-tight">
          {totalPullRequests} {`PR${totalPullRequests > 1 ? "s" : ""}`}
        </div>

        {/* Churn Number compared with previous date (default: last 30 days vs. previous 30 days range) */}
        <div className={`
          ${chrunDirection === "up" ? "text-light-grass-10" : "text-light-red-10"}
          font-medium text-base tracking-tight`}>
          {chrunDirection === "up" ? "+" : "-"}{churn}%
        </div>
      </div>

      <PullRequestOverviewChart open={open} merged={merged} closed={closed} draft={draft} totalPullRequests={totalPullRequests} />
    </div>
  );
};

export default PullRequestOverview;