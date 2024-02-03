import { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import Search from "components/atoms/Search/search";
import { useUserOrganizations } from "lib/hooks/useUserOrganizations";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { SearchedReposTable } from "../SearchReposTable";
import { SearchRepoEmptyState } from "./SearchRepoEmptyState";

interface SearchByReposStepProps {
  organization: string | undefined;
  onSearch: (search?: string) => void;
  onSelectRepo: (repo: string) => void;
  onToggleRepo: (repo: string, isSelected: boolean) => void;
  onToggleAllRepos: (checked: boolean) => void;
  repositories: Map<string, boolean>;
  suggestedRepos: string[];
  searchedRepos: string[];
}

export const SearchReposByOrgStep = ({
  organization,
  onSearch,
  onSelectRepo,
  onToggleRepo,
  onToggleAllRepos,
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
      {organization ? (
        <>
          <div className="flex items-center gap-2 font-semibold">
            <Avatar contributor={organization} size="xsmall" />
            <span>{organization}</span>
          </div>
          <p>Select the organization repositories that you want to track.</p>
          <SearchedReposTable
            type="by-org"
            repositories={filteredRepositories.size > 0 ? filteredRepositories : repositories}
            onFilter={onFilterRepos}
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
          />
        </>
      ) : (
        <>
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
          <SearchRepoEmptyState type="by-org" />
        </>
      )}
    </div>
  );
};
