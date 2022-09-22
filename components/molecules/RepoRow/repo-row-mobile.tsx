import Pill from "components/atoms/Pill/pill";
import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";
import { useState } from "react";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";
import { ChevronUpIcon } from "@primer/octicons-react";
import { ChevronDownIcon } from "@primer/octicons-react";
import StackedAvatar from "components/molecules/StackedAvatar/stacked-avatar";

import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import Sparkline from "components/atoms/Sparkline/sparkline";

interface RepoRowProps {
  repo: RepositoriesRows;
  days: CommitGraphData[];
  last30days: last30DaysData[];
  spamPrsPercentage: number;
  prsMergedPercentage: number;
  totalPrs: number;
  commitMeta: Meta | { itemCount: number };
  commitsData: DbRepoCommit[];
  commitLoading: boolean;
  contributorData: DbContribution[];
  contributorMeta: Meta | { itemCount: number };
  getActivity: (total?: number, loading?: boolean) => JSX.Element | "-";
}
interface last30DaysData {
  id: string;
  color: string;
  data: CommitGraphData[];
}
interface CommitGraphData {
  x: number;
  y: number;
}

const RepoRowMobile = ({
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
  const [tableOpen, setTableOpen] = useState<boolean>(false);

  return (
    <>
      <div key={`${ownerAvatar}/${name}`} className="odd:bg-white px-5 overflow-hidden py-2  even:bg-light-slate-2">
        {/* Row: Repository Name and Pr overview */}
        <div className="flex items-center gap-x-3">
          <div className="w-[55%]">
            <TableRepositoryName avatarURL={ownerAvatar} name={name} handle={handle} />
          </div>
          <div className="w-[45%]">
            <PullRequestOverview
              open={openPrsCount}
              merged={mergedPrsCount}
              closed={closedPrsCount}
              draft={draftPrsCount}
              churn={churnTotalCount}
              churnDirection={`${churnDirection}`}
            />
          </div>
          <div>
            <div
              onClick={() => setTableOpen(!tableOpen)}
              className="border rounded-md p-1 flex items-center justify-between "
            >
              {tableOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>
        </div>

        <div className={`${!tableOpen && "max-h-0"} font-medium text-light-slate-11 text-sm transition`}>
          {/* Column: Last 30 Days */}
          <div className="py-3">{last30days && <Sparkline data={last30days} width="100%" height={54} />}</div>
          {/* Row: Activity */}
          <div className="flex items-center py-3 border-b justify-between">
            <div>Activity</div>
            {getActivity(commitMeta.itemCount, commitLoading)}
          </div>

          {/* Row: Pr velocity */}
          <div className="flex items-center py-3 border-b justify-between">
            <div>Pr Velocity</div>
            <div className="flex text-base gap-x-3">
              <div>
                {prVelocityCount ?? 0} PR{prVelocityCount === 1 ? "" : "s"}
              </div>
              <Pill text={`${prsMergedPercentage}%`} size="small" color="green" />
            </div>
          </div>

          {/* Row: SPAM */}
          <div className="flex items-center py-3 border-b justify-between">
            <div>Spam</div>
            <div className="flex text-base gap-x-3">
              {spamPrsCount && spamPrsCount > 0 ? (
                <>
                  <div>
                    {spamPrsCount || 0} PR{spamPrsCount === 1 ? "" : "s"}
                  </div>
                  <Pill
                    text={`${spamPrsPercentage || 0}%`}
                    size="small"
                    color={spamPrsPercentage > 10 ? "red" : "yellow"}
                  />
                </>
              ) : (
                "-"
              )}
            </div>
          </div>

          {/* Row: Contributors */}

          <div className="flex items-center py-3 justify-between">
            <div>Contributors</div>
            <div className="flex text-base items-center">
              {contributorMeta.itemCount! > 0 ? <StackedAvatar contributors={contributorData} /> : "-"}

              {contributorMeta.itemCount! >= 5 ? <div>&nbsp;{`+${contributorMeta.itemCount - 5}`}</div> : ""}
            </div>
          </div>

          <div onClick={(e) => setTableOpen(!tableOpen)} className="text-center border rounded-lg py-1 mt-3">
            Hide details
          </div>
        </div>
      </div>
    </>
  );
};
export default RepoRowMobile;
