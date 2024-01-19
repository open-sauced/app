import { useState } from "react";
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";

interface TrackedReposWizardProps {
  onAddToTrackingList: () => void;
  onCancel: () => void;
}

type TrackedReposStep = "pickReposOrOrg" | "pickRepos" | "pickOrg";

export const TrackedReposWizard = ({ onAddToTrackingList, onCancel }: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  // TODO: probably makes more sense as an object so it's more performant.
  const [currentTrackedRepositories, setCurrentTrackedRepositories] = useState<GhRepo[]>([]);
  const suggestedRepos: any[] = [];
  const onImportOrg = () => {};
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  // const { sessionToken } = useSupabaseAuth();
  const { data, isError, isLoading } = useSearchRepos(searchTerm, "" /* sessionToken */);
  const [trackedReposCount, setTrackedReposCount] = useState(0);

  const onSelectRepo = (value: string) => {
    const repoIdElement = document.querySelector(`[data-suggestion="${value}"] > [data-repo]`) as HTMLElement;
    const repo = repoIdElement?.dataset.repo ? (JSON.parse(repoIdElement?.dataset.repo) as GhRepo) : null;
    repo &&
      setCurrentTrackedRepositories((currentTrackedRepositories) => [
        ...currentTrackedRepositories.filter((r) => r.id !== repo.id),
        repo,
      ]);
    setTrackedReposCount((value) => value + 1);
  };

  let searchedRepos = data?.items || [];

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
            onAddToTrackingList={onAddToTrackingList}
            onSearchRepos={() => {
              setStep("pickRepos");
            }}
            onImportOrg={onImportOrg}
            onCancel={onCancel}
            trackedReposCount={trackedReposCount}
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
      onAddToTrackingList={onAddToTrackingList}
      trackedReposCount={trackedReposCount}
      onCancel={() => {
        goBack();
      }}
    >
      {renderStep(step)}
    </TrackedRepoWizardLayout>
  );
};
