import { IconContext } from "react-icons";
import { VscGitMerge, VscGitPullRequest, VscGitPullRequestClosed, VscGitPullRequestDraft } from "react-icons/vsc";

import { calcDistanceFromToday } from "lib/utils/date-utils";

import Text from "components/atoms/Typography/text";
import humanizeNumber from "lib/utils/humanizeNumber";

interface LatestPrTableRowProps {
  prName: string;
  prStatus: string;
  merged?: boolean;
  draft?: boolean;
  prMergedTime: string;
  prIssuedTime: string;
  noOfFilesChanged: number;
  noOfLinesChanged: number;
  isHoverCard?: boolean;
  repoFullName: string;
  prNumber: number;
  prUpdatedTime: string;
}
const LatestPrTableRow = ({
  prName,
  prStatus,
  prIssuedTime,
  prMergedTime,
  noOfFilesChanged,
  noOfLinesChanged,
  merged,
  draft,
  isHoverCard,
  repoFullName,
  prNumber,
  prUpdatedTime,
}: LatestPrTableRowProps) => {
  return (
    <div className="flex gap-2 items-center px-2 py-1">
      <div className={`flex item-center gap-2 w-3/5 ${isHoverCard && "w-5/6"}`}>
        {!draft && prStatus.toLowerCase() === "open" ? (
          <IconContext.Provider value={{ color: "green", style: { width: 14, height: 14, marginTop: 2 } }}>
            <VscGitPullRequest title="Open Pull Request" />
          </IconContext.Provider>
        ) : (!draft && prStatus.toLowerCase() === "closed") || prStatus.toLowerCase() === "merged" ? (
          <IconContext.Provider
            value={{ color: merged ? "purple" : "red", style: { width: 14, height: 14, marginTop: 2 } }}
          >
            {merged ? (
              <VscGitMerge title="Merged Pull Request" />
            ) : (
              <VscGitPullRequestClosed title="Closed Pull Request" />
            )}
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, marginTop: 2 } }}>
            <VscGitPullRequestDraft title="Draft Pull Request" />
          </IconContext.Provider>
        )}
        <Text title="updated date">{calcDistanceFromToday(new Date(prUpdatedTime))}</Text>
        <Text title={prName} className="!text-light-slate-12 !w-32 md:!w-72 !truncate">
          <a href={`https://github.com/${repoFullName}/pull/${prNumber}`} target="_blank" rel="noreferrer">
            {prName}
          </a>
        </Text>
      </div>
      <div className={`${isHoverCard && "ml-auto"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {calcDistanceFromToday(new Date(prIssuedTime))}
      </div>
      <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {merged ? calcDistanceFromToday(new Date(prMergedTime)) : "-"}
      </div>
      <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {noOfFilesChanged >= 1000 ? humanizeNumber(noOfFilesChanged, "abbreviation") : noOfFilesChanged}
      </div>
      <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)] text-sm text-light-slate-11`}>
        {noOfLinesChanged >= 1000 ? humanizeNumber(noOfLinesChanged, "abbreviation") : noOfLinesChanged}
      </div>
    </div>
  );
};

export default LatestPrTableRow;
