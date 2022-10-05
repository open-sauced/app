import { ArrowDownIcon, ArrowUpIcon } from "@primer/octicons-react";
import React, { useState } from "react";
import PullRequestOverviewChart from "../../atoms/PullRequestOverviewChart/pull-request-overview-chart";

interface PullRequestOverviewProps {
  className?: string;
  open?: number;
  merged?: number;
  closed?: number;
  draft?: number;
  churn?: number;
  churnDirection?: string;
  prActiveCount?: number;
}

const PullRequestOverview: React.FC<PullRequestOverviewProps> = ({ className, open, merged, closed, draft, churn, churnDirection = "down", prActiveCount }) => {
  const totalPullRequests = (!!open ? open : 0) + (!!merged ? merged : 0) + (!!closed ? closed : 0) + (!!draft ? draft : 0);
  const prCount = prActiveCount || 0;
  const activePrPercentage = totalPullRequests > 0 ? Math.round((prCount/totalPullRequests) * 100) : 0;
  const [prOverviewDetails, setPrOverviewDetails] = useState<{type: string, percent: number | undefined}>({type: "closed", percent: closed});
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full flex justify-between gap-1">

        {/* Total Number of Pull Requests */}
        <div className="font-medium text-base text-light-slate-11 tracking-tight">
          {totalPullRequests} {`PR${totalPullRequests === 1 ? "" : "s"}`}
        </div>

        {/* Churn Number compared with previous date (default: last 30 days vs. previous 30 days range) */}
        <div className={`
          ${prOverviewDetails.type === "open" ? "text-light-grass-10" : prOverviewDetails.type === "closed" ? "text-light-red-10":prOverviewDetails.type === "merged" ? "text-purple-600" : "text-light-slate-9"}
          font-medium flex items-center gap-x-1 text-base tracking-tight`}>
          {prOverviewDetails.type === "open" ? <ArrowUpIcon size={14} /> : prOverviewDetails.type === "closed" ? <ArrowDownIcon size={14} />: ""}{prOverviewDetails.percent ? Math.round((prOverviewDetails.percent/totalPullRequests)*100) : 0}%
        </div>
      </div>

      <PullRequestOverviewChart setOverviewDetails={setPrOverviewDetails} open={open} merged={merged} closed={closed} draft={draft} totalPullRequests={totalPullRequests} />
    </div>
  );
};

export default PullRequestOverview;
