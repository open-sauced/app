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

              return {
                key: fullRepoName,
                node: (
                  <div key={fullRepoName} className="flex items-center gap-2">
                    <Avatar contributor={repo.owner} size="xsmall" />
                    <span>{fullRepoName}</span>
                  </div>
                ),
              };
            })}
          />
        </form>
        {trackedReposCount === 0 ? <EmptyState /> : <SearchedReposTable repositories={repositories} />}
      </div>
    </TrackedRepoWizardLayout>
  );
};
