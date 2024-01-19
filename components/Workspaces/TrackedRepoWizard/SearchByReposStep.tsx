import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Search from "components/atoms/Search/search";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { SearchedReposTable } from "../SearchReposTable";

interface SearchByReposStepProps {
  onSearch: (search?: string) => void;
  onSelectRepo: (value: string) => void;
  repositories: string[];
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
  repositories,
  searchedRepos,
  suggestedRepos = [],
}: SearchByReposStepProps) => {
  const [filteredRepositories, setFilteredRepositories] = useState(repositories);

  const onFilterRepos = (search: string) => {
    setFilteredRepositories(
      repositories.filter((repo) => {
        return repo.includes(search);
      })
    );
  };

  return (
    <div className="grid gap-6">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Search
          placeholder="Search repositories"
          className="w-full"
          name="query"
          onChange={onSearch}
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
      {repositories.length === 0 && filteredRepositories.length === 0 ? (
        <EmptyState />
      ) : (
        <SearchedReposTable
          repositories={filteredRepositories.length > 0 ? filteredRepositories : repositories}
          onFilter={onFilterRepos}
          onSelect={onSelectRepo}
        />
      )}
    </div>
  );
};
