import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";

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

const EmptyState = ({ range }: { range: number }) => {
  return (
    <>
      <div className="flex flex-col justify-center mt-8 pt-8">
        <div className="absolute sm:left-[20%] md:left-[52%]">
          <div>
            <Image src="/assets/images/magnifying-glass.png" alt="Magnifying Glass" width="400" height="400" />
          </div>
        </div>
        <div className="grid w-max max-w-sm mx-auto">
          <span className="text-center font-medium mb-2">No Pull Requests Found</span>
          <p className="text-sm text-slate-600 text-center">
            This contributor doesn&apos;t seem to have any Pull Requests data in the past{" "}
            <span className="font-bold">{range} days</span>. Try changing the date range.
          </p>
        </div>
      </div>
    </>
  );
};

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
    <div className="px-2 py-1">
      {isLoading ? (
        <Skeleton height={24} count={3} className="mt-4 mb-2" />
      ) : (
        <EmptyState range={Number(range ?? 30)} />
      )}
    </div>
  );
};

export default PullRequestTable;
