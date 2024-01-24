import { useState } from "react";
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";

interface TrackedReposWizardProps {
  onAddToTrackingList: (repos: Set<string>) => void;
  onCancel: () => void;
}

type TrackedReposStep = "pickReposOrOrg" | "pickRepos" | "pickOrg";

export const TrackedReposWizard = ({ onAddToTrackingList, onCancel }: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  const [currentTrackedRepositories, setCurrentTrackedRepositories] = useState<Set<string>>(new Set());
  const suggestedRepos: any[] = [];
  const onImportOrg = () => {};
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const { data, isError, isLoading } = useSearchRepos(searchTerm, "" /* sessionToken */);

  const onSelectRepo = (repo: string) => {
    setSearchTerm(undefined);
    setCurrentTrackedRepositories((currentTrackedRepositories) => {
      const updates = new Set(currentTrackedRepositories);
      updates.add(repo);

      return updates;
    });
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

  const repositories = Array.from(currentTrackedRepositories);

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
            repositories={repositories}
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
      trackedReposCount={currentTrackedRepositories.size}
      onCancel={() => {
        goBack();
      }}
    >
      {renderStep(step)}
    </TrackedRepoWizardLayout>
  );
};
