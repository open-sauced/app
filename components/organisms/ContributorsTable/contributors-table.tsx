import React from "react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ContributorListTableRow from "components/molecules/ContributorListTableRow/contributor-list-table-row";

export interface ContributorTableProps {
  contributors: DbPRContributor[];
  topic: string;
  loading?: boolean;
  selectedContributors?: DbPRContributor[];
  handleSelectContributors?: (state: boolean, contributor: DbPRContributor) => void;
}

const ContributorTable = ({
  contributors,
  topic,
  loading,
  selectedContributors,
  handleSelectContributors,
}: ContributorTableProps) => {
  return (
    <div className="flex flex-col overflow-hidden border rounded-md">
      {loading && <SkeletonWrapper height={50} count={10} radius={4} classNames="px-6 mt-2" />}

      {contributors &&
        contributors.length > 0 &&
        contributors.map((contributor) => (
          <ContributorListTableRow
            topic={topic}
            contributor={contributor}
            key={contributor.user_id}
            selected={!!selectedContributors?.find((selected) => selected.user_id === contributor.user_id)}
            handleOnSelectContributor={handleSelectContributors}
          />
        ))}
    </div>
  );
};

export default ContributorTable;
