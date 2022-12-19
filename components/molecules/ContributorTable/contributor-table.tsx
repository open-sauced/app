import { useTopicContributorPRs } from "lib/hooks/useTopicContributorPRs";

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
                linesCount: noOfLinesChanged,
                number: prNumber,
                repo_name: repoName,
                repo_owner: repoOwner
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
                noOfLinesChanged,
                repoName,
                repoOwner,
                prNumber
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
