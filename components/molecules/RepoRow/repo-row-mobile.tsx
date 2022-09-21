import Pill from "components/atoms/Pill/pill";
import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";
import react, { useState } from "react";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";
import { ChevronUpIcon } from "@primer/octicons-react";
import { ChevronDownIcon } from "@primer/octicons-react";
interface RepoRowProps {
  repo: RepositoriesRows;
}

const RepoRowMobile = ({ repo }: RepoRowProps): JSX.Element => {
  const {
    name,
    handle,
    owner_avatar: ownerAvatar,
    activity = "high",
    openPrsCount,
    closedPrsCount,
    draftPrsCount,
    mergedPrsCount,
    spamPrsCount,
    churn,
    churnTotalCount,
    churnDirection
  } = repo;
  const [tableOpen, setTableOpen] = useState<boolean>(false);

  return (
    <>
      <div  key={`${ownerAvatar}/${name}`} className="odd:bg-white px-5 py-2  even:bg-light-slate-2">
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
            <div onClick={() => setTableOpen(!tableOpen)} className="border rounded-md p-1 flex items-center justify-between ">
              {tableOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>
        </div>
        <div className={`${!tableOpen && "max-h-0"} font-medium text-light-slate-11 text-sm transition`}>
          <div className="flex items-center py-3 border-b justify-between">
            <div>Activity</div>
            <Pill text={activity}></Pill>
          </div>
          <div className="flex items-center py-3 border-b justify-between">
            <div>Pr Velocity</div>
            <div className="flex text-base gap-x-3">
              <div>3 days</div>
              <Pill text="10%" size="small" color="green" />
            </div>
          </div>
          <div className="flex items-center py-3 border-b justify-between">
            <div>Spam</div>
            <div className="flex text-base gap-x-3">
              <div>{spamPrsCount + " PRs"}</div>
              <Pill text="10%" size="small" color="green" />
            </div>
          </div>
          <div className="flex items-center py-3 justify-between">
            <div>Contributors</div>
            <div className="flex text-base gap-x-3">
              <div>5 PRs</div>
              <Pill text="10%" size="small" color="green" />
            </div>
          </div>
          <div onClick={(e) => setTableOpen(!tableOpen)} className="text-center border rounded-lg py-1 mt-3">Hide details</div>
        </div>
      </div>
    </>
  );
};
export default RepoRowMobile;
