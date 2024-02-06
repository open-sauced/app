import { useState } from "react";
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";

interface TrackedReposWizardProps {
  onAddToTrackingList: (repos: Map<string, boolean>) => void;
  onCancel: () => void;
}

type TrackedReposStep = "pickReposOrOrg" | "pickRepos" | "pickOrg";

export const TrackedReposWizard = ({ onAddToTrackingList, onCancel }: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  const [currentTrackedRepositories, setCurrentTrackedRepositories] = useState<Map<string, boolean>>(new Map());
  const suggestedRepos: any[] = [];
  const onImportOrg = () => {};
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const { data, isError, isLoading } = useSearchRepos(searchTerm);

  const onToggleRepo = (repo: string, isSelected: boolean) => {
    setSearchTerm(undefined);
    setCurrentTrackedRepositories((currentTrackedRepositories) => {
      const updates = new Map(currentTrackedRepositories);
      updates.set(repo, isSelected);

      return updates;
    });
  };

  const onSelectRepo = (repo: string) => {
    onToggleRepo(repo, true);
  };

  const onToggleAllRepos = (checked: boolean) => {
    setCurrentTrackedRepositories((currentTrackedRepositories) => {
      const updates = new Map(currentTrackedRepositories);

      for (const [repo] of updates) {
        updates.set(repo, checked);
      }

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

  const repositories = currentTrackedRepositories;

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
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
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

  const trackedRepos = new Map(currentTrackedRepositories);

  trackedRepos.forEach((isSelected, repo, map) => {
    if (!isSelected) {
      map.delete(repo);
    }
  });

  return (
    <TrackedRepoWizardLayout
      onAddToTrackingList={() => {
        onAddToTrackingList(currentTrackedRepositories);
      }}
      trackedReposCount={trackedRepos.size}
      onCancel={() => {
        goBack();
      }}
    >
      {renderStep(step)}
    </TrackedRepoWizardLayout>
  );
};
