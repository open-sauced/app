import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ContributorListTableRow from "components/molecules/ContributorListTableRow/contributor-list-table-row";
import React from "react";

export interface ContributorTableProps {
  contributors: DbRepoPR[];
  topic: string;
  loading?: boolean;
}

const ContributorTable = ({ contributors, topic, loading }: ContributorTableProps) => {
  return (
    <div className="flex flex-col pb-4 border rounded-md">
      {loading && <SkeletonWrapper height={50} count={10} radius={4} classNames="px-6 mt-2" />}

      {contributors &&
        contributors.length > 0 &&
        contributors.map((contributor, i) => (
          <ContributorListTableRow topic={topic} contributor={contributor} key={i} />
        ))}
    </div>
  );
};

export default ContributorTable;
