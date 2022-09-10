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
    <div>

      <PullRequestOverviewChart open={open} merged={merged} closed={closed} draft={draft} totalPullRequests={totalPullRequests} />
    </div>
  );
};

export default PullRequestOverview;