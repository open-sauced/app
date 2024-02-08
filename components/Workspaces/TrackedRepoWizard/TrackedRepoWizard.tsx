import { useState } from "react";
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";
import { PasteReposStep } from "./PasteReposStep";
import { FilterPastedReposStep } from "./FilterPastedReposStep";
import { SelectOrgReposStep } from "./SelectOrgReposStep";

interface TrackedReposWizardProps {
  onAddToTrackingList: (repos: Map<string, boolean>) => void;
  onCancel: () => void;
}

type TrackedReposStep =
  | "pickReposOrOrg"
  | "pickRepos"
  | "pasteRepos"
  | "pickOrg"
  | "filterPastedRepos"
  | "pickOrgRepos";

export const TrackedReposWizard = ({ onAddToTrackingList, onCancel }: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  const [organization, setOrganization] = useState<string>("open-sauced");
  const [currentTrackedRepositories, setCurrentTrackedRepositories] = useState<Map<string, boolean>>(new Map());
  const suggestedRepos: any[] = [];
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
        break;
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
            onImportOrg={() => {
              setStep("pickOrg");
            }}
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
      case "pickOrg":
        setStep("pickOrgRepos");
        break;
      case "pickOrgRepos":
        return (
          <SelectOrgReposStep
            repositories={repositories}
            organization={organization}
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
          />
        );

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
