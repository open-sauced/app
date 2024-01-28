import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import LatestPrTableHeader from "../LatestPrTableHeader/latest-pr-table-header";
import LatestPrTableRow from "../LatestPrTableRow/latest-pr-table-row";

interface PRs {
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
  range?: string;
}

const PullRequestTable = ({
  contributor,
  topic,
  repositories,
  limit,
  isHoverCard,
  range,
}: CardTableProps): JSX.Element => {
  const { data, isLoading } = useContributorPullRequests({
    contributor,
    topic,
    repoIds: repositories,
    limit,
    range,
    mostRecent: true,
  });

  return data.length > 0 ? (
    <>
      <div className="flex flex-col">
        <LatestPrTableHeader isHoverCard={isHoverCard} />
        <div className="flex flex-col gap-0.5">
          {data.map(
            (
              {
                pr_title: prName,
                pr_state: prStatus,
                pr_is_merged: merged,
                pr_is_draft: draft,
                pr_merged_at: prMergedTime,
                pr_created_at: prIssuedTime,
                pr_changed_files: noOfFilesChanged,
                pr_additions: additions,
                pr_deletions: deletions,
                pr_number: prNumber,
                repo_name: fullName,
                pr_updated_at: prUpdatedTime,
              },
              index
            ) => {
              const latestPrs = {
                prName,
                prIssuedTime,
                prMergedTime,
                prStatus,
                merged,
                draft,
                noOfFilesChanged,
                noOfLinesChanged: Math.abs(additions - deletions),
                repoFullName: fullName,
                prNumber,
                prUpdatedTime,
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

export default PullRequestTable;
