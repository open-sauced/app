import Text from "components/atoms/Typography/text";
import { IconContext } from "react-icons";
import { FaRegDotCircle, FaRegCheckCircle } from "react-icons/fa";
import { BsFileDiff } from "react-icons/bs";
import { GoDiff } from "react-icons/go";
import { VscGitPullRequest, VscGitPullRequestClosed, VscGitMerge, VscGitPullRequestDraft } from "react-icons/vsc";
import { useTopicContributorPRs } from "lib/hooks/useTopicContributorPRs";
import { calcDistanceFromToday } from "lib/utils/date-utils";
import LatestPrTableHeader from "../LatestPrTableHeader/latest-pr-table-header";
import LatestPrTableRow from "../LatestPrTableRow/latest-pr-table-row";

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
  topic: string;
  repositories?: number[];
}

const ContributorTable = ({ contributor, topic, repositories }: CardTableProps): JSX.Element => {
  const { data, isLoading } = useTopicContributorPRs(contributor, topic, repositories);
  return data.length > 0 ? (
    <>
      <div className="flex flex-col">
        <LatestPrTableHeader />
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
            ) => {
              const latestPrs = {
                prName,
                prIssuedTime,
                prMergedTime,
                prStatus,
                merged,
                noOfFilesChanged,
                noOfLinesChanged
              };

              return <LatestPrTableRow key={index} {...latestPrs} />;
            }
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="px-2 py-1">{isLoading ? "Loading..." : "There are currently no PRs..."}</div>
  );
};

export default ContributorTable;
