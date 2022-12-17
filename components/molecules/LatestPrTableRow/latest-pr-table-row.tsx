import React from "react";

import { IconContext } from "react-icons";
import { VscGitMerge, VscGitPullRequest, VscGitPullRequestClosed, VscGitPullRequestDraft } from "react-icons/vsc";

import { calcDistanceFromToday } from "lib/utils/date-utils";

import Text from "components/atoms/Typography/text";

interface LatestPrTableRowProps {
  prName: string;
  prStatus: string;
  merged?: boolean;
  prMergedTime: string;
  prIssuedTime: string;
  noOfFilesChanged: number;
  noOfLinesChanged: number;
  repoName: string;
  repoOwner: string;
  prNumber: number;
}
const LatestPrTableRow = ({
  prName,
  prStatus,
  prIssuedTime,
  prMergedTime,
  noOfFilesChanged,
  noOfLinesChanged,
  merged,
  repoName,
  repoOwner,
  prNumber
}: LatestPrTableRowProps) => {
  return (
    <div className="flex gap-2 items-center px-2 py-1">
      <div className="flex cursor-default item-center gap-2 w-3/5">
        {prStatus === "open" ? (
          <IconContext.Provider value={{ color: "green", style: { width: 14, height: 14, marginTop: 2 } }}>
            <VscGitPullRequest title="Open Pull Request" />
          </IconContext.Provider>
        ) : prStatus === "closed" ? (
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
        <Text>{calcDistanceFromToday(new Date(parseInt(prIssuedTime, 10)))}</Text>
        <Text title={prName} className="!text-light-slate-12 !w-32 md:!w-72  !truncate ">
        <a href={`https://github.com/${repoOwner}/${repoName}/pull/${prNumber}`} target="_blank">
          {prName}
        </a>
        </Text>
      </div>
      <div className="flex justify-end w-[calc(10%-4px)] text-sm text-light-slate-11">
        {calcDistanceFromToday(new Date(parseInt(prIssuedTime, 10)))}
      </div>
      <div className="flex justify-end w-[calc(10%-4px)] text-sm text-light-slate-11">
        {merged ? calcDistanceFromToday(new Date(parseInt(prMergedTime, 10))) : "-"}
      </div>
      <div className="flex justify-end w-[calc(10%-4px)] text-sm text-light-slate-11">{noOfFilesChanged}</div>
      <div className="flex justify-end w-[calc(10%-4px)] text-sm text-light-slate-11">{noOfLinesChanged}</div>
    </div>
  );
};

export default LatestPrTableRow;
