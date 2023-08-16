import React from "react";
import Title from "components/atoms/Typography/title";
import { RepoCardProfileProps } from "components/molecules/RepoCardProfile/repo-card-profile";
import SuggestedRepository from "components/molecules/SuggestedRepo/suggested-repo";

interface SuggestedRepositoriesListProps {
  reposData: RepoCardProfileProps[];
  onAddRepo?: (repo: string) => void;
  loadingData?: {
    repoName: string;
    isLoading: boolean;
    isAddedFromCart: boolean;
  };
}

const SuggestedRepositoriesList = ({ reposData, onAddRepo, loadingData }: SuggestedRepositoriesListProps) => {
  return (
    <div>
      <Title className="!text-light-slate-11 !text-sm" level={4}>
        Suggested Repositories:
      </Title>

      <div className="flex flex-col gap-3 mt-6">
        {reposData.map((item, index) => (
          <SuggestedRepository key={index} data={item} loadingData={loadingData} onAddRepo={onAddRepo} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedRepositoriesList;
