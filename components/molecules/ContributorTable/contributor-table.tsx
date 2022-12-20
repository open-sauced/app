import { useTopicContributorPRs } from "lib/hooks/useTopicContributorPRs";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
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
  limit?: number;
  isHoverCard?: boolean;
}

const ContributorTable = ({ contributor, topic, repositories, limit, isHoverCard }: CardTableProps): JSX.Element => {
  const { data, isLoading } = useTopicContributorPRs(contributor, topic, repositories, limit);

  const sortedPr = data?.sort((a: any, b: any) => parseInt(b.updated_at) - parseInt(a.updated_at));

  return sortedPr.length > 0 ? (
    <>
      <div className="flex flex-col">
        <LatestPrTableHeader isHoverCard={isHoverCard} />
        <div className="flex flex-col gap-0.5">
          {sortedPr.map(
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
                repo_owner: repoOwner,
                updated_at: prUpdatedTime
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
                prNumber,
                prUpdatedTime
              };

              return <LatestPrTableRow isHoverCard={isHoverCard} key={index} {...latestPrs} />;
            }
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="px-2 py-1">{isLoading ? <SkeletonWrapper height={20} /> : "There are currently no PRs..."}</div>
  );
};

export default ContributorTable;
