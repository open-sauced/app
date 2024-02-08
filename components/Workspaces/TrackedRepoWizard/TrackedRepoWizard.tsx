import { useState } from "react";
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";
import { PasteReposStep } from "./PasteReposStep";
import { FilterPastedReposStep } from "./FilterPastedReposStep";

interface TrackedReposWizardProps {
  onAddToTrackingList: (repos: Map<string, boolean>) => void;
  onCancel: () => void;
}

type TrackedReposStep = "pickReposOrOrg" | "pickRepos" | "pasteRepos" | "pickOrg" | "filterPastedRepos";

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

  const onBulkAddRepos = (repos: string[]) => {
    for (const repo of repos) {
      onToggleRepo(repo, true);
    }
    setStep("filterPastedRepos");
  };

  let searchedRepos = data ?? [];

  function goBack() {
    switch (step) {
      case "pickReposOrOrg":
        onCancel();
        break;
      case "filterPastedRepos":
        setStep("pasteRepos");
        break;
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
            onPasteRepos={() => {
              setStep("pasteRepos");
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
      case "pasteRepos":
        return <PasteReposStep onBulkAddRepos={onBulkAddRepos} />;
      case "filterPastedRepos":
        return (
          <FilterPastedReposStep
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
            repositories={repositories}
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
