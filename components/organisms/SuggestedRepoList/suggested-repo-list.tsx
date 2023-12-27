import React from "react";
import Title from "components/atoms/Typography/title";
import { RepoCardProfileProps } from "components/molecules/RepoCardProfile/repo-card-profile";
import SuggestedRepository from "components/molecules/SuggestedRepo/suggested-repo";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface SuggestedRepositoriesListProps {
  reposData: RepoCardProfileProps[];
  addedRepos: DbRepo[];
  onAddRepo?: (repo: string) => void;
  onRemoveRepo?: (repoId: number) => void;
  isLoading?: boolean;
  loadingData?: {
    repoName: string;
    isLoading: boolean;
    isAddedFromCart: boolean;
  };
}

const SuggestedRepositoriesList = ({
  addedRepos,
  reposData,
  onAddRepo,
  onRemoveRepo,
  loadingData,
  isLoading,
}: SuggestedRepositoriesListProps) => {
  // Checks if repo is already added to the cart
  const isRepoAdded = (suggestedRepoId: number) => {
    const isAdded = addedRepos.find((repo) => repo.id === suggestedRepoId);
    return isAdded !== undefined;
  };

  return (
    <div>
      <Title className="!text-light-slate-11 !text-sm" level={4}>
        Suggested Repositories:
      </Title>

      <div className="flex flex-col gap-3 mt-6">
        {isLoading ? (
          <>
            <SkeletonWrapper count={3} classNames="w-3/4" height={60} radius={10} />
          </>
        ) : (
          <>
            {reposData.map((item, index) => (
              <SuggestedRepository
                key={index}
                data={item}
                loadingData={loadingData}
                onAddRepo={onAddRepo}
                onRemoveRepo={onRemoveRepo}
                isAdded={isRepoAdded(item.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestedRepositoriesList;
