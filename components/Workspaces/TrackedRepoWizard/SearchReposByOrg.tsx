import { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import Search from "components/atoms/Search/search";
import { useUserOrganizations } from "lib/hooks/useUserOrganizations";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { SearchedReposTable } from "../SearchReposTable";
import { SearchRepoEmptyState } from "./SearchRepoEmptyState";

interface SearchByReposStepProps {
  onSearch: (search?: string) => void;
  onSelectRepo: (repo: string) => void;
  onToggleRepo: (repo: string, isSelected: boolean) => void;
  repositories: Map<string, boolean>;
  suggestedRepos: string[];
  searchedRepos: string[];
}

export const SearchReposByOrgStep = ({
  onSearch,
  onSelectRepo,
  onToggleRepo,
  repositories,
  searchedRepos,
  suggestedRepos = [],
}: SearchByReposStepProps) => {
  const { sessionToken, providerToken, user, username } = useSupabaseAuth();
  const { data: userOrgs } = useUserOrganizations(username);
  const suggestions = userOrgs.map((org) => {
    const organizationName = org.organization_user.login;

    return {
      key: organizationName,
      node: (
        <div key={organizationName} className="flex items-center gap-2">
          <Avatar contributor={organizationName} size="xsmall" />
          <span>{organizationName}</span>
        </div>
      ),
    };
  });

  const [filteredRepositories, setFilteredRepositories] = useState<Map<string, boolean>>(repositories);

  const onFilterRepos = (search: string) => {
    setFilteredRepositories((repositories) => {
      const updates = new Map(repositories);

      for (const [repo] of updates) {
        if (!repo.includes(search)) {
          updates.delete(repo);
        }
      }

      return updates;
    });
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
          placeholder="Search organizations"
          className="w-full"
          isLoading={searchIsLoading}
          name="query"
          onChange={(event) => {
            setSearchIsLoading(true);
            onSearch(event);
          }}
          onSelect={onSelectRepo}
          suggestionsLabel={suggestedRepos.length > 0 ? "Suggested repositories" : undefined}
          suggestions={suggestions}
        />
      </form>
      {repositories.size === 0 && filteredRepositories.size === 0 ? (
        <SearchRepoEmptyState type="by-org" />
      ) : (
        <SearchedReposTable
          repositories={filteredRepositories.size > 0 ? filteredRepositories : repositories}
          onFilter={onFilterRepos}
          onToggleRepo={onToggleRepo}
        />
      )}
    </div>
  );
};
