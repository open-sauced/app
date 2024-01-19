import { useState } from "react";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";

interface TrackedReposWizardProps {
  trackedReposCount: number;
  onAddToTrackingList: () => void;
  onCancel: () => void;
}

type TrackedReposStep = "pickReposOrOrg" | "pickRepos" | "pickOrg";

export const TrackedReposWizard = ({ trackedReposCount, onAddToTrackingList, onCancel }: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  const repositories: any[] = [];
  const suggestedRepos: any[] = [];
  const onImportOrg = () => {};
  const [searchedRepos, setSearchedRepos] = useState<GhRepo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  // const { sessionToken } = useSupabaseAuth();

  // const { data, isError, isLoading } = useSearchRepos(searchTerm, sessionToken);

  function goBack() {
    switch (step) {
      case "pickReposOrOrg":
        onCancel();
      default:
        setStep("pickReposOrOrg");
    }
  }

  function onSearchRepos(searchTerm?: string) {
    setSearchTerm(searchTerm);
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
            onSearch={onSearchRepos}
            trackedReposCount={trackedReposCount}
            repositories={repositories}
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
