import { FaSearch } from "react-icons/fa";
import Search from "components/atoms/Search/search";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { SearchedReposTable } from "../SearchReposTable";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";

interface SearchByReposStepProps {
  onAddToTrackingList: () => void;
  onCancel: () => void;
  onSearch: (search?: string) => void;
  trackedReposCount: number;
  repositories: {
    owner: string;
    name: string;
  }[];
  suggestedRepos: {
    owner: string;
    name: string;
  }[];
}

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-24 gap-2 h-80 max-h-80 max-w-lg">
      <FaSearch size={20} className="p-1 border rounded mb-2" />
      <span className="font-semibold">No repositories added yet!</span>
      <span className="text-center">
        Use the search bar to find the repositories you want to track on your workspace.
      </span>
    </div>
  );
};

export const SearchByReposStep = ({
  onAddToTrackingList,
  onCancel,
  onSearch,
  trackedReposCount,
  repositories,
  suggestedRepos,
}: SearchByReposStepProps) => {
  return (
    <TrackedRepoWizardLayout
      onAddToTrackingList={onAddToTrackingList}
      onCancel={onCancel}
      trackedReposCount={trackedReposCount}
    >
      <div className="grid gap-6">
        <form role="search">
          <Search
            placeholder="Search repositories"
            className="w-full"
            name="query"
            onSearch={onSearch}
            suggestionsLabel="Suggested repositories"
            suggestions={suggestedRepos.map((repo) => {
              const fullRepoName = `${repo.owner}/${repo.name}`;

              return (
                <div key={fullRepoName} className="flex items-center gap-2">
                  <Avatar contributor={repo.owner} size="xsmall" />
                  <span>{fullRepoName}</span>
                </div>
              );
            })}
          />
        </form>
        {trackedReposCount === 0 ? (
          <EmptyState />
        ) : (
          <SearchedReposTable onFilter={() => {}} repositories={repositories} />
        )}
      </div>
    </TrackedRepoWizardLayout>
  );
};
