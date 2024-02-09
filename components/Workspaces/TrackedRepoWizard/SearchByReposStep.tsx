import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import Search from "components/atoms/Search/search";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { SearchedReposTable } from "../SearchReposTable";

interface SearchByReposStepProps {
  onSearch: (search?: string) => void;
  onSelectRepo: (repo: string) => void;
  onToggleRepo: (repo: string, isSelected: boolean) => void;
  onToggleAllRepos: (checked: boolean) => void;
  repositories: Map<string, boolean>;
  suggestedRepos: string[];
  searchedRepos: string[];
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

export const SearchByReposStep = ({
  onSearch,
  onSelectRepo,
  onToggleRepo,
  onToggleAllRepos,
  repositories,
  searchedRepos,
  suggestedRepos = [],
}: SearchByReposStepProps) => {
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

  const formRef = useRef<HTMLFormElement>(null);
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  useEffectOnce(() => {
    (formRef.current?.querySelector('[name="query"]') as HTMLInputElement)?.focus();
  });

  useEffect(() => {
    if (searchedRepos.length > 0) {
      setSearchIsLoading(false);
    }
  }, [searchedRepos]);

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <form
        ref={formRef}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Search
          placeholder="Search repositories"
          className="w-full"
          isLoading={searchIsLoading}
          name="query"
          onChange={(event) => {
            setSearchIsLoading(true);
            onSearch(event);
          }}
          onSelect={onSelectRepo}
          suggestionsLabel={suggestedRepos.length > 0 ? "Suggested repositories" : undefined}
          suggestions={(suggestedRepos.length > 0 ? suggestedRepos : searchedRepos).map((repo) => {
            const [owner] = repo.split("/");

            return {
              key: repo,
              node: (
                <div key={repo} className="flex items-center gap-2">
                  <Avatar contributor={owner} size="xsmall" />
                  <span>{repo}</span>
                </div>
              ),
            };
          })}
        />
      </form>
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
