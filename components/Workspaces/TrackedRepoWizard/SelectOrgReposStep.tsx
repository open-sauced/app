import { useEffect, useState } from "react";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { SearchedReposTable } from "../SearchReposTable";

interface SearchByReposStepProps {
  organization: string;
  repositories: Map<string, boolean>;
  onToggleRepo: (repo: string, isSelected: boolean) => void;
  onToggleAllRepos: (checked: boolean) => void;
  isLoading: boolean;
  hasError: boolean;
}

function getMesssage({
  repositories,
  isLoading,
  hasError,
}: {
  repositories: Map<string, boolean>;
  isLoading: boolean;
  hasError: boolean;
}) {
  switch (true) {
    case isLoading:
      return "Loading repositories...";

    case hasError:
      return "Error loading repositories";

    case repositories.size === 0:
      return "No repositories found for this organization";

    case repositories.size > 0:
      return "No repositories found using this search term";

    default:
      throw new Error("Invalid state. Unable to generate message for the <SelectOrgReposStep /> component.", {
        cause: {
          repositories,
          isLoading,
          hasError,
        },
      });
  }
}

export const SelectOrgReposStep = ({
  organization,
  repositories,
  onToggleRepo,
  onToggleAllRepos,
  isLoading,
  hasError,
}: SearchByReposStepProps) => {
  const [filteredRepositories, setFilteredRepositories] = useState<Map<string, boolean>>(repositories);

  useEffect(() => {
    const lowercasedOrg = organization.toLowerCase();

    setFilteredRepositories(
      new Map([...repositories.entries()].filter(([repo]) => repo.toLowerCase().startsWith(lowercasedOrg)))
    );
  }, [repositories, organization]);

  const onFilterRepos = (search: string) => {
    const updates = new Map();

    for (const [repo, selected] of repositories) {
      if (repo.startsWith(organization) && repo.includes(search)) {
        updates.set(repo, selected);
      }
    }

    setFilteredRepositories(updates);
  };

  const message = getMesssage({ repositories, isLoading, hasError });

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <div className="flex items-center gap-2 font-semibold">
        <Avatar contributor={organization} size="xsmall" />
        <span>{organization}</span>
      </div>
      <p>Select the organization repositories that you want to track.</p>
      <SearchedReposTable
        type="by-org"
        repositories={filteredRepositories}
        onFilter={onFilterRepos}
        onToggleRepo={onToggleRepo}
        onToggleAllRepos={onToggleAllRepos}
        message={message}
      />
    </div>
  );
};
