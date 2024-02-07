import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SearchedReposTable } from "../SearchReposTable";

interface FilterPastedReposStepProps {
  onToggleRepo: (repo: string, isSelected: boolean) => void;
  onToggleAllRepos: (checked: boolean) => void;
  repositories: Map<string, boolean>;
}

const EmptyState = () => {
  return (
    <div className="grid place-content-center">
      <div className="text-center flex flex-col items-center p-24 gap-2 max-w-lg">
        <div className="p-3 border rounded-lg mb-2">
          <FaSearch size={24} className="text-light-slate-9" />
        </div>
        <span className="font-semibold">No repositories added yet!</span>
        <span>Use the search bar to find the repositories you want to track on your workspace.</span>
      </div>
    </div>
  );
};

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
      {repositories.size === 0 ? (
        <EmptyState />
      ) : (
        <SearchedReposTable
          type="by-repos"
          repositories={filteredRepositories}
          onFilter={onFilterRepos}
          onToggleRepo={onToggleRepo}
          onToggleAllRepos={onToggleAllRepos}
        />
      )}
    </div>
  );
};
