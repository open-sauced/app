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
interface OverviewDetails {
  type: string;
  percent: number | undefined;
}

const PullRequestOverview: React.FC<PullRequestOverviewProps> = ({ open, merged, closed, draft, prActiveCount }) => {
  const totalPullRequests = Math.round(
    (!!open ? open : 0) + (!!merged ? merged : 0) + (!!closed ? closed : 0) + (!!draft ? draft : 0)
  );

  // used this state to manage actively hovered pull request overview chart
  const [prOverviewDetails, setPrOverviewDetails] = useState<OverviewDetails>({
    type: "",
    percent: totalPullRequests,
  });
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full flex justify-between gap-1">
        <div className="  text-base text-light-slate-11 tracking-tight">
          {prOverviewDetails.percent}{" "}
          {`${prOverviewDetails.percent && prOverviewDetails.percent > 0 ? prOverviewDetails.type : ""} PR${
            totalPullRequests === 1 ? "" : "s"
          }`}
        </div>

        {/* Churn Number compared with previous date (default: last 30 days vs. previous 30 days range) */}
        <div className={`text-light-slate-9 flex items-center gap-x-1 text-base tracking-tight`}>
          {prOverviewDetails.percent ? Math.round((prOverviewDetails.percent / totalPullRequests) * 100) : 0}%
        </div>
      </div>

      <PullRequestOverviewChart
        setOverviewDetails={setPrOverviewDetails}
        open={open}
        merged={merged}
        closed={closed}
        draft={draft}
        totalPullRequests={totalPullRequests}
      />
    </div>
  );
};

export default PullRequestOverview;
