import Text from "components/atoms/Typography/text";
import { IconContext } from "react-icons";
import { FaRegDotCircle, FaRegCheckCircle } from "react-icons/fa";
import { BsFileDiff } from "react-icons/bs";
import { GoDiff } from "react-icons/go";
import { VscGitPullRequest, VscGitPullRequestClosed, VscGitMerge, VscGitPullRequestDraft } from "react-icons/vsc";
import { useTopicContributorPRs } from "lib/hooks/useTopicContributorPRs";
import { calcDistanceFromToday } from "lib/utils/date-utils";

export interface PRs {
  prStatus: string;
  prName: string;
  prIssuedTime: string;
  prClosedTime: string;
  noOfFilesChanged: number;
  noOfLinesChanged: number;
}

interface CardTableProps {
  contributor: string;
}

const ContributorTable = ({ contributor }: CardTableProps) => {
  const { data, isLoading } = useTopicContributorPRs(contributor);
  return data.length > 0 ? (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center bg-light-slate-3 rounded-md px-2 py-1">
          <div className="w-3/5">
            <Text className="font-medium">Latest PRs</Text>
          </div>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <FaRegDotCircle title="When Pull Request was issued" />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <FaRegCheckCircle title="When Pull Request was merged" />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, strokeWidth: 0.3 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <GoDiff title="Files changed in Pull Request" />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, strokeWidth: 0.5 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <BsFileDiff title="Lines changed in Pull Request" />
            </div>
          </IconContext.Provider>
        </div>
        <div className="flex flex-col gap-0.5">
          {data.map(
            (
              {
                title: prName,
                state: prStatus,
                merged,
                merged_at: prMergedTime,
                created_at: prIssuedTime,
                filesCount: noOfFilesChanged,
                linesCount: noOfLinesChanged
              },
              index
            ) => (
              <div key={index} className="flex gap-2 items-center px-2 py-1">
                <div className="flex cursor-default item-center gap-2 w-3/5">
                  {prStatus === "open" ? (
                    <IconContext.Provider value={{ color: "green", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitPullRequest title="Open Pull Request" />
                    </IconContext.Provider>
                  ) : prStatus === "closed" ? (
                    <IconContext.Provider value={{ color: merged ? "purple" : "red", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitPullRequestClosed title={`${merged ? "Merged Pull Request" : "Closed Pull Request"}`} />
                    </IconContext.Provider>
                  ) : merged ? (
                    <IconContext.Provider value={{ color: "purple", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitMerge title="Merged Pull Request" />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitPullRequestDraft title="Draft Pull Request" />
                    </IconContext.Provider>
                  )}
                  <Text>{calcDistanceFromToday(new Date(parseInt(prIssuedTime, 10)))}</Text>
                  <Text title={prName} className="!text-light-slate-12 !w-32 md:!w-72  !truncate !font-medium">{prName}</Text>
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
            )
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="px-2 py-1">{isLoading ? "Loading..." : "There are currently no PRs..."}</div>
  );
};

export default ContributorTable;
