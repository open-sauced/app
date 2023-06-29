import Link from "next/link";
import { User } from "@supabase/supabase-js";

import clsx from "clsx";

import Pill from "components/atoms/Pill/pill";
import FavoriteSelector from "components/atoms/FavoriteSelector/favorite-selector";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import Button from "components/atoms/Button/button";

import useRepositories from "lib/hooks/api/useRepositories";
import { getRelativeDays } from "lib/utils/date-utils";
import getRepoInsights from "lib/utils/get-repo-insights";
import StackedAvatar from "../StackedAvatar/stacked-avatar";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import CardRepoList from "../CardRepoList/card-repo-list";

interface InsightRepoRowProps {
  user: User | null;
  insight: DbUserInsight;
}

const InsightTableRow = ({ user, insight }: InsightRepoRowProps) => {
  const members: any[] = [];
  const repoIds = insight.repos.map((repo) => repo.repo_id);
  const { data: repoData } = useRepositories(repoIds);
  const { open, closed, merged, drafts, churn, velocity, total, repoList } = getRepoInsights(repoData);

  return (
    <div className="flex flex-col lg:min-w-[1280px]">
      <div className={clsx("flex items-center py-3 px-6 gap-10")}>
        {/* Page name col */}
        <div className={clsx("flex-1 max-w-[150px] min-w-[140px] truncate ")}>{insight.name}</div>
        {/* Repositories col*/}
        <div className={clsx(classNames.cols.repository, "!min-w-[160px] !max-w-[160px] hidden lg:block")}>
          {insight.repos && insight.repos.length > 0 && <CardRepoList limit={2} repoList={repoList} />}
        </div>
        {/* Average Prs opened col*/}
        <div className={clsx(classNames.cols.prOverview, "!min-w-[100px] !max-w-[130px] ")}>
          <PullRequestOverview merged={merged} open={open} closed={closed} draft={drafts} churn={churn} />
        </div>

        {/* Average Pr velocity col*/}
        <div className={clsx(classNames.cols.prVelocity, "!max-w-[130px] min-w-[130px] !justify-start")}>
          <div>{repoData.length > 0 ? getRelativeDays(Math.round(velocity / repoData.length)) : "-"}</div>
          <Pill text={total > 0 ? `${Math.round((merged / total) * 100)}%` : "-"} size="small" color="green" />
        </div>

        {/* Members avatar col*/}
        <div className={clsx(classNames.cols.contributors, "lg:flex hidden")}>
          {members?.length! > 0 ? <StackedAvatar contributors={members || []} /> : ""}

          {members?.length! > 5 ? <div>&nbsp;{`+${members?.length! - 5} members`}</div> : ""}
        </div>

        {/* Favorite col */}
        <div className="flex gap-4">
          <FavoriteSelector isFavorite={insight.is_favorite} />
          <Link href={`/pages/${user?.user_metadata.user_name}/${insight.id}/dashboard`}>
            <Button variant="text" className="border border-light-slate-8">
              Go to Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InsightTableRow;
