import React from "react";
import Title from "components/atoms/Typography/title";
import { RepoCardProfileProps } from "components/molecules/RepoCardProfile/repo-card-profile";
import SuggestedRepository from "components/molecules/SuggestedRepo/suggested-repo";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ClientOnly from "components/atoms/ClientOnly/client-only";
interface SuggestedRepositoriesListProps {
  reposData: RepoCardProfileProps[];
  onAddRepo?: (repo: string) => void;
  isLoading?: boolean;
  loadingData?: {
    repoName: string;
    isLoading: boolean;
    isAddedFromCart: boolean;
  };
}

const SuggestedRepositoriesList = ({
  reposData,
  onAddRepo,
  loadingData,
  isLoading,
}: SuggestedRepositoriesListProps) => {
  return (
    <ClientOnly>
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
              <SuggestedRepository key={index} data={item} loadingData={loadingData} onAddRepo={onAddRepo} />
            ))}
          </>
        )}
      </div>
    </ClientOnly>
  );
};

export default SuggestedRepositoriesList;
