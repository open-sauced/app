import { VscGitMerge, VscGitPullRequest, VscGitPullRequestClosed, VscGitPullRequestDraft } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoDiff } from "react-icons/go";
import { BsFileDiff } from "react-icons/bs";
import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Text from "components/atoms/Typography/text";
import { calcDistanceFromToday } from "lib/utils/date-utils";
import humanizeNumber from "lib/utils/humanizeNumber";
import Tooltip from "components/atoms/Tooltip/tooltip";

interface PullRequestTableProps {
  contributor: string;
  topic: string;
  repositories?: string[];
  limit?: number;
  isHoverCard?: boolean;
  range?: string;
}

const PullRequestTable = ({
  contributor,
  topic,
  repositories,
  limit,
  isHoverCard,
  range,
}: PullRequestTableProps): JSX.Element => {
  const { data, isLoading } = useContributorPullRequests({
    contributor,
    topic,
    repositories,
    limit,
    range,
  });

  return data.length > 0 ? (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center bg-light-slate-3 rounded-md px-2 py-1 ">
          <div className="w-3/5">
            <Text className=" ">Latest PRs</Text>
          </div>
          <div className={`${isHoverCard && "ml-auto"} justify-end w-[calc(10%-4px)]`}>
            <Tooltip content="Last Commit Date">
              <FaRegCalendar className="text-slate-500 w-3.5 h-3.5" />
            </Tooltip>
          </div>
          <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)]`}>
            <Tooltip content="Date Approved">
              <FaRegCheckCircle className="text-slate-500 w-3.5 h-3.5" />
            </Tooltip>
          </div>
          <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)]`}>
            <Tooltip content="Files Touched">
              <GoDiff className="text-slate-500 w-3.5 h-3.5" />
            </Tooltip>
          </div>
          <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)]`}>
            <Tooltip content="Lines Touched">
              <BsFileDiff className="text-slate-500 w-3.5 h-3.5" />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          {data.map((pr, index) => (
            <PullRequestTableRow key={index} pullRequest={pr} isHoverCard={isHoverCard} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className="px-2 py-1">{isLoading ? <SkeletonWrapper height={20} /> : "There are currently no PRs..."}</div>
  );
};

export default PullRequestTable;

function PullRequestTableRow({ pullRequest, isHoverCard }: { pullRequest: DbRepoPREvents; isHoverCard?: boolean }) {
  const renderIcon = () => {
    if (pullRequest.pr_is_draft) {
      return <VscGitPullRequestDraft title="Draft Pull Request" className="w-3 h-3 mt-1.5 text-slate-400" />;
    } else if (pullRequest.pr_is_merged) {
      return <VscGitMerge title="Merged Pull Request" className="w-3 h-3 mt-1.5 text-purple-600" />;
    } else {
      switch (pullRequest.pr_state) {
        case "open":
          return <VscGitPullRequest title="Open Pull Request" className="w-3 h-3 mt-1.5 text-green-600" />;
        case "closed":
          return <VscGitPullRequestClosed title="Closed Pull Request" className="w-3 h-3 mt-1.5 text-red-500" />;
      }
    }
  };

  return (
    <div className="flex gap-2 items-center px-2 py-1">
      <div className={`flex item-center gap-2 w-3/5 ${isHoverCard && "w-5/6"}`}>
        {renderIcon()}
        <Text title="updated date">{calcDistanceFromToday(new Date(pullRequest.pr_updated_at))}</Text>
        <Text title={pullRequest.pr_title} className="!text-light-slate-12 !w-32 md:!w-72 !truncate">
          <a href={`https://github.com/${pullRequest.repo_name}/pull/${pullRequest.pr_number}`} target="_blank">
            {pullRequest.pr_title}
          </a>
        </Text>
      </div>
      <div className={`${isHoverCard && "ml-auto"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {calcDistanceFromToday(new Date(pullRequest.pr_updated_at))}
      </div>
      <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {pullRequest.pr_is_merged ? calcDistanceFromToday(new Date(pullRequest.pr_merged_at)) : "-"}
      </div>
      <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {humanizeNumber(pullRequest.pr_changed_files, "abbreviation")}
      </div>
      <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {humanizeNumber(Math.abs(pullRequest.pr_additions - pullRequest.pr_deletions), "abbreviation")}
      </div>
    </div>
  );
}
