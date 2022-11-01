import Link from "next/link";

import clsx from "clsx";

import Pill from "components/atoms/Pill/pill";
import CardRepoList from "../CardRepoList/card-repo-list";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import StackedAvatar from "../StackedAvatar/stacked-avatar";
import FavoriteSelector from "components/atoms/FavoriteSelector/favorite-selector";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import Button from "components/atoms/Button/button";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { getRelativeDays } from "lib/utils/date-utils";

interface InsightRepoRowProps {
  insight: DbUserInsight;
}

const InsightTableRow = ({ insight }: InsightRepoRowProps) => {
  const members: any[] = [];
  const repoIds = insight.repos.map(repo => repo.repo_id);
  const { data: repoData, isError, isLoading } = useRepositoriesList(false, repoIds);
  const repoList = repoData.map(repo => {
    return {
      repoIcon: `https://github.com/${repo.owner}.png?size=60`,
      repoName: repo.name,
      repoOwner: repo.owner
    };
  });

  const repoTotals = repoData.reduce((totals, curr) => {
    const merged = (totals["merged"] || 0) + (curr.mergedPrsCount || 0);
    const opened = (totals["opened"] || 0) + (curr.openPrsCount || 0);
    const closed = (totals["closed"] || 0) + (curr.closedPrsCount || 0);
    const drafts = (totals["drafts"] || 0) + (curr.draftPrsCount || 0);
    const churn = (totals["churn"] || 0) + (curr.churnTotalCount || 0);
    const velocity = (totals["velocity"] || 0) + (curr.prVelocityCount || 0);
    const total = (totals["total"] || 0);

    return {
      merged,
      opened,
      closed,
      drafts,
      churn,
      velocity,
      total: total + merged + opened + closed + drafts
    };
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col lg:min-w-[1280px]">
      <div className={clsx("flex items-center py-3 px-6 gap-10")}>
        {/* Page name col */}
        <div className={clsx("flex-1 max-w-[150px] min-w-[140px] truncate ")}>
          {insight.name}
        </div>
        {/* Repositories col*/}
        <div className={clsx(classNames.cols.repository, "!min-w-[160px] !max-w-[160px] hidden lg:block")}>
          {insight.repos && insight.repos.length > 0 && <CardRepoList limit={2} repoList={repoList} />}
        </div>
        {/* Average Prs opened col*/}
        <div className={clsx(classNames.cols.prOverview, "!min-w-[100px] !max-w-[130px] ")}>
          <PullRequestOverview
            merged={repoTotals["merged"]}
            open={repoTotals["opened"]}
            closed={repoTotals["closed"]}
            draft={repoTotals["draft"]}
            churn={repoTotals["churn"]} />
        </div>

        {/* Average Pr velocity col*/}
        <div className={clsx(classNames.cols.prVelocity, "!max-w-[130px] min-w-[130px] !justify-start")}>
          <div>
            {repoData.length > 0 ? getRelativeDays(Math.round(repoTotals["velocity"] / repoData.length)) : "-"}
          </div>
          <Pill text={repoTotals["total"] > 0 ? `${Math.round((repoTotals["merged"]/repoTotals["total"]) * 100)}%` : "-"} size="small" color="green" />
        </div>

        {/* Members avatar col*/}
        <div className={clsx(classNames.cols.contributors, "lg:flex hidden")}>
          {members?.length! > 0 ? <StackedAvatar contributors={members || []} /> : "-"}

          {members?.length! > 5 ? <div>&nbsp;{`+${members?.length! - 5} members`}</div> : ""}
        </div>

        {/* Favorite col */}
        <div className="flex gap-4">
          <FavoriteSelector isFavorite={insight.is_favorite} />
          <Link href="#">
            <Button type="text" className="!border !border-light-slate-8">
              Go to Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InsightTableRow;
