import React from "react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ContributorListTableRow from "components/molecules/ContributorListTableRow/contributor-list-table-row";

export interface ContributorTableProps {
  contributors: DbPRContributor[];
  topic: string;
  loading?: boolean;
  selectedContributors?: DbPRContributor[];
  handleSelectContributors?: (state: boolean, contributor: DbPRContributor) => void;
  range?: string;
  noContributorsMessage?: string;
  loggedIn: boolean;
}

const ContributorTable = ({
  contributors,
  topic,
  loading,
  selectedContributors,
  handleSelectContributors,
  range = "30",
  noContributorsMessage = "Sorry! We couldn't find any contributors.",
  loggedIn,
}: ContributorTableProps) => {
  return (
    <div className="flex flex-col overflow-hidden border rounded-md">
      {loading ? (
        <SkeletonWrapper height={50} count={10} radius={4} classNames="px-6 mt-2" />
      ) : (
        <>
          {contributors && contributors.length > 0 ? (
            contributors.map((contributor, i) => (
              <ContributorListTableRow
                topic={topic}
                contributor={contributor}
                key={contributor.user_id}
                selected={
                  !!selectedContributors?.find((selected) => selected.author_login === contributor.author_login)
                }
                handleOnSelectContributor={handleSelectContributors}
                range={range}
                loggedIn={loggedIn}
              />
            ))
          ) : (
            <div className="grid w-full py-10 place-content-center text-orange-500">{noContributorsMessage}</div>
          )}
        </>
      )}
    </div>
  );
};

export default ContributorTable;
