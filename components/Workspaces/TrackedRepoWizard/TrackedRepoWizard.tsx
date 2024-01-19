import { useState } from "react";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";

interface TrackedReposWizardProps {
  trackedReposCount: number;
  onAddToTrackingList: () => void;
  onCancel: () => void;
  onSearchRepos: (searchTerm?: string) => void;
}

type TrackedReposStep = "pickReposOrOrg" | "pickRepos" | "pickOrg";

export const TrackedReposWizard = ({
  trackedReposCount,
  onAddToTrackingList,
  onCancel,
  onSearchRepos,
}: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  const repositories: any[] = [];
  const suggestedRepos: any[] = [];
  const onImportOrg = () => {};

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
      onCancel={onCancel}
    >
      {renderStep(step)}
    </TrackedRepoWizardLayout>
  );
};
