import React from "react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ContributorListTableRow from "components/molecules/ContributorListTableRow/contributor-list-table-row";

export interface ContributorTableProps {
  contributors: DbUserContributor[];
  topic: string;
  loading?: boolean;
  selectedContributors?: DbUserContributor[];
  handleSelectContributors?: (state: boolean, contributor: DbUserContributor) => void;
  range?: string;
  noContributorsMessage?: string;
  loggedIn: boolean;
  showOscr: boolean;
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
  showOscr,
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
                key={contributor.id}
                selected={!!selectedContributors?.find((selected) => selected.login === contributor.login)}
                handleOnSelectContributor={handleSelectContributors}
                range={range}
                loggedIn={loggedIn}
                showOscr={showOscr}
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
