import StackedAvatar from "components/molecules/StackedAvatar/stacked-avatar";
import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";
import Pill from "components/atoms/Pill/pill";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";

import Sparkline from "components/atoms/Sparkline/sparkline";

export interface RepoRowProps {
  repo: RepositoriesRows;
  days: CommitGraphData[];
  last30days: last30DaysData[];
  spamPrsPercentage: number;
  prsMergedPercentage: number;
  totalPrs: number;
  commitMeta: Meta | { itemCount: number };
  commitsData: DbRepoCommit[];
  commitLoading: boolean;
  contributorData: DbContribution[]
  contributorMeta: Meta | { itemCount: number }
  getActivity: (total?: number, loading?: boolean) => JSX.Element | "-";
}
interface last30DaysData  {
  id: string;
  color: string;
  data: CommitGraphData[];
};
interface CommitGraphData {
  x: number;
  y: number;
}

const RepoRowDesktop = ({
  repo,
  commitLoading,
  commitsData,
  commitMeta,
  days,
  last30days,
  spamPrsPercentage,
  prsMergedPercentage,
  totalPrs,
  contributorData,
  contributorMeta,
  getActivity
}: RepoRowProps): JSX.Element => {
  const {
    name,
    owner: handle,
    owner_avatar: ownerAvatar,
    openPrsCount,
    closedPrsCount,
    draftPrsCount,
    mergedPrsCount,
    spamPrsCount,
    churn,
    churnTotalCount,
    churnDirection,
    prVelocityCount
  } = repo;

  return (
    <div className={`${classNames.row}`}>
      {/* Column: Repository Name */}
      <div className={classNames.cols.repository}>
        <TableRepositoryName avatarURL={ownerAvatar} name={name} handle={handle}></TableRepositoryName>
      </div>

      {/* Column: Activity */}
      <div className={classNames.cols.activity}>{getActivity(commitMeta.itemCount, commitLoading)}</div>

      {/* Column: PR Overview */}
      <div className={classNames.cols.prOverview}>
        <PullRequestOverview
          open={openPrsCount}
          merged={mergedPrsCount}
          closed={closedPrsCount}
          draft={draftPrsCount}
          churn={churnTotalCount}
          churnDirection={`${churnDirection}`}
        ></PullRequestOverview>
      </div>

      {/* Column: PR Velocity */}
      <div className={`${classNames.cols.prVelocity}`}>
        <div>
          {prVelocityCount ?? 0} PR{prVelocityCount === 1 ? "" : "s"}
        </div>
        <Pill text={`${prsMergedPercentage}%`} size="small" color="green" />
      </div>

      {/* Column: SPAM */}
      <div className={`${classNames.cols.spam}`}>
        {spamPrsCount && spamPrsCount > 0 ? (
          <>
            <div>
              {spamPrsCount || 0} PR{spamPrsCount === 1 ? "" : "s"}
            </div>
            <Pill text={`${spamPrsPercentage || 0}%`} size="small" color={spamPrsPercentage > 10 ? "red" : "yellow"} />
          </>
        ) : (
          "-"
        )}
      </div>

      {/* Column: Contributors */}
      <div className={`flex ${classNames.cols.contributors}`}>
        {contributorMeta.itemCount! > 0 ? <StackedAvatar contributors={contributorData} /> : "-"}

        {contributorMeta.itemCount! >= 5 ? <div>&nbsp;{`+${contributorMeta.itemCount - 5}`}</div> : ""}
      </div>

      {/* Column: Last 30 Days */}
      <div className={classNames.cols.last30days}>{last30days && <Sparkline data={last30days} />}</div>
    </div>
  );
};
export default RepoRowDesktop;
