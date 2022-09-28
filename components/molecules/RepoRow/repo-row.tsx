import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, ChevronDownIcon, ChevronUpIcon, MinusSmallIcon } from "@heroicons/react/24/solid";
import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";
import Pill from "components/atoms/Pill/pill";
import { useContributionsList } from "lib/hooks/useContributionsList";
import { useRepositoryCommits } from "lib/hooks/useRepositoryCommits";
import { getCommitsLast30Days } from "lib/utils/get-recent-commits";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";
import Sparkline from "components/atoms/Sparkline/sparkline";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import StackedAvatar from "../StackedAvatar/stacked-avatar";
import { useState } from "react";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import clsx from "clsx";

interface RepoProps {
  repo: RepositoriesRows;
}

const getActivity = (total?: number, loading?: boolean) => {
  if (total === undefined || loading) {
    return "-";
  }

  if (total > 80) {
    return <Pill icon={<ArrowTrendingUpIcon color="green" className="h-4 w-4" />} text="High" color="green" />;
  }

  if (total >= 20 && total <= 80) {
    return <Pill icon={<MinusSmallIcon color="black" className="h-4 w-4" />} text="Medium" color="yellow" />;
  }

  return <Pill icon={<ArrowTrendingDownIcon color="red" className="h-4 w-4" />} text="Low" color="red" />;
};

const getTotalPrs = (openPrsCount?: number, mergedPrsCount?: number, closedPrsCount?: number, draftPrsCount?: number): number => {
  const open = openPrsCount || 0;
  const merged = mergedPrsCount || 0;
  const closed = closedPrsCount || 0;
  const drafts = draftPrsCount || 0;

  const total = open + closed + merged - drafts;

  if (total <= 0) {
    return 0;
  }
  
  return total;
};

const getPrsMerged = (total: number, merged: number): number => {
  if (total <= 0) {
    return 0;
  }

  const result = Math.floor(merged/total * 100);

  return result;
};

const getPrsSpam = (total: number, spam: number): number => {
  if (total <= 0) {
    return 0;
  }

  const result = Math.floor(spam/total * 100);

  return result;
};


const RepoRow = ({repo}:RepoProps): JSX.Element => {
  const { name,
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
    prVelocityCount } = repo;

  const { data: contributorData, meta: contributorMeta } = useContributionsList(repo.id, "", "updated_at");
  const { data: commitsData, meta: commitMeta, isLoading: commitLoading } = useRepositoryCommits(repo.id);
  const totalPrs = getTotalPrs(openPrsCount, mergedPrsCount, closedPrsCount, draftPrsCount);
  const prsMergedPercentage = getPrsMerged(totalPrs, mergedPrsCount || 0);
  const spamPrsPercentage = getPrsSpam(totalPrs, spamPrsCount || 0);
 

  const days = getCommitsLast30Days(commitsData);
  const last30days = [
    {
      "id": `last30-${repo.id}`,
      "color": "hsl(63, 70%, 50%)",
      data: days
    }
  ];

  const [tableOpen, setTableOpen] = useState<boolean>(false);
  return (<>
    <div key={`${ownerAvatar}/${name}`} className="odd:bg-white md:hidden px-5 overflow-hidden py-2  even:bg-light-slate-2">
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
        <div className="">
          <div
            onClick={() => setTableOpen(!tableOpen)}
            className="border rounded-md p-1 w-6 h-6 items-center justify-between"
          >
            
            {tableOpen ? <ChevronUpIcon className="" /> : <ChevronDownIcon />}
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

        <div onClick={() => setTableOpen(!tableOpen)} className="text-center border rounded-lg py-1 mt-3">
            Hide details
        </div>
      </div>  
    </div>
    <div className={`${classNames.row} `}>
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
      <div className={clsx(classNames.cols.contributors, "hidden lg:flex")}>
        {contributorMeta.itemCount! > 0 ? <StackedAvatar contributors={contributorData} /> : "-"}

        {contributorMeta.itemCount! >= 5 ? <div>&nbsp;{`+${contributorMeta.itemCount - 5}`}</div> : ""}
      </div>

      {/* Column: Last 30 Days */}
      <div className={clsx(classNames.cols.last30days,"hidden lg:flex" )}>{last30days && <Sparkline data={last30days} />}</div>
    </div>
  </>)

  ;
};
export default RepoRow;
