import { useState } from "react";
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";

interface TrackedReposWizardProps {
  onAddToTrackingList: (repos: string[]) => void;
  onCancel: () => void;
}

type TrackedReposStep = "pickReposOrOrg" | "pickRepos" | "pickOrg";

export const TrackedReposWizard = ({ onAddToTrackingList, onCancel }: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  // TODO: probably makes more sense as an object so it's more performant.
  const [currentTrackedRepositories, setCurrentTrackedRepositories] = useState<string[]>([]);
  const suggestedRepos: any[] = [];
  const onImportOrg = () => {};
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  // const { sessionToken } = useSupabaseAuth();
  const { data, isError, isLoading } = useSearchRepos(searchTerm, "" /* sessionToken */);

  const onSelectRepo = (repo: string) => {
    setCurrentTrackedRepositories((currentTrackedRepositories) => [
      ...currentTrackedRepositories.filter((r) => r !== repo),
      repo,
    ]);
  };

  let searchedRepos = data ?? [];

  function goBack() {
    switch (step) {
      case "pickReposOrOrg":
        onCancel();
      default:
        setStep("pickReposOrOrg");
    }
  }

  function onSearchRepos(searchTerm?: string) {
    if (searchTerm && searchTerm.length > 2) {
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm(undefined);
    }
  }

  const renderStep = (step: TrackedReposStep) => {
    switch (step) {
      case "pickReposOrOrg":
        return (
          <PickReposOrOrgStep
            onSearchRepos={() => {
              setStep("pickRepos");
            }}
            onImportOrg={onImportOrg}
          />
        );
      case "pickRepos":
        return (
          <SearchByReposStep
            onSelectRepo={onSelectRepo}
            onSearch={onSearchRepos}
            repositories={currentTrackedRepositories}
            searchedRepos={searchedRepos}
            suggestedRepos={suggestedRepos}
          />
        );
      // TODO: other steps
      default:
        return null;
    }
  };

  return (
    <TrackedRepoWizardLayout
      onAddToTrackingList={() => {
        onAddToTrackingList(currentTrackedRepositories);
      }}
      trackedReposCount={currentTrackedRepositories.length}
      onCancel={() => {
        goBack();
      }}
    >
      {renderStep(step)}
    </TrackedRepoWizardLayout>
  );
};
