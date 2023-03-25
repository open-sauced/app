import Title from "components/atoms/Typography/title";
import { RepoCardProfileProps } from "components/molecules/RepoCardProfile/repo-card-profile";
import SuggestedRepository from "components/molecules/SuggestedRepo/suggested-repo";
import React from "react";

interface SuggestedRepositoriesListProps {
  reposData: RepoCardProfileProps[];
  onAddRepo?: (repo: string) => void;
}

const SuggestedRepositoriesList = ({ reposData, onAddRepo }: SuggestedRepositoriesListProps) => {
  return (
    <div>
      <Title className="!text-light-slate-11 !text-sm" level={4}>
        Suggested Repositories:
      </Title>

      <div className="flex flex-col gap-3 pb-10 mt-6 border-b">
        {reposData.map((item, index) => (
          <SuggestedRepository key={index} data={item} onAddRepo={onAddRepo} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedRepositoriesList;
