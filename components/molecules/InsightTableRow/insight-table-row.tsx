import Link from "next/link";

import clsx from "clsx";

import Pill from "components/atoms/Pill/pill";
import CardRepoList, { RepoList } from "../CardRepoList/card-repo-list";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import StackedAvatar from "../StackedAvatar/stacked-avatar";
import FavoriteSelector from "components/atoms/FavoriteSelector/favorite-selector";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import Button from "components/atoms/Button/button";

interface InsightRepoRowProps {
  pageName?: string;
  repositories?: RepoList[],
  members?: DbContribution[]

}

const InsightTableRow = ({ pageName, repositories, members }: InsightRepoRowProps) => {

  return (
    <div className="flex flex-col">
      <div className={clsx(classNames.row, "!gap-10")}>
        {/* Page name col */}
        <div className={clsx(classNames.cols.repository, "truncate !max-w-[190px] ")}>
          {pageName || ""} 
        </div>
        {/* Repositories col*/}
        <div className={clsx(classNames.cols.repository, " !max-w-[230px]")}>
          {repositories && repositories.length > 0 && <CardRepoList limit={3} repoList={repositories} />}
        </div>
        {/* Average Prs opened col*/}
        <div className={clsx(classNames.cols.prOverview, "!min-w-[100px] !max-w-[130px] ")}>
          <PullRequestOverview merged={30} open={12} closed={24} draft={5} churn={71} />
        </div>

        {/* Average Pr velocity col*/}
        <div className={clsx(classNames.cols.prVelocity, "!gap-10 !justify-start max-w-[150px]")}>
          <div>
            24 days
          </div>
          <Pill text={"43%"} size="small" color="green" />
        </div>

        {/* Members avatar col*/}
        <div className={clsx(classNames.cols.contributors, "flex")}>

          {members?.length! > 0 ? <StackedAvatar contributors={members || []} /> : "-"}

          {members?.length! >= 5 ? <div>&nbsp;{`+${members?.length! - 5} members`}</div> : ""}
        </div>

        {/* Favorite col */}
        <div className="flex gap-6">
          <FavoriteSelector isFavorite={false}/>
          <Link href="#">
            <Button type="text" className="!border !border-light-slate-8">Go to Page</Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default InsightTableRow;
