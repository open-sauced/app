import { useEffect, useState } from "react";
import { SearchedReposTable } from "../SearchReposTable";

interface FilterPastedReposStepProps {
  onToggleRepo: (repo: string, isSelected: boolean) => void;
  onToggleAllRepos: (checked: boolean) => void;
  repositories: Map<string, boolean>;
}

export const FilterPastedReposStep = ({ onToggleRepo, onToggleAllRepos, repositories }: FilterPastedReposStepProps) => {
  const [filteredRepositories, setFilteredRepositories] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    setFilteredRepositories(new Map(repositories));
  }, [repositories]);

  const onFilterRepos = (search: string) => {
    const updates = new Map();

    for (const [repo, selected] of repositories) {
      if (repo.includes(search)) {
        updates.set(repo, selected);
      }
    }

    setFilteredRepositories(updates);
  };

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <SearchedReposTable
        type="by-repos"
        repositories={filteredRepositories}
        onFilter={onFilterRepos}
        onToggleRepo={onToggleRepo}
        onToggleAllRepos={onToggleAllRepos}
      />
    </div>
  );
};
